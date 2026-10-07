import { useCallback, useState, useSyncExternalStore } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import {
  buildDesignMessage,
  designUrl,
  getShareCount,
  isTouchDevice,
  recordShare,
  shareInstantly,
  type ShareResult,
} from '../lib/share';
import { canShareFile, prepareShareImage, readyShareImage } from '../lib/share-image';
import type { ShareItem } from '../components/WhatsAppShareSheet';

export interface ShareableDesign {
  /** Route id, as used in /design/:id */
  id: string;
  /** Tracking key (differs from id for portfolio logos). */
  trackId: string;
  title: string;
  line: string;
  image: string;
}

const PREPARE_TIMEOUT_MS = 8000;
let preparing: string | null = null;

/**
 * Design sharing. Every share carries the WATERMARKED preview image (never the
 * clean file, even for users with credits).
 * - Phones: the OS share sheet opens with the watermarked image + branded caption.
 *   Design pages prepare the image on load so the tap is instant; if it isn't
 *   ready yet, we finish it (≈1 s) and share — or, if the browser needs a fresh
 *   tap (iOS), show a one-tap "Share now" toast.
 * - No file sharing (in-app browsers, desktop): text + link; the link preview is
 *   the watermarked image generated at build time (og-prerender).
 * - Desktop: opens the share options sheet.
 */
export function useShareItems() {
  const { language, t } = useLanguage();
  const [item, setItem] = useState<ShareItem | null>(null);
  const close = useCallback(() => setItem(null), []);

  /** Start building the watermarked image early (page load / pointerdown). */
  const prepare = useCallback((design: ShareableDesign) => {
    prepareShareImage(design.id, design.image, design.title).catch(() => {});
  }, []);

  const shareDesign = (design: ShareableDesign) => {
    const url = designUrl(design.id);
    const message = buildDesignMessage(language, design.title, design.line, url);

    if (!isTouchDevice()) {
      setItem({ trackId: design.trackId, designId: design.id, title: design.title, url, message, image: design.image });
      return;
    }

    const finish = (result: ShareResult, file: File | null) => {
      if (result === 'cancelled') return;
      if (result === 'needs-tap') {
        toast(t('share.readyTap'), {
          duration: 10000,
          action: { label: t('share.shareNow'), onClick: () => send(file) },
        });
        return;
      }
      recordShare(design.trackId);
      if (result === 'shared') toast.success(t('share.toastShared'));
    };
    const send = (file: File | null) => {
      const attach = file && canShareFile(file) ? file : null;
      shareInstantly(design.title, message, attach)
        .then((r) => finish(r, file))
        .catch(() => toast.error(t('share.toastError')));
    };

    // Ready: share synchronously inside the tap.
    const ready = readyShareImage(design.id);
    if (ready) {
      send(ready);
      return;
    }

    // Not ready yet: finish the watermarked image first (never fall back to the clean file).
    if (preparing === design.id) return; // double tap while preparing
    preparing = design.id;
    const toastId = toast.loading(t('share.preparing'));
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), PREPARE_TIMEOUT_MS));
    Promise.race([prepareShareImage(design.id, design.image, design.title).catch(() => null), timeout])
      .then((file) => {
        toast.dismiss(toastId);
        // No image (offline / failed): share the branded caption + link only.
        send(file);
      })
      .finally(() => {
        preparing = null;
      });
  };

  return { item, close, shareDesign, prepare };
}

/** Live share count for one item (updates when this browser records a share). */
export function useShareCount(trackId: string) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('krown:share', onChange);
      window.addEventListener('storage', onChange);
      return () => {
        window.removeEventListener('krown:share', onChange);
        window.removeEventListener('storage', onChange);
      };
    },
    () => getShareCount(trackId),
  );
}

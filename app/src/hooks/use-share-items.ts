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
} from '../lib/share';
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

/**
 * Design sharing. On phones a tap opens the native share sheet (or WhatsApp)
 * immediately; on desktop it opens the share options sheet.
 */
export function useShareItems() {
  const { language, t } = useLanguage();
  const [item, setItem] = useState<ShareItem | null>(null);
  const close = useCallback(() => setItem(null), []);

  const shareDesign = (design: ShareableDesign) => {
    const url = designUrl(design.id);
    const message = buildDesignMessage(language, design.title, design.line, url);

    if (isTouchDevice()) {
      // Called synchronously inside the tap handler — nothing async before navigator.share().
      shareInstantly(design.title, message)
        .then((result) => {
          if (result === 'cancelled') return;
          recordShare(design.trackId);
          if (result === 'shared') toast.success(t('share.toastShared'));
        })
        .catch(() => toast.error(t('share.toastError')));
      return;
    }

    setItem({ trackId: design.trackId, designId: design.id, title: design.title, url, message, image: design.image });
  };

  return { item, close, shareDesign };
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

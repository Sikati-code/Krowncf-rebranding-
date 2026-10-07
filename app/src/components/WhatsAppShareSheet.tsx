import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link2, CircleDashed, Users, Loader2, Info } from 'lucide-react';
import { toast } from 'sonner';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';
import { useModalA11y } from '../hooks/use-modal-a11y';
import { recordShare, whatsappShareUrl } from '../lib/share';
import { saveBlob, extensionFor, createPreviewBlob, slugify } from '../lib/watermark';

export interface ShareItem {
  /** Key used for share tracking (design id or `logo-<id>`). */
  trackId: string;
  /** Route id of the design (printed on the preview watermark). */
  designId: string;
  title: string;
  /** Full branded message (title, line, attribution, link, krowncf.com). */
  message: string;
  /** Canonical URL of the shared page. */
  url: string;
  /** Design image (thumbnail here; watermarked preview for Status). */
  image: string;
}

interface WhatsAppShareSheetProps {
  item: ShareItem | null;
  onClose: () => void;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API blocked (insecure context / permissions) — legacy fallback.
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

/**
 * Desktop share options. Phones skip this sheet entirely and share instantly
 * (see useShareItems). Nothing heavy runs on open: the watermarked preview is
 * only built when the user picks "Status".
 */
export default function WhatsAppShareSheet({ item: openItem, onClose }: WhatsAppShareSheetProps) {
  const { t } = useLanguage();
  // Keep the last item rendered while the sheet animates out.
  const [item, setItem] = useState(openItem);
  if (openItem && openItem !== item) setItem(openItem);
  const isMobile = useIsMobile();
  const isOpen = openItem !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);

  useModalA11y(isOpen, onClose, panelRef, closeRef);

  if (!item) return null;

  const shareToChat = () => {
    window.open(whatsappShareUrl(item.message), '_blank', 'noopener,noreferrer');
    recordShare(item.trackId);
    toast.success(t('share.toastShared'));
    onClose();
  };

  // WhatsApp Status can't be targeted by URL: hand over the watermarked preview + caption.
  const shareToStatus = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const blob = await createPreviewBlob(item.image, item.designId);
      saveBlob(blob, `${slugify(item.title)}-krowncf-preview.${extensionFor(blob.type)}`);
      await copyText(item.message);
      recordShare(item.trackId);
      toast.success(t('share.toastStatusWeb'), { duration: 7000 });
      onClose();
    } catch (err) {
      console.warn('Status share failed:', err);
      toast.error(t('share.toastError'));
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async () => {
    if (await copyText(item.url)) {
      recordShare(item.trackId);
      toast.success(t('share.toastCopied'));
      onClose();
    } else {
      toast.error(t('share.toastError'));
    }
  };

  const options = [
    { key: 'chat', icon: Users, label: t('share.contact'), hint: t('share.contactHintWeb'), onClick: shareToChat, accent: true },
    { key: 'status', icon: busy ? Loader2 : CircleDashed, label: t('share.status'), hint: t('share.statusHintWeb'), onClick: shareToStatus, accent: true },
    { key: 'copy', icon: Link2, label: t('share.copy'), hint: t('share.copyHint'), onClick: copyLink, accent: false },
  ];

  return (
    <AnimatePresence>
      {isOpen && [
      <motion.div
        key="share-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />,
      <motion.div
        key="share-positioner"
        className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:p-6 pointer-events-none"
      >
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
          initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 24 }}
          animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
          exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 24 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          className="pointer-events-auto w-full md:max-w-md flex flex-col max-h-[92dvh] md:max-h-[88vh] overflow-hidden rounded-t-3xl md:rounded-2xl glass-card border-white/10 bg-krown-dark/95 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start gap-3 px-5 pt-5 pb-4 md:px-6 border-b border-white/5">
            <span className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 id="share-title" className="text-lg font-bold text-white leading-tight">
                {t('share.button')}
              </h3>
              <p className="text-xs text-white/50 mt-0.5 truncate">{item.title}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t('share.close')}
              className="-mr-2 -mt-1 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-6 space-y-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            {/* Message preview */}
            <div className="flex gap-3 rounded-2xl bg-black/30 border border-white/10 p-3">
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="w-16 h-20 rounded-lg object-cover bg-white/5 shrink-0"
              />
              <p className="text-xs text-white/60 whitespace-pre-line line-clamp-5">{item.message}</p>
            </div>

            {/* Options */}
            <ul className="space-y-2.5">
              {options.map((o, i) => (
                <motion.li
                  key={o.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <motion.button
                    type="button"
                    onClick={o.onClick}
                    disabled={busy && o.key === 'status'}
                    aria-busy={busy && o.key === 'status'}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full flex items-center gap-3 min-h-[56px] px-4 py-2.5 rounded-xl border text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] ${
                      o.accent
                        ? 'border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/15 hover:border-[#25D366]/60'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        o.accent ? 'bg-[#25D366]/15 text-[#25D366]' : 'bg-white/5 text-white/70'
                      }`}
                    >
                      <o.icon className={`w-5 h-5 ${busy && o.key === 'status' ? 'animate-spin' : ''}`} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-white">{o.label}</span>
                      <span className="block text-xs text-white/50">{o.hint}</span>
                    </span>
                  </motion.button>
                </motion.li>
              ))}
            </ul>

            <p className="flex items-start gap-2 text-[11px] text-white/40">
              <Info className="w-3.5 h-3.5 mt-px shrink-0" aria-hidden="true" />
              <span>
                {t('share.subtitle')} {t('share.quotaNote')}
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>,
      ]}
    </AnimatePresence>
  );
}

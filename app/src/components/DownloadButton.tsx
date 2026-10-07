import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Sparkles, Droplets, RotateCcw, Eye, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { downloadDesign, preloadWatermark } from '../lib/watermark';
import type { Design } from '../data/categories';
import LoginModal from './LoginModal';
import PackStrip from './PackStrip';

interface DownloadButtonProps {
  design: Design;
  /** Opens the credit-pack picker with a localised reason. */
  onNeedCredits: (reason: string) => void;
  /** Rendered full-width below the two download buttons (the WhatsApp share). */
  shareAction?: ReactNode;
}

type Busy = 'download' | 'preview' | null;

export default function DownloadButton({ design, onNeedCredits, shareAction }: DownloadButtonProps) {
  const { user, cleanStatus, recordDownload } = useUser();
  const { t } = useLanguage();
  const [busy, setBusy] = useState<Busy>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const status = cleanStatus(design.id);

  // Previews are always watermarked — fetch the mark ahead of the click.
  useEffect(() => {
    preloadWatermark();
  }, []);

  const handleDownload = async () => {
    if (busy) return;
    if (status === 'signin') {
      setIsLoginOpen(true);
      return;
    }
    const clean = status === 'owned' || status === 'credit';
    setBusy('download');
    try {
      await downloadDesign({
        imageUrl: design.image,
        title: design.title,
        designId: design.id,
        mode: clean ? 'clean' : 'watermarked',
      });
      recordDownload(design.id, design.title, !clean);
      if (clean) {
        const left = status === 'credit' ? user.credits - 1 : user.credits;
        toast.success(t('download.toastClean'), {
          icon: <Sparkles className="w-4 h-4 text-yellow-400" />,
          description: t('download.creditsLeft').replace('{count}', String(left)),
        });
      } else {
        toast(t('download.toastFree'), {
          icon: <Droplets className="w-4 h-4 text-krown-orange" />,
          action: { label: t('packs.buy'), onClick: () => onNeedCredits(t('packs.reasonClean')) },
        });
      }
    } catch (error) {
      console.warn('Design download failed:', error);
      toast.error(t('download.toastError'));
    } finally {
      setBusy(null);
    }
  };

  // Direct download of the small watermarked preview: no sign-in, no sheet, no credit.
  const handlePreview = async () => {
    if (busy) return;
    setBusy('preview');
    try {
      await downloadDesign({ imageUrl: design.image, title: design.title, designId: design.id, mode: 'preview' });
      toast.success(t('download.toastPreview'));
    } catch (error) {
      console.warn('Preview download failed:', error);
      toast.error(t('download.toastError'));
    } finally {
      setBusy(null);
    }
  };

  const downloadLabel =
    busy === 'download'
      ? t('download.processing')
      : status === 'signin'
        ? t('download.signin')
        : status === 'owned'
          ? t('download.again')
          : status === 'credit'
            ? t('download.withCredit')
            : t('download.cta');
  const DownloadIcon = busy === 'download' ? Loader2 : status === 'owned' ? RotateCcw : Download;

  return (
    <div className="mb-6 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={busy !== null}
          aria-busy={busy === 'download'}
          aria-describedby={`download-note-${design.id}`}
          className="min-h-[48px] px-3 py-3.5 bg-gradient-to-r from-krown-red to-krown-orange text-white font-bold rounded-xl hover:scale-[1.03] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-sm sm:text-base text-center leading-tight disabled:opacity-70 disabled:cursor-wait disabled:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-krown-black"
        >
          <DownloadIcon className={`w-5 h-5 shrink-0 ${busy === 'download' ? 'animate-spin' : ''}`} aria-hidden="true" />
          {downloadLabel}
        </button>
        <button
          type="button"
          onClick={handlePreview}
          disabled={busy !== null}
          aria-busy={busy === 'preview'}
          className="min-h-[48px] px-3 py-3.5 border border-white/25 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base text-center leading-tight disabled:opacity-70 disabled:cursor-wait focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {busy === 'preview' ? (
            <Loader2 className="w-5 h-5 shrink-0 animate-spin" aria-hidden="true" />
          ) : (
            <Eye className="w-5 h-5 shrink-0" aria-hidden="true" />
          )}
          {busy === 'preview' ? t('download.processing') : t('download.preview')}
        </button>
      </div>

      {shareAction}

      <motion.div
        id={`download-note-${design.id}`}
        key={status}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-center"
      >
        {status === 'owned' || status === 'credit' ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 font-medium">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            {status === 'owned'
              ? t('download.ownedNote')
              : t('download.creditNote').replace('{count}', String(user.credits))}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onNeedCredits(t('packs.reasonClean'))}
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-krown-orange transition-colors underline-offset-2 hover:underline"
          >
            {status === 'signin' ? <Coins className="w-3.5 h-3.5" aria-hidden="true" /> : <Droplets className="w-3.5 h-3.5" aria-hidden="true" />}
            {status === 'signin' ? t('download.signinNote') : t('download.watermarkNote')}
          </button>
        )}
      </motion.div>

      <PackStrip onSelect={() => onNeedCredits(t('packs.reasonClean'))} />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

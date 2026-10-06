import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Sparkles, Droplets, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { downloadDesign, preloadWatermark } from '../lib/watermark';
import LoginModal from './LoginModal';
import type { Design } from '../data/categories';

interface DownloadButtonProps {
  design: Design;
  /** Called with a localised reason when the user must sign in or upgrade. */
  onUpgrade: (reason: string) => void;
  /** Rendered beside the Download button (stacked below it on mobile). */
  secondaryAction?: ReactNode;
}

export default function DownloadButton({ design, onUpgrade, secondaryAction }: DownloadButtonProps) {
  const { user, canDownload, recordDownload, getRemainingDownloads, isPremium } = useUser();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { allowed, status } = canDownload(design.id);

  // Free users will need the watermark — fetch it ahead of the click.
  useEffect(() => {
    if (!isPremium) preloadWatermark();
  }, [isPremium]);

  const handleDownload = async () => {
    if (isProcessing) return;
    if (status === 'signin') {
      setIsLoginOpen(true);
      return;
    }
    if (!allowed) {
      onUpgrade(t('download.reasonLimit'));
      return;
    }

    const watermark = !isPremium;
    setIsProcessing(true);
    try {
      await downloadDesign({
        imageUrl: design.image,
        title: design.title,
        watermark,
        tagline: t('download.tagline'),
      });
      recordDownload(design.id, design.title, watermark);
      if (watermark) {
        toast(t('download.toastFree'), {
          icon: <Droplets className="w-4 h-4 text-krown-orange" />,
          action: {
            label: t('download.upgradeAction'),
            onClick: () => onUpgrade(t('download.watermarkNote')),
          },
        });
      } else {
        toast.success(t('download.toastPro'), {
          icon: <Sparkles className="w-4 h-4 text-yellow-400" />,
        });
      }
    } catch (error) {
      console.warn('Design download failed:', error);
      toast.error(t('download.toastError'));
    } finally {
      setIsProcessing(false);
    }
  };

  const label = isProcessing
    ? t('download.processing')
    : status === 'signin'
      ? t('download.signin')
      : status === 'limit'
        ? t('download.limit')
        : status === 'redownload'
          ? t('download.again')
          : t('download.cta');

  const Icon = isProcessing ? Loader2 : status === 'redownload' ? RotateCcw : Download;

  return (
    <div className="mb-6">
      <div className={secondaryAction ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : ''}>
        <button
          type="button"
          onClick={handleDownload}
          disabled={isProcessing}
          aria-busy={isProcessing}
          aria-describedby={`download-note-${design.id}`}
          className="w-full min-h-[48px] py-4 bg-gradient-to-r from-krown-red to-krown-orange text-white font-bold rounded-xl hover:scale-105 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait disabled:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-krown-black"
        >
          <Icon className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} aria-hidden="true" />
          {label}
        </button>
        {secondaryAction}
      </div>

      <motion.div
        id={`download-note-${design.id}`}
        key={isPremium ? 'premium' : 'free'}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-center"
      >
        {isPremium ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 font-medium">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            {t('download.cleanBadge')}
          </span>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onUpgrade(t('download.watermarkNote'))}
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-krown-orange transition-colors underline-offset-2 hover:underline"
            >
              <Droplets className="w-3.5 h-3.5" aria-hidden="true" />
              {t('download.watermarkNote')}
            </button>
            {user.tier === 'basic' && (
              <span className="text-white/40">
                {status === 'redownload'
                  ? t('download.redownloadFree')
                  : t('download.remaining').replace('{count}', String(getRemainingDownloads()))}
              </span>
            )}
          </>
        )}
      </motion.div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

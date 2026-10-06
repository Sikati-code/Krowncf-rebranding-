import { motion, AnimatePresence, useDragControls, type PanInfo } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Clock, MessageCircle, Mail } from 'lucide-react';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';
import { useModalA11y } from '../hooks/use-modal-a11y';

// Hosted payment page (e.g. a Paystack or Flutterwave payment link). While it is
// empty, "Proceed to Payment" opens WhatsApp with a pre-filled enrollment message
// so the team can share payment details.
const PAYMENT_URL: string = '';

const WHATSAPP_NG = '2348136804699';
const WHATSAPP_CM = '237680200704';
const ENROLL_EMAIL = 'krownassets@gmail.com';

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: {
        title: string;
        price: string;
        gradient: string;
        weeks: number;
    } | null;
}

export default function EnrollmentModal({ isOpen, onClose, course }: EnrollmentModalProps) {
    const { t } = useLanguage();
    const isMobile = useIsMobile();
    const dragControls = useDragControls();
    const panelRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useModalA11y(isOpen, onClose, panelRef, closeRef);

    if (!course) return null;

    const message = t('enroll.message')
        .replace('{course}', course.title)
        .replace('{price}', course.price);
    const whatsappLink = (number: string) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    const emailLink = `mailto:${ENROLL_EMAIL}?subject=${encodeURIComponent(
        t('enroll.emailSubject').replace('{course}', course.title),
    )}&body=${encodeURIComponent(message)}`;

    const handleProceed = () => {
        const url = PAYMENT_URL
            ? `${PAYMENT_URL}${PAYMENT_URL.includes('?') ? '&' : '?'}course=${encodeURIComponent(course.title)}`
            : whatsappLink(WHATSAPP_NG);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.y > 120 || info.velocity.y > 600) onClose();
    };

    const included = [t('enroll.inc.live'), t('enroll.inc.mentorship'), t('enroll.inc.materials')];

    const contactOptions = [
        { href: whatsappLink(WHATSAPP_NG), icon: MessageCircle, label: t('enroll.whatsappNg'), detail: '+234 813 680 4699', tone: 'hover:border-green-500/50 hover:bg-green-500/10', iconTone: 'text-green-400' },
        { href: whatsappLink(WHATSAPP_CM), icon: MessageCircle, label: t('enroll.whatsappCm'), detail: '+237 680 20 07 04', tone: 'hover:border-green-500/50 hover:bg-green-500/10', iconTone: 'text-green-400' },
        { href: emailLink, icon: Mail, label: t('enroll.email'), detail: ENROLL_EMAIL, tone: 'hover:border-blue-500/50 hover:bg-blue-500/10', iconTone: 'text-blue-400' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="enroll-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Positioner: bottom sheet on mobile, centred card on larger screens */}
                    <motion.div key="enroll-positioner" className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:p-6 pointer-events-none">
                        <motion.div
                            key="enroll-panel"
                            ref={panelRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="enroll-title"
                            aria-describedby="enroll-summary"
                            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 24 }}
                            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
                            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 24 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                            drag={isMobile ? 'y' : false}
                            dragControls={dragControls}
                            dragListener={false}
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={{ top: 0, bottom: 0.6 }}
                            onDragEnd={handleDragEnd}
                            className="pointer-events-auto w-full md:max-w-lg flex flex-col max-h-[92dvh] md:max-h-[88vh] overflow-hidden rounded-t-3xl md:rounded-2xl glass-card border-white/10 bg-krown-dark/95 shadow-2xl"
                        >
                            {/* Header */}
                            <div className={`relative px-5 pt-3 pb-5 md:p-6 border-b border-white/5 bg-gradient-to-r ${course.gradient}`}>
                                {/* Drag handle (mobile) */}
                                <div
                                    onPointerDown={(e) => dragControls.start(e)}
                                    className="md:hidden flex justify-center pb-3 touch-none cursor-grab active:cursor-grabbing"
                                    aria-hidden="true"
                                >
                                    <span className="h-1.5 w-12 rounded-full bg-white/30" />
                                </div>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-xs uppercase tracking-[0.18em] text-white/60 font-medium">
                                            {t('enroll.eyebrow')}
                                        </p>
                                        <h3 id="enroll-title" className="mt-1 text-xl md:text-2xl font-bold text-white leading-tight">
                                            {course.title}
                                        </h3>
                                    </div>
                                    <button
                                        ref={closeRef}
                                        type="button"
                                        onClick={onClose}
                                        aria-label={t('enroll.close')}
                                        className="-mr-2 -mt-1 shrink-0 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                                    >
                                        <X className="w-6 h-6 md:w-5 md:h-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:p-6 space-y-6">
                                {/* Summary */}
                                <div id="enroll-summary" className="flex items-stretch gap-3">
                                    <div className="flex-1 rounded-2xl bg-krown-orange/10 border border-krown-orange/30 p-4">
                                        <p className="text-xs text-white/50">{t('enroll.price')}</p>
                                        <p className="mt-1 text-2xl md:text-3xl font-bold text-krown-orange">{course.price}</p>
                                        <p className="mt-1 text-[11px] text-white/50">{t('training.includes')}</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col justify-center min-w-[96px]">
                                        <p className="text-xs text-white/50 flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                            {t('enroll.duration')}
                                        </p>
                                        <p className="mt-1 text-lg font-semibold text-white">
                                            {course.weeks} {t('training.weeks')}
                                        </p>
                                    </div>
                                </div>

                                {/* Included */}
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-3">{t('enroll.included')}</h4>
                                    <ul className="space-y-2.5">
                                        {included.map((item, i) => (
                                            <motion.li
                                                key={item}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + i * 0.06 }}
                                                className="flex items-center gap-2.5 text-sm text-white/70"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-krown-orange shrink-0" aria-hidden="true" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Direct contact options */}
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="h-px flex-1 bg-white/10" />
                                        <span className="text-xs text-white/40">{t('enroll.or')}</span>
                                        <span className="h-px flex-1 bg-white/10" />
                                    </div>
                                    <div className="grid grid-cols-1 gap-2.5">
                                        {contactOptions.map((option) => (
                                            <a
                                                key={option.label}
                                                href={option.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center gap-3 min-h-[56px] px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${option.tone}`}
                                            >
                                                <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                                    <option.icon className={`w-5 h-5 ${option.iconTone}`} aria-hidden="true" />
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="block text-sm font-medium text-white">{option.label}</span>
                                                    <span className="block text-xs text-white/50 truncate">{option.detail}</span>
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-white/30 shrink-0" aria-hidden="true" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sticky footer */}
                            <div className="px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:p-6 border-t border-white/5 bg-krown-black/80 backdrop-blur">
                                <button
                                    type="button"
                                    onClick={handleProceed}
                                    className="w-full min-h-[56px] md:min-h-[48px] py-3.5 bg-gradient-to-r from-krown-red to-krown-red-dark text-white font-semibold rounded-2xl md:rounded-xl hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                >
                                    {t('enroll.proceed')}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </button>
                                <p className="mt-2 text-center text-[11px] text-white/40">{t('enroll.proceedHint')}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

import { motion, AnimatePresence, useDragControls, type PanInfo } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Clock, Mail, GraduationCap, Package, Copy } from 'lucide-react';
import { useRef, useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { useCheckout } from '../contexts/CheckoutContext';
import { useIsMobile } from '../hooks/use-mobile';
import { useModalA11y } from '../hooks/use-modal-a11y';
import { MATERIALS, formatNaira } from '../data/pricing';

// Free enrollees are only ever shown this address — no phone, no WhatsApp.
const ENROLL_EMAIL = 'info@krowncf.com';

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: {
        id: number;
        title: string;
        gradient: string;
        weeks: number;
    } | null;
}

type Step = 'choose' | 'enrolled';

export default function EnrollmentModal({ isOpen, onClose, course }: EnrollmentModalProps) {
    const { t } = useLanguage();
    const { user } = useUser();
    const { openCheckout } = useCheckout();
    const isMobile = useIsMobile();
    const dragControls = useDragControls();
    const panelRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const [step, setStep] = useState<Step>('choose');
    const [name, setName] = useState('');
    const [email, setEmail] = useState(user.email);
    const [formError, setFormError] = useState<string | null>(null);

    const close = () => {
        onClose();
        setStep('choose');
        setFormError(null);
    };

    useModalA11y(isOpen, close, panelRef, closeRef);

    if (!course) return null;

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.y > 120 || info.velocity.y > 600) close();
    };

    // Free enrollment: the registration is sent to info@krowncf.com by email.
    const enrollFree = (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setFormError(t('enroll.err.name'));
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setFormError(t('enroll.err.email'));
            return;
        }
        setFormError(null);
        const body = t('enroll.freeMessage')
            .replace('{name}', name.trim())
            .replace('{email}', email.trim())
            .replace('{course}', course.title);
        const subject = t('enroll.freeSubject').replace('{course}', course.title);
        window.location.href = `mailto:${ENROLL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStep('enrolled');
    };

    const buyMaterials = () => {
        close();
        openCheckout({ product: `materials:${course.id}`, label: course.title, reason: t('enroll.materialsReason') });
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(ENROLL_EMAIL);
            toast.success(t('enroll.emailCopied'));
        } catch {
            // Clipboard blocked — the address is visible on screen anyway.
        }
    };

    const freeIncludes = [t('enroll.inc.live'), t('enroll.inc.mentorship')];
    const materialIncludes = [t('enroll.inc.materials'), t('enroll.inc.assets'), t('enroll.inc.templates')];

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
                        onClick={close}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Positioner: bottom sheet on mobile, centred card on larger screens */}
                    <motion.div key="enroll-positioner" className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:p-6 pointer-events-none">
                        <motion.div
                            ref={panelRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="enroll-title"
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
                                            {step === 'enrolled' ? t('enroll.doneEyebrow') : t('enroll.eyebrow')}
                                        </p>
                                        <h3 id="enroll-title" className="mt-1 text-xl md:text-2xl font-bold text-white leading-tight">
                                            {course.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-white/70 flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                            {course.weeks} {t('training.weeks')}
                                        </p>
                                    </div>
                                    <button
                                        ref={closeRef}
                                        type="button"
                                        onClick={close}
                                        aria-label={t('enroll.close')}
                                        className="-mr-2 -mt-1 shrink-0 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                                    >
                                        <X className="w-6 h-6 md:w-5 md:h-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:p-6 space-y-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                                {step === 'choose' ? (
                                    <>
                                        {/* Option 1 — free enrollment */}
                                        <form
                                            onSubmit={enrollFree}
                                            noValidate
                                            className="rounded-2xl border-2 border-green-500/40 bg-green-500/5 p-4"
                                            aria-labelledby="enroll-free-title"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <h4 id="enroll-free-title" className="font-bold text-white flex items-center gap-2">
                                                    <GraduationCap className="w-5 h-5 text-green-400" aria-hidden="true" />
                                                    {t('enroll.freeTitle')}
                                                </h4>
                                                <span className="shrink-0 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-bold text-white">
                                                    {t('enroll.free')}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs text-white/60">{t('enroll.freeBlurb')}</p>
                                            <ul className="mt-3 space-y-1.5">
                                                {freeIncludes.map((item) => (
                                                    <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                                                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-4 grid gap-2.5">
                                                <input
                                                    type="text"
                                                    autoComplete="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder={t('enroll.namePlaceholder')}
                                                    aria-label={t('enroll.namePlaceholder')}
                                                    className="w-full min-h-[48px] rounded-xl border border-white/15 bg-white/5 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500"
                                                />
                                                <input
                                                    type="email"
                                                    autoComplete="email"
                                                    inputMode="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder={t('enroll.emailPlaceholder')}
                                                    aria-label={t('enroll.emailPlaceholder')}
                                                    className="w-full min-h-[48px] rounded-xl border border-white/15 bg-white/5 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-green-500"
                                                />
                                                {formError && (
                                                    <p role="alert" className="text-xs text-red-300">
                                                        {formError}
                                                    </p>
                                                )}
                                                <button
                                                    type="submit"
                                                    className="min-h-[52px] rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold flex items-center justify-center gap-2 transition-colors active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                                >
                                                    {t('enroll.freeCta')}
                                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </form>

                                        {/* Option 2 — optional paid materials */}
                                        <div className="rounded-2xl border-2 border-krown-orange/40 bg-krown-orange/5 p-4" aria-labelledby="enroll-materials-title">
                                            <div className="flex items-start justify-between gap-3">
                                                <h4 id="enroll-materials-title" className="font-bold text-white flex items-center gap-2">
                                                    <Package className="w-5 h-5 text-krown-orange" aria-hidden="true" />
                                                    {t('enroll.materialsName')}
                                                </h4>
                                                <span className="shrink-0 text-lg font-bold text-krown-orange">{formatNaira(MATERIALS.ngn)}</span>
                                            </div>
                                            <p className="mt-1 text-xs text-white/60">{t('enroll.materialsBlurb')}</p>
                                            <ul className="mt-3 space-y-1.5">
                                                {materialIncludes.map((item) => (
                                                    <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                                                        <CheckCircle2 className="w-4 h-4 text-krown-orange shrink-0" aria-hidden="true" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                type="button"
                                                onClick={buyMaterials}
                                                className="mt-4 w-full min-h-[52px] rounded-xl border border-krown-orange/60 bg-krown-orange/10 hover:bg-krown-orange/20 text-white font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-krown-orange"
                                            >
                                                {t('enroll.materialsCta').replace('{price}', formatNaira(MATERIALS.ngn))}
                                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                            </button>
                                            <p className="mt-2 text-center text-[11px] text-white/40">{t('enroll.materialsOptional')}</p>
                                        </div>
                                    </>
                                ) : (
                                    /* Free enrollment confirmation — email contact only */
                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center py-2" role="status">
                                        <Mail className="w-12 h-12 mx-auto text-green-400" aria-hidden="true" />
                                        <h4 className="mt-3 text-lg font-bold text-white">{t('enroll.doneTitle')}</h4>
                                        <p className="mt-2 text-sm text-white/70">{t('enroll.doneBody')}</p>
                                        <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 pl-4">
                                            <a href={`mailto:${ENROLL_EMAIL}`} className="flex-1 text-left text-sm font-semibold text-white hover:text-krown-orange">
                                                {ENROLL_EMAIL}
                                            </a>
                                            <button
                                                type="button"
                                                onClick={copyEmail}
                                                aria-label={t('enroll.copyEmail')}
                                                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10"
                                            >
                                                <Copy className="w-4 h-4" aria-hidden="true" />
                                            </button>
                                        </div>
                                        <p className="mt-3 text-xs text-white/40">{t('enroll.doneHint')}</p>
                                        <button
                                            type="button"
                                            onClick={close}
                                            className="mt-5 w-full min-h-[48px] rounded-xl bg-gradient-to-r from-krown-red to-krown-orange font-bold text-white"
                                        >
                                            {t('enroll.done')}
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

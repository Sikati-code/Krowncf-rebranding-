import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: {
        title: string;
        price: string;
        gradient: string;
    } | null;
}

export default function EnrollmentModal({ isOpen, onClose, course }: EnrollmentModalProps) {
    const [selectedPlan, setSelectedPlan] = useState<'full' | 'material'>('full');
    const [isProcessing, setIsProcessing] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleProceed = () => {
        if (isProcessing) return;
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
            setIsProcessing(false);
            onClose();
            // Here you would typically redirect to payment or show success
            alert(`Selected plan: ${selectedPlan === 'full' ? 'Full Course' : 'Materials Only'}\nProceeding to payment...`);
        }, 1000);
    };

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!course) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed left-0 right-0 bottom-0 z-50 pointer-events-auto"
                    >
                        <div className={`relative overflow-hidden rounded-t-3xl sm:rounded-2xl glass-card border-white/10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-auto w-full sm:w-[90vw] md:w-[85vw] max-w-2xl`}>
                            {/* Header */}
                            <div className={`p-5 sm:p-6 border-b border-white/5 bg-gradient-to-r ${course.gradient} sticky top-0 z-20`}>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">Select Enrollment Plan</h3>
                                    <button
                                        onClick={onClose}
                                        className="p-3 sm:p-2 text-white/60 hover:text-white transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
                                    >
                                        <X className="w-6 h-6 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                                <p className="text-white/80 text-sm sm:text-xs md:text-sm mt-2 font-medium">Course: {course.title}</p>
                            </div>

                            {/* Body */}
                            <div className="p-5 sm:p-6 bg-krown-dark/80 pb-32 sm:pb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4">
                                    {/* Full Course Option */}
                                    <div
                                        onClick={() => setSelectedPlan('full')}
                                        className={`relative p-5 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 active:scale-[0.98] min-h-[140px] ${selectedPlan === 'full'
                                            ? 'border-krown-orange bg-krown-orange/10 shadow-[0_0_20px_rgba(232,93,4,0.15)]'
                                            : 'border-white/5 hover:border-white/30 bg-white/5'
                                            }`}
                                    >
                                        {selectedPlan === 'full' && (
                                            <div className="absolute -top-2 -right-2 bg-krown-orange text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                                Selected
                                            </div>
                                        )}
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'full' ? 'border-krown-orange bg-krown-orange' : 'border-white/30'
                                                    }`}>
                                                    {selectedPlan === 'full' && <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />}
                                                </div>
                                                <h4 className="font-bold text-white text-sm sm:text-base">Full Course</h4>
                                            </div>
                                            <span className="font-bold text-krown-orange text-sm sm:text-base">{course.price}</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-white/50 ml-6 sm:ml-8 mb-2 sm:mb-3">Live sessions, mentorship, and complete access to all materials and tools.</p>
                                        <div className="ml-6 sm:ml-8 space-y-1 sm:space-y-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-krown-orange flex-shrink-0" />
                                                <span className="text-[10px] sm:text-xs text-white/60">Live Interactive Training</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-krown-orange flex-shrink-0" />
                                                <span className="text-[10px] sm:text-xs text-white/60">All Study Materials & Assets</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Materials Only Option */}
                                    <div
                                        onClick={() => setSelectedPlan('material')}
                                        className={`relative p-5 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 active:scale-[0.98] min-h-[140px] ${selectedPlan === 'material'
                                            ? 'border-krown-orange bg-krown-orange/10 shadow-[0_0_20px_rgba(232,93,4,0.15)]'
                                            : 'border-white/5 hover:border-white/30 bg-white/5'
                                            }`}
                                    >
                                        {selectedPlan === 'material' && (
                                            <div className="absolute -top-2 -right-2 bg-krown-orange text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                                Selected
                                            </div>
                                        )}
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'material' ? 'border-krown-orange bg-krown-orange' : 'border-white/30'
                                                    }`}>
                                                    {selectedPlan === 'material' && <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />}
                                                </div>
                                                <h4 className="font-bold text-white text-sm sm:text-base">Materials Only</h4>
                                            </div>
                                            <span className="font-bold text-yellow-500 text-sm sm:text-base">₦50,000</span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-white/50 ml-6 sm:ml-8 mb-2 sm:mb-3">Self-paced learning with complete access to notes, templates, and video guides.</p>
                                        <div className="ml-6 sm:ml-8 space-y-1 sm:space-y-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500 flex-shrink-0" />
                                                <span className="text-[10px] sm:text-xs text-white/60">All Study Materials & Assets</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 opacity-40">
                                                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                                <span className="text-[10px] sm:text-xs text-white/60 line-through">Live Interactive Training</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-5 sm:p-6 border-t border-white/5 bg-krown-black/50 sticky bottom-0 z-20">
                                <button 
                                    onClick={handleProceed}
                                    disabled={isProcessing}
                                    className="w-full py-4 sm:py-3.5 min-h-[56px] sm:min-h-[48px] bg-gradient-to-r from-krown-red to-krown-red-dark text-white font-medium rounded-2xl sm:rounded-xl hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-sm md:text-base active:scale-[0.98]"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Proceed to Payment
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

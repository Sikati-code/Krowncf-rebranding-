import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

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
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 px-4"
                    >
                        <div className={`relative overflow-hidden rounded-2xl glass-card border-white/10`}>
                            {/* Header */}
                            <div className={`p-6 border-b border-white/5 bg-gradient-to-r ${course.gradient}`}>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white">Select Enrollment Plan</h3>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-white/60 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-white/80 text-sm mt-2 font-medium">Course: {course.title}</p>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-4 bg-krown-dark/80">
                                {/* Full Course Option */}
                                <div
                                    onClick={() => setSelectedPlan('full')}
                                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedPlan === 'full'
                                        ? 'border-krown-orange bg-krown-orange/10 shadow-[0_0_20px_rgba(232,93,4,0.15)]'
                                        : 'border-white/5 hover:border-white/20 bg-white/5'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'full' ? 'border-krown-orange' : 'border-white/30'
                                                }`}>
                                                {selectedPlan === 'full' && <div className="w-2.5 h-2.5 rounded-full bg-krown-orange" />}
                                            </div>
                                            <h4 className="font-bold text-white">Full Course</h4>
                                        </div>
                                        <span className="font-bold text-krown-orange">{course.price}</span>
                                    </div>
                                    <p className="text-sm text-white/50 ml-7 mb-3">Live sessions, mentorship, and complete access to all materials and tools.</p>
                                    <div className="ml-7 space-y-1.5">
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-krown-orange flex-shrink-0" />
                                            <span className="text-xs text-white/60">Live Interactive Training</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-krown-orange flex-shrink-0" />
                                            <span className="text-xs text-white/60">All Study Materials & Assets</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Materials Only Option */}
                                <div
                                    onClick={() => setSelectedPlan('material')}
                                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedPlan === 'material'
                                        ? 'border-krown-orange bg-krown-orange/10 shadow-[0_0_20px_rgba(232,93,4,0.15)]'
                                        : 'border-white/5 hover:border-white/20 bg-white/5'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'material' ? 'border-krown-orange' : 'border-white/30'
                                                }`}>
                                                {selectedPlan === 'material' && <div className="w-2.5 h-2.5 rounded-full bg-krown-orange" />}
                                            </div>
                                            <h4 className="font-bold text-white">Materials Only</h4>
                                        </div>
                                        <span className="font-bold text-yellow-500">₦50,000</span>
                                    </div>
                                    <p className="text-sm text-white/50 ml-7 mb-3">Self-paced learning with complete access to notes, templates, and video guides.</p>
                                    <div className="ml-7 space-y-1.5">
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                                            <span className="text-xs text-white/60">All Study Materials & Assets</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 opacity-40">
                                            <X className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span className="text-xs text-white/60 line-through">Live Interactive Training</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 border-t border-white/5 bg-krown-black/50">
                                <button className="w-full py-3.5 bg-gradient-to-r from-krown-red to-krown-red-dark text-white font-medium rounded-xl hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 group">
                                    Proceed to Payment
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

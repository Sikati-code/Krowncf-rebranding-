import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Crown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const recentSearches = ['Flyers', 'Logos', 'Church', 'Birthday'];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const { t } = useLanguage();
    const [query, setQuery] = useState('');

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 pointer-events-none"
                    >
                        <div
                            className="relative w-full max-w-2xl bg-krown-dark/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Search Input Area */}
                            <div className="relative p-6 border-b border-white/10">
                                <div className="flex items-center gap-4">
                                    <Search className="w-6 h-6 text-krown-red flex-shrink-0" />
                                    <input
                                        autoFocus
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder={t('hero.search')}
                                        className="flex-1 bg-transparent text-xl text-white placeholder:text-white/40 focus:outline-none"
                                    />
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Search Results Area */}
                            <div className="p-6">
                                {query.length > 0 ? (
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-white/50 mb-3">Results for "{query}"</h3>
                                        {/* Simulated Results */}
                                        {['Premium Church Flyer Template', 'Creative Logo Mark', 'Business Card Bundle'].map((item, i) => (
                                            <motion.a
                                                key={i}
                                                href="#categories"
                                                onClick={onClose}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-krown-red/20 flex items-center justify-center">
                                                        <Crown className="w-5 h-5 text-krown-red" />
                                                    </div>
                                                    <span className="text-white group-hover:text-krown-red transition-colors">{item}</span>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-krown-red transition-colors" />
                                            </motion.a>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-sm font-medium text-white/50 mb-4">Recent Searches</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {recentSearches.map((term, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setQuery(term)}
                                                    className="px-4 py-2 rounded-full bg-white/5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

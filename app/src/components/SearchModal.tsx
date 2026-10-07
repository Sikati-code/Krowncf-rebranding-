import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Crown, LayoutGrid, Image as ImageIcon, GraduationCap, type LucideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { NAV_ITEMS } from '../data/navigation';
import { categories } from '../data/categories';
import { courses } from '../data/courses';
import { logos } from '../data/logos';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Result {
    key: string;
    label: string;
    hint?: string;
    to: string;
    icon: LucideIcon;
    image?: string;
}

const popularSearches = ['Flyers', 'Logos', 'Church', 'Birthday', 'Podcast', 'Training'];

/** Lower-case, accent-free text for forgiving matching ("Fête" finds "fete"). */
const normalize = (text: string) =>
    text
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase();

const allDesigns = categories.flatMap((category) => category.designs.map((design) => ({ design, category })));

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const q = normalize(query.trim());

    const groups = useMemo(() => {
        if (!q) return [];
        const has = (...texts: (string | undefined)[]) => texts.some((text) => text && normalize(text).includes(q));
        const fr = language === 'fr';

        const pages: Result[] = NAV_ITEMS.filter((item) => has(t(item.labelKey), t(item.descKey), item.keywords)).map((item) => ({
            key: `page-${item.id}`,
            label: t(item.labelKey),
            hint: t(item.descKey),
            to: item.to,
            icon: item.icon,
        }));

        const cats: Result[] = categories
            .filter((c) => has(c.name, c.nameFr, c.slug))
            .slice(0, 6)
            .map((c) => ({
                key: `cat-${c.slug}`,
                label: fr ? c.nameFr : c.name,
                hint: `${c.designs.length} designs`,
                to: `/categories/${c.slug}`,
                icon: LayoutGrid,
            }));

        const designs: Result[] = allDesigns
            .filter(({ design }) => has(design.title, design.titleFr))
            .slice(0, 6)
            .map(({ design, category }) => ({
                key: `design-${design.id}`,
                label: fr ? design.titleFr : design.title,
                hint: fr ? category.nameFr : category.name,
                to: `/design/${design.id}`,
                icon: ImageIcon,
                image: design.image,
            }));

        const courseResults: Result[] = courses
            .filter((c) => has(c.title))
            .map((c) => ({ key: `course-${c.id}`, label: c.title, hint: t('nav.training'), to: '/training', icon: GraduationCap }));

        const brandResults: Result[] = logos
            .filter((l) => has(l.name, l.industry))
            .slice(0, 4)
            .map((l) => ({ key: `logo-${l.id}`, label: l.name, hint: l.industry, to: `/design/${l.id}`, icon: Crown, image: l.image }));

        return [
            { title: t('search.pages'), items: pages },
            { title: t('nav.categories'), items: cats },
            { title: t('search.designs'), items: designs },
            { title: t('search.courses'), items: courseResults },
            { title: t('search.brands'), items: brandResults },
        ].filter((group) => group.items.length > 0);
    }, [q, language, t]);

    const first = groups[0]?.items[0];

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
                            role="dialog"
                            aria-modal="true"
                            aria-label={t('search.short')}
                            className="relative w-full max-w-2xl bg-krown-dark/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[calc(100dvh-7rem)]"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') onClose();
                            }}
                        >
                            {/* Search Input Area */}
                            <form
                                className="relative p-4 sm:p-6 border-b border-white/10"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!first) return;
                                    navigate(first.to);
                                    onClose();
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <Search className="w-6 h-6 text-krown-red flex-shrink-0" aria-hidden="true" />
                                    <input
                                        autoFocus
                                        type="search"
                                        enterKeyHint="go"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder={t('hero.search')}
                                        aria-label={t('search.short')}
                                        className="flex-1 min-w-0 bg-transparent text-lg sm:text-xl text-white placeholder:text-white/40 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        aria-label={t('search.close')}
                                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </form>

                            {/* Search Results Area */}
                            <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain">
                                {q ? (
                                    groups.length > 0 ? (
                                        <div className="space-y-5" aria-live="polite">
                                            <h3 className="text-sm font-medium text-white/50">
                                                {t('search.resultsFor').replace('{q}', query.trim())}
                                            </h3>
                                            {groups.map((group) => (
                                                <section key={group.title}>
                                                    <h4 className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                                                        {group.title}
                                                    </h4>
                                                    <ul>
                                                        {group.items.map((item, i) => (
                                                            <motion.li
                                                                key={item.key}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.04 }}
                                                            >
                                                                <Link
                                                                    to={item.to}
                                                                    onClick={onClose}
                                                                    className="flex items-center justify-between gap-3 min-h-[56px] p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                                                >
                                                                    <span className="flex items-center gap-4 min-w-0">
                                                                        <span className="w-10 h-10 shrink-0 rounded-lg bg-krown-red/20 flex items-center justify-center overflow-hidden">
                                                                            {item.image ? (
                                                                                <img src={item.image} alt="" loading="lazy" className="w-full h-full object-cover bg-white" />
                                                                            ) : (
                                                                                <item.icon className="w-5 h-5 text-krown-red" aria-hidden="true" />
                                                                            )}
                                                                        </span>
                                                                        <span className="min-w-0">
                                                                            <span className="block truncate text-white group-hover:text-krown-red transition-colors">{item.label}</span>
                                                                            {item.hint && <span className="block truncate text-xs text-white/40">{item.hint}</span>}
                                                                        </span>
                                                                    </span>
                                                                    <ChevronRight className="w-5 h-5 shrink-0 text-white/30 group-hover:text-krown-red transition-colors" aria-hidden="true" />
                                                                </Link>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-white/50" aria-live="polite">
                                            {t('search.noResults').replace('{q}', query.trim())}
                                        </p>
                                    )
                                ) : (
                                    <div>
                                        <h3 className="text-sm font-medium text-white/50 mb-4">{t('search.popular')}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {popularSearches.map((term) => (
                                                <button
                                                    key={term}
                                                    type="button"
                                                    onClick={() => setQuery(term)}
                                                    className="px-4 py-2 rounded-full bg-white/5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Section shortcuts: always one tap away */}
                                {(!q || groups.length === 0) && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-medium text-white/50 mb-3">{t('search.jumpTo')}</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {NAV_ITEMS.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    to={item.to}
                                                    onClick={onClose}
                                                    className="flex items-center gap-2 min-h-[48px] px-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/75 hover:text-white hover:bg-white/10 hover:border-krown-red/40 transition-colors"
                                                >
                                                    <item.icon className="w-4 h-4 shrink-0 text-krown-orange" aria-hidden="true" />
                                                    <span className="truncate">{t(item.labelKey)}</span>
                                                </Link>
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

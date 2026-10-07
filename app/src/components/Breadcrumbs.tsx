import { Fragment } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export interface Crumb {
  label: string;
  /** Omit for the current page (last crumb). */
  to?: string;
}

/** "Home › Section › Page" trail for inner pages. Home is added automatically. */
export default function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
  const { t } = useLanguage();

  return (
    <nav aria-label={t('nav.breadcrumb')} className={`text-sm text-white/60 ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 min-h-[32px] hover:text-krown-red transition-colors"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            {t('nav.home')}
          </Link>
        </li>
        {items.map((crumb, i) => (
          <Fragment key={`${crumb.label}-${i}`}>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            </li>
            <li className="min-w-0">
              {crumb.to ? (
                <Link to={crumb.to} className="inline-flex min-h-[32px] items-center hover:text-krown-red transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="block max-w-[60vw] sm:max-w-md truncate text-white">
                  {crumb.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

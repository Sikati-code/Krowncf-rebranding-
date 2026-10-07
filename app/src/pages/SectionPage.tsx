import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import Categories from '../sections/Categories';
import Training from '../sections/Training';
import Podcasts from '../sections/Podcasts';
import Entertainment from '../sections/Entertainment';
import { useLanguage } from '../contexts/LanguageContext';
import { navItem } from '../data/navigation';

const SECTIONS = {
  categories: Categories,
  training: Training,
  podcast: Podcasts,
  entertainment: Entertainment,
};

/** A home-page section on its own page, so it can be reached directly from anywhere. */
export default function SectionPage({ section }: { section: keyof typeof SECTIONS }) {
  const { t } = useLanguage();
  const Section = SECTIONS[section];

  return (
    <div className="min-h-screen bg-custom text-white overflow-x-hidden" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      <Header />
      <main className="pt-24 sm:pt-28">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <Breadcrumbs className="max-w-7xl mx-auto" items={[{ label: t(navItem(section).labelKey) }]} />
        </div>
        {/* The section keeps its own layout; only its top padding is reduced under the breadcrumbs. */}
        <div className="[&>section]:!pt-10 sm:[&>section]:!pt-14">
          <Section />
        </div>
      </main>
      <Footer />
    </div>
  );
}

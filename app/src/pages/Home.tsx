 import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import Hero from '../sections/Hero';
import LogoPortfolio from '../sections/LogoPortfolio';
import Categories from '../sections/Categories';
import Training from '../sections/Training';
import Podcasts from '../sections/Podcasts';
import Entertainment from '../sections/Entertainment';
import Events from '../sections/Events';

export default function Home() {
  return (
    <div className="min-h-screen bg-custom text-white overflow-x-hidden" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      <Header />
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Logo Portfolio Section - Brands We've Shaped */}
        <LogoPortfolio />
        
        {/* Categories Section */}
        <Categories />
        
        {/* Training Section - Replaces "Latest Insights & Tips" */}
        <Training />
        
        {/* Podcasts Section - Replaces "Tutorial" */}
        <Podcasts />
        
        {/* Entertainment Section - Replaces "Branding" */}
        <Entertainment />
        
        {/* Events Section - Replaces "Featured Design" with Auto-Slideshow */}
        <Events />
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  );
}

import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import LatestSection from '../sections/Latest';

export default function LatestPage() {
  return (
    <div className="min-h-screen bg-custom text-white overflow-x-hidden" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      <Header />
      
      <main>
        <LatestSection />
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  );
}

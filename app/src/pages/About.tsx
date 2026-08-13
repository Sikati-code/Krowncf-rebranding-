import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import AboutSection from '../sections/About';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-custom text-white overflow-x-hidden" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      <Header />
      
      <main>
        <AboutSection />
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  );
}

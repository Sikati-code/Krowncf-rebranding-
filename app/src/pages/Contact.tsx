import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import ContactSection from '../sections/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-custom text-white overflow-x-hidden" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      <Header />
      
      <main>
        <ContactSection />
      </main>
      
      <Footer />
      <FloatingCTA />
    </div>
  );
}

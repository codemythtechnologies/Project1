import { useScrollReveal } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';
import SideNav from '@/components/SideNav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Industries from '@/components/Industries';
import Process from '@/components/Process';
import Jobs from '@/components/Jobs';
import PartnerCompanies from '@/components/PartnerCompanies';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  useScrollReveal();

  return (
    <div className="grain">
      <Navbar />
      <SideNav />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <Process />
        <Jobs />
        <PartnerCompanies />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

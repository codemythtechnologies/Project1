import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Industries from '@/components/Industries';
import Stats from '@/components/Stats';
import Process from '@/components/Process';
import Jobs from '@/components/Jobs';
import PartnerCompanies from '@/components/PartnerCompanies';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Admin from '@/components/Admin';

function App() {
  const [route, setRoute] = useState<string>(window.location.hash);
  useScrollReveal();

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Re-run scroll reveal observer when DOM might have new animate-on-scroll elements
  useEffect(() => {
    if (route === '#admin') return;

    const checkAndObserve = () => {
      const elements = document.querySelectorAll('.animate-on-scroll:not(.is-visible)');
      if (elements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      );
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    const timer = setTimeout(checkAndObserve, 100);
    return () => clearTimeout(timer);
  }, [route]);

  // Admin route
  if (route === '#admin') {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <Stats />
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

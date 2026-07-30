import { SEO } from '../components/SEO';
import { Navigation } from '../components/sections/Navigation';
import { Hero } from '../components/sections/Hero';
import { StatsBar } from '../components/sections/StatsBar';
import { Services } from '../components/sections/Services';
import { EstimatorCallout } from '../components/sections/EstimatorCallout';
import { PricingPackages } from '../components/sections/PricingPackages';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';
import { Testimonials } from '../components/sections/Testimonials';
import { About } from '../components/sections/About';
import { Education } from '../components/sections/Education';
import { Certifications } from '../components/sections/Certifications';
import { Journal } from '../components/sections/Journal';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { FloatingWhatsApp } from '../components/sections/FloatingWhatsApp';
import { Footer } from '../components/sections/Footer';

export function Home() {
  return (
    <>
      <SEO 
        title="Alessio Bellan | Sviluppo Web e Brand Identity" 
        description="Ogni sito racconta una storia. Costruiamo la tua. Sviluppo siti web, gestionali e identità digitali per chi ha qualcosa da dire."
        canonical="/"
      />
      <Navigation />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <EstimatorCallout />
        <PricingPackages />
        <PortfolioGrid />
        <Education />
        <Certifications />
        <Testimonials />
        <Journal />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

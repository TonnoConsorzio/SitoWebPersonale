import { SEO } from '../components/SEO';
import { Navigation } from '../components/sections/Navigation';
import { Hero } from '../components/sections/Hero';
import { StatsBar } from '../components/sections/StatsBar';
import { Services } from '../components/sections/Services';
import { PricingCalculator } from '../components/sections/PricingCalculator';
import { PricingPackages } from '../components/sections/PricingPackages';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';
import { Testimonials } from '../components/sections/Testimonials';
import { About } from '../components/sections/About';
import { Journal } from '../components/sections/Journal';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { FloatingWhatsApp } from '../components/sections/FloatingWhatsApp';
import { CookieBanner } from '../components/sections/CookieBanner';
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
        <PricingCalculator />
        <PricingPackages />
        <PortfolioGrid />
        <Testimonials />
        <Journal />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CookieBanner />
    </>
  );
}

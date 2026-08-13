import { SEO } from '../components/SEO';
import { Navigation } from '../components/sections/Navigation';
import { Hero } from '../components/sections/Hero';
import { StatsBar } from '../components/sections/StatsBar';
import { Services } from '../components/sections/Services';
import { PricingPackages } from '../components/sections/PricingPackages';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';
import { Testimonials } from '../components/sections/Testimonials';
import { About } from '../components/sections/About';
import { Journal } from '../components/sections/Journal';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { FloatingWhatsApp } from '../components/sections/FloatingWhatsApp';
import { Footer } from '../components/sections/Footer';

export function Home() {
  return (
    <>
      <SEO 
        title="Alessio Bellan | Siti web e automazioni su misura"
        description="Siti web, landing page e automazioni per professionisti, associazioni e piccole realtà. Meno passaggi manuali, meno complicazioni tecniche."
        canonical="/"
      />
      <Navigation />
      <main>
        <Hero />
        <StatsBar />
        <PricingPackages />
        <Services />
        <PortfolioGrid />
        <About />
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

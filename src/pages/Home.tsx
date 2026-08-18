import { SEO } from '../components/SEO';
import { Navigation } from '../components/sections/Navigation';
import { Hero } from '../components/sections/Hero';
import { StatsBar } from '../components/sections/StatsBar';
import { Services } from '../components/sections/Services';
import { FormationSection } from '../components/sections/FormationSection';
import { PricingPackages } from '../components/sections/PricingPackages';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';
import { Testimonials } from '../components/sections/Testimonials';
import { About } from '../components/sections/About';
import { ProcessSection } from '../components/sections/ProcessSection';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';
import { lazy, Suspense } from 'react';
import { ThreadLoadingFallback } from '../components/ThreadLoadingFallback';

const ThreadCanvas = lazy(() => import('../components/ThreadCanvas').then((module) => ({ default: module.ThreadCanvas })));

export function Home() {
  return (
    <div className="experience-page">
      <SEO 
        title="Alessio Bellan | Siti web e automazioni su misura"
        description="Siti web, landing page e automazioni per professionisti, associazioni e piccole realtà. Meno passaggi manuali, meno complicazioni tecniche."
        canonical="/"
      />
      <Navigation />
      <div className="thread-layer"><Suspense fallback={<ThreadLoadingFallback />}><ThreadCanvas /></Suspense></div>
      <main id="contenuto" className="experience-main">
        <Hero />
        <StatsBar />
        <PortfolioGrid />
        <Services />
        <FormationSection />
        <ProcessSection />
        <PricingPackages />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

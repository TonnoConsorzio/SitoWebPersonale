import { lazy, Suspense } from 'react';
import { SEO } from '../components/SEO';
import { Navigation } from '../components/sections/Navigation';
import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { FormationSection } from '../components/sections/FormationSection';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';
import { Testimonials } from '../components/sections/Testimonials';
import { About } from '../components/sections/About';
import { ProcessSection } from '../components/sections/ProcessSection';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';
import { StatsBar } from '../components/sections/StatsBar';
import { useTranslation } from 'react-i18next';

const TunaScene = lazy(() => import('../components/scenes/TunaScene').then(({ TunaScene: scene }) => ({ default: scene })));

export function Home() {
  const { i18n } = useTranslation();
  const english = i18n.language.startsWith('en');
  return (
    <div className="experience-page">
      <SEO 
        title={english ? 'Alessio Bellan | Custom websites and automations' : 'Alessio Bellan | Siti web e automazioni su misura'}
        description={english ? 'Websites, landing pages and automations for professionals, associations and small businesses. Fewer manual steps, fewer technical complications.' : 'Siti web, landing page e automazioni per professionisti, associazioni e piccole realtà. Meno passaggi manuali, meno complicazioni tecniche.'}
        canonical="/"
      />
      <Navigation />
      <Suspense fallback={null}><TunaScene /></Suspense>
      <main id="contenuto" className="experience-main">
        <Hero />
        <StatsBar />
        <PortfolioGrid />
        <Services />
        <FormationSection />
        <ProcessSection />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

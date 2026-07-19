import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ArrowLeft, BookOpen, Briefcase, Code, Award } from 'lucide-react';
import experiences from '../data/curriculum.json';
import cvData from '../data/cv.json';
import certifications from '../data/certifications.json';
import { SEO } from '../components/SEO';

export function CurriculumPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Curriculum ed Esperienza" 
        description="Scopri il mio percorso professionale, le competenze e le esperienze nel campo dello sviluppo web e della comunicazione digitale."
        canonical="/curriculum"
      />
      <Navigation />
      <main className="pt-32 pb-24 px-6 md:px-8 max-w-4xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna alla Home
          </Link>
          <h1 className="font-display text-5xl md:text-7xl mb-6">Il mio curriculum</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Project Manager, esperto in grafica & comunicazione, e appassionato di innovazione e tecnologia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2 space-y-16">
            <section>
              <h2 className="flex items-center font-display text-3xl mb-8 text-primary">
                <Briefcase className="w-6 h-6 mr-3" />
                Esperienza
              </h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-px before:bg-white/10">
                {experiences.map((item, idx) => (
                  <div key={idx} className="relative flex items-start group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-background text-primary shadow shrink-0 z-10 mr-6 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex-1 liquid-glass p-6 rounded-2xl">
                      <h3 className="font-display text-xl text-foreground mb-1">{item.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
                        <span className="font-medium text-foreground/80">{item.company}</span>
                        <span>•</span>
                        <time className="text-primary/80 font-mono">{item.period}</time>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="flex items-center font-display text-3xl mb-8 text-primary">
                <BookOpen className="w-6 h-6 mr-3" />
                Formazione
              </h2>
              <div className="space-y-6">
                {cvData.education.map((item, idx) => (
                  <div key={idx} className="liquid-glass p-6 rounded-2xl">
                    <h3 className="font-display text-lg text-foreground mb-1">{item.title}</h3>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{item.school}</span>
                      <time className="text-primary/80 font-mono text-xs">{item.period}</time>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="flex items-center font-display text-3xl mb-8 text-primary">
                <Award className="w-6 h-6 mr-3" />
                Certificazioni
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {certifications.map((item, idx) => (
                  <div key={idx} className="liquid-glass p-5 rounded-2xl flex flex-col gap-4 group">
                    <div className="aspect-video w-full overflow-hidden rounded-xl bg-white/5 relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-1 leading-tight">{item.title}</h3>
                      <span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">{item.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="md:col-span-1 space-y-12">
            <div className="sticky top-32">
              <h2 className="flex items-center font-display text-3xl mb-6 text-primary">
                <Code className="w-6 h-6 mr-3" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="liquid-glass border border-white/10 rounded-full px-4 py-2 text-sm text-foreground/90"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { ArrowLeft, Briefcase, GraduationCap, Award, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import experiences from '../data/curriculum.json';
import cvData from '../data/cv.json';
import certifications from '../data/certifications.json';
import { SEO } from '../components/SEO';

export function CurriculumPage() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getLocalized = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[currentLang] || val['it'] || '';
  };

  return (
    <>
      <SEO 
        title="Curriculum ed Esperienze | Alessio Bellan" 
        description="Percorso professionale, esperienze lavorative, formazione e certificazioni di Alessio Bellan."
        canonical="/curriculum"
      />
      <Navigation />

      <main className="pt-28 pb-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        {/* Header Hero */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Link to="/" className="inline-flex items-center text-base font-mono text-primary hover:underline transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Torna alla Home
          </Link>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Curriculum e Percorso
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Sviluppatore web, coordinatore di progetti digitali e presidente di ABBO APS.
          </p>
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start max-w-7xl mx-auto">
          
          {/* Main Column: Experiences & Education */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Experience Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Briefcase className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Esperienze lavorative
                </h2>
              </div>

              <div className="space-y-6">
                {experiences.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="liquid-glass p-6 md:p-8 rounded-3xl border border-white/10 space-y-3 relative group hover:border-primary/40 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-2xl font-display text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-base font-mono bg-white/5 border border-white/10 text-primary shrink-0 w-fit">
                        {item.period}
                      </span>
                    </div>

                    <div className="text-base font-mono text-muted-foreground uppercase tracking-wider">
                      {item.company}
                    </div>

                    {item.description && (
                      <p className="text-base text-muted-foreground leading-relaxed pt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <GraduationCap className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Formazione
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cvData.education.map((item: any, idx: number) => {
                  const title = getLocalized(item.title);
                  const school = getLocalized(item.school);
                  const period = getLocalized(item.period);
                  return (
                    <div key={idx} className="liquid-glass p-6 rounded-2xl border border-white/10 space-y-2 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-lg text-foreground mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {title}
                        </h3>
                        <p className="text-base text-muted-foreground">{school}</p>
                      </div>
                      <span className="text-base font-mono text-primary pt-2 block">{period}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Certifications Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Award className="w-6 h-6 text-primary shrink-0" strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Certificazioni ({certifications.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {certifications.map((item: any, idx: number) => {
                  const certTitle = getLocalized(item.title);
                  return (
                    <div key={idx} className="liquid-glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 group hover:border-primary/30 transition-all">
                      <div className="aspect-video w-full overflow-hidden rounded-xl bg-white/5 relative">
                        <img 
                          src={item.image} 
                          alt={certTitle} 
                          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-base text-foreground mb-1 leading-snug">{certTitle}</h3>
                        <span className="text-base font-mono text-primary uppercase font-semibold">{item.issuer}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar Column: Skills & Summary */}
          <div className="lg:col-span-1 space-y-8 sticky top-28">
            <div className="liquid-glass p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                <Code className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
                <h3 className="text-2xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Competenze
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cvData.skills.map((skill: any, idx: number) => {
                  const skillName = getLocalized(skill);
                  return (
                    <span 
                      key={idx} 
                      className="bg-white/5 border border-white/10 hover:border-primary/40 rounded-full px-4 py-2 text-base text-foreground transition-all hover:scale-105"
                    >
                      {skillName}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="liquid-glass p-8 rounded-3xl border border-primary/30 text-center space-y-4">
              <h3 className="text-2xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Hai un progetto da proporre?
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Parliamone per capire insieme la soluzione migliore.
              </p>
              <Link
                to="/stima-progetto"
                className="liquid-glass rounded-full px-8 py-3.5 text-foreground font-medium hover:scale-[1.03] transition-transform text-base inline-block shadow-lg"
              >
                Inizia ora
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

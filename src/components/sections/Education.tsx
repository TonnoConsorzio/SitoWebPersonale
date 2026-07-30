import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cvData from '../../data/cv.json';
import { GraduationCap, Code } from 'lucide-react';

export function Education() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const getLocalized = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[currentLang] || val['it'] || '';
  };

  // Top 3 education items on home
  const mainEducation = cvData.education.slice(0, 3);

  return (
    <section id="formazione" ref={ref as any} className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
      <div className={`mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground flex items-center gap-4" 
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <GraduationCap className="w-9 h-9 text-primary shrink-0" strokeWidth={1.5} />
            Formazione e competenze
          </h2>
        </div>
        <Link 
          to="/curriculum" 
          className="text-sm font-medium text-primary hover:underline flex items-center transition-colors shrink-0"
        >
          <span>Vedi il curriculum completo →</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Education Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {mainEducation.map((item: any, idx: number) => {
            const title = getLocalized(item.title);
            const period = getLocalized(item.period);
            const school = getLocalized(item.school);

            return (
              <div 
                key={idx}
                className={`liquid-glass p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 group border border-white/10 ${
                  isInView ? 'animate-fade-rise' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <div>
                  <h3 className="text-base font-display text-foreground leading-tight group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    {school}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-primary shrink-0 w-fit">
                  {period}
                </span>
              </div>
            );
          })}
        </div>

        {/* Skills sidebar */}
        <div 
          className={`liquid-glass p-6 rounded-2xl space-y-4 border border-white/10 ${
            isInView ? 'animate-fade-rise-delay' : 'opacity-0'
          }`}
        >
          <h3 className="text-lg font-display text-foreground flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
            <Code className="w-4 h-4 text-primary" strokeWidth={1.5} />
            Competenze
          </h3>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.slice(0, 10).map((skill: any, idx: number) => {
              const skillName = getLocalized(skill);
              return (
                <span 
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-foreground/90"
                >
                  {skillName}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

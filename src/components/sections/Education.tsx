import { useInView } from '../../hooks/useInView';
import { useTranslation } from 'react-i18next';
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

  return (
    <section id="formazione" ref={ref as any} className="py-24 px-6 md:px-8 max-w-7xl mx-auto">
      <div className={`mb-16 md:mb-20 ${isInView ? 'animate-fade-rise' : 'opacity-0'}`}>
        <h2 
          className="text-4xl md:text-5xl font-display text-foreground flex items-center gap-4" 
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <GraduationCap className="w-10 h-10 text-primary shrink-0" strokeWidth={1.5} />
          {t('education.title')}
        </h2>
        <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
          {t('education.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Education Timeline / List */}
        <div className="lg:col-span-2 space-y-6">
          {cvData.education.map((item: any, idx: number) => {
            const title = getLocalized(item.title);
            const period = getLocalized(item.period);
            const school = getLocalized(item.school);

            return (
              <div 
                key={idx}
                className={`liquid-glass p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary/30 transition-all ${
                  isInView ? 'animate-fade-rise' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-display text-foreground leading-tight group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                    {school}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-primary shrink-0 w-fit">
                  {period}
                </span>
              </div>
            );
          })}
        </div>

        {/* Skills sidebar */}
        <div 
          className={`liquid-glass p-6 md:p-8 rounded-2xl space-y-6 ${
            isInView ? 'animate-fade-rise-delay' : 'opacity-0'
          }`}
        >
          <h3 className="text-xl font-display text-foreground flex items-center gap-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
            <Code className="w-5 h-5 text-primary" strokeWidth={1.5} />
            {t('education.skills_title')}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {cvData.skills.map((skill: any, idx: number) => {
              const skillName = getLocalized(skill);
              return (
                <span 
                  key={idx}
                  className="bg-white/5 border border-white/10 hover:border-primary/40 rounded-full px-4 py-2 text-sm text-foreground/90 transition-all hover:scale-[1.03]"
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

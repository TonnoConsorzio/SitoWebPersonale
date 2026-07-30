import { useTranslation } from 'react-i18next';

interface EstimatorProgressProps {
  currentStep: number;
  totalSteps: number;
  phaseName?: string;
}

export function EstimatorProgress({ currentStep, totalSteps, phaseName }: EstimatorProgressProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3 font-mono text-base">
      <div className="flex items-center justify-between text-muted-foreground">
        <span>{t('estimator.step_of', { current: currentStep, total: totalSteps })}</span>
        {phaseName && <span className="text-primary font-medium">{phaseName}</span>}
      </div>

      {/* Segmented bar */}
      <div className="flex gap-1.5 h-2">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-full transition-all duration-500 ${
              idx < currentStep ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

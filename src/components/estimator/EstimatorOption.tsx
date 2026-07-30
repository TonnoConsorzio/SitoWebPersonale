import { Check } from 'lucide-react';

interface EstimatorOptionProps {
  id: string;
  title: string;
  description?: string;
  isSelected: boolean;
  onSelect: () => void;
  multiSelect?: boolean;
}

export function EstimatorOption({
  id,
  title,
  description,
  isSelected,
  onSelect,
  multiSelect = false
}: EstimatorOptionProps) {
  return (
    <div
      role={multiSelect ? 'checkbox' : 'radio'}
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between select-none focus:outline-none focus:ring-2 focus:ring-primary ${
        isSelected
          ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)] scale-[1.01]'
          : 'liquid-glass border-white/10 hover:border-white/20 hover:bg-white/5'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className={`font-display text-lg font-medium leading-snug ${isSelected ? 'text-primary' : 'text-foreground'}`} style={{ fontFamily: "'Instrument Serif', serif" }}>
          {title}
        </h3>
        <div
          className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${
            isSelected
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-white/30 bg-black/20'
          }`}
        >
          {isSelected && <Check className="w-4 h-4" strokeWidth={3} />}
        </div>
      </div>

      {description && (
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

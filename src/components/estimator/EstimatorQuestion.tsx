import { Question } from '../../config/projectEstimator';
import { EstimatorOption } from './EstimatorOption';

interface EstimatorQuestionProps {
  question: Question;
  selectedAnswer?: string | string[];
  onAnswer: (optionId: string) => void;
}

export function EstimatorQuestion({
  question,
  selectedAnswer,
  onAnswer
}: EstimatorQuestionProps) {
  const isSelected = (optId: string) => {
    if (Array.isArray(selectedAnswer)) {
      return selectedAnswer.includes(optId);
    }
    return selectedAnswer === optId;
  };

  return (
    <div className="space-y-6 animate-fade-rise">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-4xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-base text-muted-foreground leading-relaxed">
            {question.subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((opt) => (
          <EstimatorOption
            key={opt.id}
            id={opt.id}
            title={opt.title}
            description={opt.description}
            isSelected={isSelected(opt.id)}
            onSelect={() => onAnswer(opt.id)}
            multiSelect={question.multiSelect}
          />
        ))}
      </div>
    </div>
  );
}

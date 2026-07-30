import { useState, useEffect, useMemo } from 'react';
import { SEO } from '../components/SEO';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import {
  ServiceType,
  ESTIMATOR_QUESTIONS,
  calculateEstimate
} from '../config/projectEstimator';

import { EstimatorProgress } from '../components/estimator/EstimatorProgress';
import { EstimatorQuestion } from '../components/estimator/EstimatorQuestion';
import { EstimatorResult } from '../components/estimator/EstimatorResult';
import { EstimatorOption } from '../components/estimator/EstimatorOption';

import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

const SERVICE_OPTIONS: { id: ServiceType; title: string; description: string }[] = [
  { id: 'siti-web', title: 'Sito web', description: 'Landing page, siti essenziali, aziendali o e-commerce.' },
  { id: 'gestionali-web-app', title: 'Gestionale o web app', description: 'Pannelli su misura per dati, soci, iscrizioni e processi.' },
  { id: 'automazioni', title: 'Automazione', description: 'Flussi automatici per ridurre compiti manuali e ripetitivi.' },
  { id: 'grafica-identita', title: 'Identità visiva', description: 'Logo, palette colori, tipografia e brand kit.' },
  { id: 'social-media', title: 'Gestione social', description: 'Piano editoriale, copy e grafiche per comunicare con costanza.' },
  { id: 'formazione-ai', title: 'Formazione AI', description: 'Corsi ed esercitazioni pratiche sull’uso dell’intelligenza artificiale.' },
  { id: 'infrastrutture', title: 'Infrastruttura o hosting', description: 'Setup server cloud, Docker, domini e certificati SSL.' },
  { id: 'non-sicuro', title: 'Non sono ancora sicuro', description: 'Domande orientate ai tuoi problemi principali per capire da dove partire.' }
];

const STORAGE_KEY = 'bellan_estimator_state_v1';

export function ProjectEstimatorPage() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.service || null;
      }
    } catch (e) {}
    return null;
  });

  const [stepIndex, setStepIndex] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.stepIndex || 0;
      }
    } catch (e) {}
    return 0;
  });

  const [answers, setAnswers] = useState<Record<string, string | string[]>>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.answers || {};
      }
    } catch (e) {}
    return {};
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ service: selectedService, stepIndex, answers })
      );
    } catch (e) {}
  }, [selectedService, stepIndex, answers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepIndex, selectedService]);

  const questions = selectedService ? ESTIMATOR_QUESTIONS[selectedService] || [] : [];
  const totalSteps = selectedService ? questions.length + 1 : 1;
  const isResultScreen = selectedService && stepIndex >= questions.length;

  const handleSelectService = (servId: ServiceType) => {
    setSelectedService(servId);
    setAnswers({});
    setStepIndex(0);
  };

  const handleAnswerQuestion = (qId: string, optId: string, multiSelect = false) => {
    if (!multiSelect) {
      setAnswers((prev) => ({ ...prev, [qId]: optId }));
      setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 200);
    } else {
      setAnswers((prev) => {
        const current = (prev[qId] as string[]) || [];
        if (optId === 'none') {
          return { ...prev, [qId]: ['none'] };
        }
        let updated = current.filter((item) => item !== 'none');
        if (updated.includes(optId)) {
          updated = updated.filter((item) => item !== optId);
        } else {
          updated.push(optId);
        }
        return { ...prev, [qId]: updated };
      });
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    } else {
      setSelectedService(null);
      setAnswers({});
    }
  };

  const handleRestart = () => {
    setSelectedService(null);
    setAnswers({});
    setStepIndex(0);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const currentQuestion = selectedService && stepIndex < questions.length ? questions[stepIndex] : null;

  const calculatedResult = useMemo(() => {
    if (!selectedService || !isResultScreen) return null;
    return calculateEstimate(selectedService, answers);
  }, [selectedService, isResultScreen, answers]);

  const serviceTitle = SERVICE_OPTIONS.find((s) => s.id === selectedService)?.title || 'Progetto';

  return (
    <>
      <SEO
        title="Stima il costo del tuo progetto | Alessio Bellan"
        description="Rispondi a poche domande e ottieni una prima fascia di prezzo indicativa per siti web, gestionali, automazioni e branding."
        canonical="/stima-progetto"
      />
      <Navigation />

      <main className="pt-28 pb-24 min-h-screen">
        {/* HERO SECTION */}
        <section className="px-6 md:px-8 max-w-3xl mx-auto text-center space-y-4 mb-10">
          <h1 className="text-3xl sm:text-5xl font-display text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Partiamo da quello che ti serve.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Rispondi a poche domande per ottenere una prima fascia indicativa.
          </p>
        </section>

        {/* MAIN ESTIMATOR CONTAINER */}
        <section className="px-6 md:px-8 max-w-4xl mx-auto">
          <div className="liquid-glass p-6 md:p-10 rounded-3xl border border-white/10 space-y-6 relative">
            
            {/* Step Progress */}
            {selectedService && !isResultScreen && (
              <EstimatorProgress
                currentStep={stepIndex + 2}
                totalSteps={totalSteps}
                phaseName={serviceTitle}
              />
            )}

            {/* STEP 1: SERVICE SELECTION */}
            {!selectedService && (
              <div className="space-y-6 animate-fade-rise">
                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-2xl font-display text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Cosa vuoi realizzare?
                  </h2>
                  <p className="text-xs text-muted-foreground">Seleziona una voce per iniziare.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICE_OPTIONS.map((serv) => (
                    <EstimatorOption
                      key={serv.id}
                      id={serv.id}
                      title={serv.title}
                      description={serv.description}
                      isSelected={false}
                      onSelect={() => handleSelectService(serv.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2+: DYNAMIC QUESTIONS */}
            {selectedService && currentQuestion && (
              <div className="space-y-6">
                <EstimatorQuestion
                  question={currentQuestion}
                  selectedAnswer={answers[currentQuestion.id]}
                  onAnswer={(optId) =>
                    handleAnswerQuestion(currentQuestion.id, optId, currentQuestion.multiSelect)
                  }
                />

                {/* Step Controls */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs">
                  <button
                    onClick={handleBack}
                    className="liquid-glass rounded-full px-5 py-2.5 text-foreground hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Indietro</span>
                  </button>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleRestart}
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Ricomincia</span>
                    </button>

                    {currentQuestion.multiSelect && (
                      <button
                        onClick={() => setStepIndex((prev) => prev + 1)}
                        className="bg-primary text-primary-foreground rounded-full px-6 py-2.5 font-medium hover:scale-105 transition-transform flex items-center gap-2"
                      >
                        <span>Continua</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* RESULT SCREEN */}
            {isResultScreen && calculatedResult && (
              <EstimatorResult
                result={calculatedResult}
                serviceTitle={serviceTitle}
                onRestart={handleRestart}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

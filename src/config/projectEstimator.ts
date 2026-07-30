export type ServiceType = 
  | 'siti-web'
  | 'gestionali-web-app'
  | 'automazioni'
  | 'grafica-identita'
  | 'social-media'
  | 'formazione-ai'
  | 'infrastrutture'
  | 'non-sicuro';

export interface QuestionOption {
  id: string;
  title: string;
  description?: string;
  iconName?: string;
  isExclusive?: boolean; // For "Nessuna di queste"
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  multiSelect?: boolean;
  options: QuestionOption[];
}

export interface EstimatorState {
  service: ServiceType | null;
  step: number;
  answers: Record<string, string | string[]>;
}

export interface EstimateResult {
  minPrice: number;
  maxPrice: number;
  isMonthly?: boolean;
  requiresAnalysis?: boolean;
  suggestedServiceTitle?: string;
  summaryItems: string[];
  includedItems: string[];
  costFactors: string[];
}

// Complete Question Data Structure for all 8 paths
export const ESTIMATOR_QUESTIONS: Record<ServiceType, Question[]> = {
  'siti-web': [
    {
      id: 'type',
      title: 'Che tipo di sito immagini?',
      options: [
        { id: 'landing', title: 'Landing page', description: 'Pagina unica per corsi, eventi o campagne.' },
        { id: 'essenziale', title: 'Sito essenziale', description: 'Presentazione chiara in 1-3 pagine per essere subito online.' },
        { id: 'aziendale', title: 'Sito aziendale', description: 'Struttura completa per raccontare servizi e progetti.' },
        { id: 'editoriale', title: 'Sito editoriale', description: 'Piattaforma per articoli, notizie o blog strutturato.' },
        { id: 'ecommerce', title: 'E-commerce', description: 'Negozio online con gestione prodotti e pagamenti.' },
        { id: 'non-so', title: 'Non lo so ancora', description: 'Valuteremo insieme la soluzione più adatta.' }
      ]
    },
    {
      id: 'size',
      title: 'Quanto sarà esteso?',
      options: [
        { id: 'single', title: 'Una sola pagina' },
        { id: 'up-to-5', title: 'Fino a 5 pagine' },
        { id: '6-10', title: 'Da 6 a 10 pagine' },
        { id: '10-plus', title: 'Più di 10 pagine' },
        { id: 'non-so', title: 'Non lo so ancora' }
      ]
    },
    {
      id: 'content',
      title: 'Da cosa partiamo?',
      options: [
        { id: 'ready', title: 'Ho già testi e identità' },
        { id: 'partial', title: 'Ho soltanto parte dei materiali' },
        { id: 'needed', title: 'Servono testi e grafica' },
        { id: 'to-define', title: 'È tutto da definire' }
      ]
    },
    {
      id: 'features',
      title: 'Servono funzioni particolari?',
      subtitle: 'Selezione multipla disponibile',
      multiSelect: true,
      options: [
        { id: 'forms', title: 'Moduli avanzati' },
        { id: 'bookings', title: 'Prenotazioni o iscrizioni' },
        { id: 'area', title: 'Area riservata' },
        { id: 'multilang', title: 'Più lingue' },
        { id: 'integrations', title: 'Integrazioni esterne' },
        { id: 'none', title: 'Nessuna di queste', isExclusive: true }
      ]
    }
  ],

  'gestionali-web-app': [
    {
      id: 'scope',
      title: 'Cosa deve aiutarti a gestire?',
      options: [
        { id: 'clients', title: 'Clienti o soci' },
        { id: 'events', title: 'Eventi e iscrizioni' },
        { id: 'docs', title: 'Documenti' },
        { id: 'tasks', title: 'Attività interne' },
        { id: 'bookings', title: 'Prenotazioni' },
        { id: 'custom', title: 'Un processo diverso' }
      ]
    },
    {
      id: 'users',
      title: 'Quante persone lo utilizzeranno?',
      options: [
        { id: 'single', title: 'Una persona' },
        { id: '2-5', title: 'Da 2 a 5' },
        { id: '6-20', title: 'Da 6 a 20' },
        { id: '20-plus', title: 'Più di 20' },
        { id: 'non-so', title: 'Non lo so ancora' }
      ]
    },
    {
      id: 'roles',
      title: 'Servono utenti con permessi differenti?',
      options: [
        { id: 'no', title: 'No' },
        { id: 'two', title: 'Due ruoli' },
        { id: 'multi', title: 'Più ruoli' },
        { id: 'non-so', title: 'Non lo so ancora' }
      ]
    },
    {
      id: 'integrations',
      title: 'Deve collegarsi ad altri strumenti?',
      options: [
        { id: 'no', title: 'No' },
        { id: 'email-forms', title: 'Email o moduli' },
        { id: 'payments', title: 'Pagamenti' },
        { id: 'external', title: 'Software esterni' },
        { id: 'multi', title: 'Più integrazioni' },
        { id: 'to-eval', title: 'Da valutare' }
      ]
    }
  ],

  'automazioni': [
    {
      id: 'target',
      title: 'Cosa vuoi ridurre?',
      options: [
        { id: 'copy-paste', title: 'Copia e incolla' },
        { id: 'email', title: 'Invio di email' },
        { id: 'docs', title: 'Creazione di documenti' },
        { id: 'data-entry', title: 'Inserimento di dati' },
        { id: 'requests', title: 'Gestione delle richieste' },
        { id: 'other', title: 'Un’altra attività' }
      ]
    },
    {
      id: 'tools-count',
      title: 'Quanti strumenti sono coinvolti?',
      options: [
        { id: 'one', title: 'Uno' },
        { id: 'two', title: 'Due' },
        { id: '3-4', title: 'Tre o quattro' },
        { id: '4-plus', title: 'Più di quattro' },
        { id: 'non-so', title: 'Non lo so ancora' }
      ]
    },
    {
      id: 'frequency',
      title: 'Quanto spesso si ripete?',
      options: [
        { id: 'monthly', title: 'Alcune volte al mese' },
        { id: 'weekly', title: 'Ogni settimana' },
        { id: 'daily', title: 'Ogni giorno' },
        { id: 'many-daily', title: 'Molte volte al giorno' }
      ]
    },
    {
      id: 'ai-need',
      title: 'Serve intelligenza artificiale?',
      options: [
        { id: 'no', title: 'No' },
        { id: 'likely', title: 'Probabilmente sì' },
        { id: 'non-so', title: 'Non lo so' },
        { id: 'explore', title: 'Voglio prima capire se serve' }
      ]
    }
  ],

  'grafica-identita': [
    {
      id: 'scope',
      title: 'Cosa ti serve?',
      options: [
        { id: 'logo', title: 'Logo' },
        { id: 'logo-base', title: 'Logo e identità di base' },
        { id: 'brand-kit', title: 'Brand kit' },
        { id: 'full-identity', title: 'Identità completa' },
        { id: 'restyling', title: 'Aggiornamento di un’identità esistente' }
      ]
    },
    {
      id: 'direction',
      title: 'Hai già una direzione visiva?',
      options: [
        { id: 'defined', title: 'Sì, è definita' },
        { id: 'partial', title: 'Ho alcuni riferimenti' },
        { id: 'zero', title: 'No, partiamo da zero' }
      ]
    },
    {
      id: 'channels',
      title: 'Dove verrà utilizzata?',
      multiSelect: true,
      options: [
        { id: 'website', title: 'Sito web' },
        { id: 'social', title: 'Social' },
        { id: 'print', title: 'Materiali stampati' },
        { id: 'decks', title: 'Presentazioni e documenti' },
        { id: 'multi', title: 'Più contesti' }
      ]
    }
  ],

  'social-media': [
    {
      id: 'support-type',
      title: 'Di quale supporto hai bisogno?',
      options: [
        { id: 'strategy', title: 'Strategia iniziale' },
        { id: 'plan', title: 'Piano editoriale' },
        { id: 'copy-graphics', title: 'Copy e grafiche' },
        { id: 'full-mgmt', title: 'Gestione completa' },
        { id: 'coaching', title: 'Affiancamento al team' }
      ]
    },
    {
      id: 'channels-count',
      title: 'Quanti canali?',
      options: [
        { id: 'one', title: 'Uno' },
        { id: 'two', title: 'Due' },
        { id: '3-plus', title: 'Tre o più' },
        { id: 'non-so', title: 'Non lo so ancora' }
      ]
    },
    {
      id: 'frequency',
      title: 'Quale frequenza immagini?',
      options: [
        { id: 'casual', title: 'Occasionale' },
        { id: '1-per-week', title: 'Un contenuto a settimana' },
        { id: '2-3-per-week', title: 'Due o tre a settimana' },
        { id: 'frequent', title: 'Più frequente' },
        { id: 'to-define', title: 'Da definire' }
      ]
    },
    {
      id: 'materials',
      title: 'Hai già materiali da utilizzare?',
      options: [
        { id: 'yes', title: 'Sì' },
        { id: 'partial', title: 'In parte' },
        { id: 'no', title: 'No' },
        { id: 'photos-needed', title: 'Servono anche foto o video professionali' }
      ]
    }
  ],

  'formazione-ai': [
    {
      id: 'audience',
      title: 'A chi è rivolta?',
      options: [
        { id: 'single', title: 'Una persona' },
        { id: 'small-group', title: 'Piccolo gruppo' },
        { id: 'team', title: 'Team aziendale' },
        { id: 'association', title: 'Associazione o ente' },
        { id: 'large-group', title: 'Classe o gruppo numeroso' }
      ]
    },
    {
      id: 'format',
      title: 'Quale formato preferisci?',
      options: [
        { id: 'online', title: 'Online' },
        { id: 'in-person', title: 'In presenza' },
        { id: 'non-so', title: 'Non lo so ancora' }
      ]
    },
    {
      id: 'duration',
      title: 'Quanto deve durare?',
      options: [
        { id: 'intro', title: 'Incontro introduttivo' },
        { id: 'half-day', title: 'Mezza giornata' },
        { id: 'full-day', title: 'Una giornata' },
        { id: 'multi-day', title: 'Percorso di più incontri' },
        { id: 'to-define', title: 'Da definire' }
      ]
    },
    {
      id: 'customization',
      title: 'Quanto deve essere personalizzata?',
      options: [
        { id: 'general', title: 'Contenuti generali' },
        { id: 'sector', title: 'Esempi del settore' },
        { id: 'real-processes', title: 'Esercitazioni sui processi reali' },
        { id: 'full-custom', title: 'Percorso completamente personalizzato' }
      ]
    }
  ],

  'infrastrutture': [
    {
      id: 'target-app',
      title: 'Cosa devi pubblicare?',
      options: [
        { id: 'static', title: 'Sito statico' },
        { id: 'cms', title: 'Sito con CMS' },
        { id: 'webapp', title: 'Web app' },
        { id: 'gestionale', title: 'Gestionale' },
        { id: 'multi', title: 'Più servizi' },
        { id: 'non-so', title: 'Non lo so ancora' }
      ]
    },
    {
      id: 'existing-infra',
      title: 'Hai già un’infrastruttura?',
      options: [
        { id: 'no', title: 'No' },
        { id: 'check-needed', title: 'Sì, ma va verificata' },
        { id: 'migrate', title: 'Sì, voglio migrarla' },
        { id: 'non-so', title: 'Non lo so' }
      ]
    },
    {
      id: 'scope-tasks',
      title: 'Cosa deve essere gestito?',
      multiSelect: true,
      options: [
        { id: 'dns', title: 'Dominio e DNS' },
        { id: 'server', title: 'Server o hosting' },
        { id: 'db', title: 'Database' },
        { id: 'backup', title: 'Backup' },
        { id: 'monitoring', title: 'Monitoraggio' },
        { id: 'updates', title: 'Aggiornamenti' }
      ]
    }
  ],

  'non-sicuro': [
    {
      id: 'goal',
      title: 'Cosa vuoi migliorare?',
      options: [
        { id: 'presence', title: 'Presentarmi meglio online' },
        { id: 'work-org', title: 'Organizzare il lavoro' },
        { id: 'manual-tasks', title: 'Ridurre attività manuali' },
        { id: 'social-comm', title: 'Comunicare sui social' },
        { id: 'training', title: 'Formare un gruppo' },
        { id: 'publish', title: 'Pubblicare un progetto' }
      ]
    },
    {
      id: 'stage',
      title: 'A che punto sei?',
      options: [
        { id: 'idea', title: 'Ho soltanto un’idea' },
        { id: 'materials-ready', title: 'Ho già materiali' },
        { id: 'using-tools', title: 'Uso già alcuni strumenti' },
        { id: 'replace-tool', title: 'Voglio sostituire qualcosa' },
        { id: 'stuck', title: 'Non so da dove iniziare' }
      ]
    }
  ]
};

// PRICING ENGINE - Centralized calculation based on actual approved repo prices
export function calculateEstimate(
  service: ServiceType,
  answers: Record<string, string | string[]>
): EstimateResult {
  let min = 0;
  let max = 0;
  let isMonthly = false;
  let requiresAnalysis = false;
  let suggestedServiceTitle: string | undefined;

  const summaryItems: string[] = [];
  const includedItems: string[] = ['Analisi iniziale dei requisiti', 'Progettazione e sviluppo', 'Collaudo prima del lancio'];
  const costFactors: string[] = [];

  switch (service) {
    case 'siti-web': {
      const type = answers['type'] as string;
      const size = answers['size'] as string;
      const content = answers['content'] as string;
      const features = (answers['features'] as string[]) || [];

      if (type === 'landing') {
        min = 450; max = 650;
        summaryItems.push('Landing page singola');
      } else if (type === 'essenziale') {
        min = 550; max = 850;
        summaryItems.push('Sito essenziale');
      } else if (type === 'aziendale') {
        min = 950; max = 1450;
        summaryItems.push('Sito aziendale');
      } else if (type === 'ecommerce') {
        min = 1600; max = 2400;
        summaryItems.push('E-commerce');
      } else {
        min = 700; max = 1100;
        summaryItems.push('Sito web personalizzato');
      }

      if (size === 'up-to-5') { min += 150; max += 250; summaryItems.push('Fino a 5 pagine'); }
      if (size === '6-10') { min += 300; max += 500; summaryItems.push('Da 6 a 10 pagine'); }
      if (size === '10-plus') { min += 500; max += 850; summaryItems.push('Più di 10 pagine'); }

      if (content === 'needed' || content === 'to-define') {
        min += 200; max += 400;
        costFactors.push('Scrittura testi e produzione grafica');
      }

      if (features.includes('area')) { min += 250; max += 450; summaryItems.push('Area riservata'); }
      if (features.includes('multilang')) { min += 200; max += 350; summaryItems.push('Multilingua'); }
      if (features.includes('bookings')) { min += 200; max += 350; summaryItems.push('Modulo prenotazioni'); }

      includedItems.push('Design responsive', 'SEO base integrata', 'Form di contatto', 'Setup dominio e hosting');
      if (features.length > 2) costFactors.push('Integrazioni con sistemi esterni');
      costFactors.push('Quantità finale dei contenuti forniti');
      break;
    }

    case 'gestionali-web-app': {
      requiresAnalysis = true;
      const scope = answers['scope'] as string;
      const users = answers['users'] as string;
      const roles = answers['roles'] as string;

      min = 1200; max = 2200;
      if (scope === 'clients') summaryItems.push('Gestione clienti/soci');
      if (scope === 'events') summaryItems.push('Iscrizioni ed eventi');
      if (scope === 'docs') summaryItems.push('Gestione documenti');

      if (users === '6-20') { min += 300; max += 500; }
      if (users === '20-plus') { min += 500; max += 900; }

      if (roles === 'multi') { min += 300; max += 600; summaryItems.push('Permessi multi-ruolo'); }

      includedItems.push('Pannello amministrativo', 'Generazione documenti PDF', 'Ruoli e permessi utenti', 'Primo mese di assistenza');
      costFactors.push('Complessità delle logiche aziendali');
      costFactors.push('Integrazioni con software o API esterne');
      costFactors.push('Migrazione di dati pregressi');
      break;
    }

    case 'automazioni': {
      const count = answers['tools-count'] as string;
      const aiNeed = answers['ai-need'] as string;

      min = 350; max = 650;
      summaryItems.push('Flusso automatico');

      if (count === '3-4') { min += 200; max += 350; summaryItems.push('3-4 strumenti collegati'); }
      if (count === '4-plus') { min += 400; max += 700; summaryItems.push('Più di 4 strumenti'); }

      if (aiNeed === 'likely') {
        min += 150; max += 300;
        summaryItems.push('Elaborazione con AI');
        costFactors.push('Costi API ed elaborazione dati AI');
      }

      includedItems.push('Collegamento moduli e mail', 'Generazione automatica documenti', 'Gestione notifiche ed errori', 'Test ed esecuzione');
      costFactors.push('Numero di scenari ed eccezioni nel flusso');
      costFactors.push('Limitazioni delle API degli strumenti scelti');
      break;
    }

    case 'grafica-identita': {
      const scope = answers['scope'] as string;

      if (scope === 'logo') { min = 350; max = 500; summaryItems.push('Logo Vettoriale'); }
      else if (scope === 'logo-base') { min = 500; max = 750; summaryItems.push('Logo e Palette'); }
      else if (scope === 'brand-kit') { min = 750; max = 1100; summaryItems.push('Brand Kit Completo'); }
      else { min = 950; max = 1450; summaryItems.push('Identità Visiva Completa'); }

      includedItems.push('File vettoriali (SVG, PDF, PNG)', 'Palette colori cromatica', 'Guida ai font e gerarchie', 'Diritti d’uso completi');
      costFactors.push('Numero di varianti e applicazioni richieste');
      costFactors.push('Realizzazione di layout per stampa o presentazioni');
      break;
    }

    case 'social-media': {
      isMonthly = true;
      const support = answers['support-type'] as string;
      const channels = answers['channels-count'] as string;

      if (support === 'strategy') {
        min = 300; max = 500; isMonthly = false;
        summaryItems.push('Strategia e Piano Editoriale');
      } else {
        min = 250; max = 450;
        summaryItems.push('Gestione Social Mensile');
        if (channels === 'two') { min += 100; max += 150; }
        if (channels === '3-plus') { min += 200; max += 300; }
      }

      includedItems.push('Piano editoriale mensile', 'Grafiche e copy coordinati', 'Programmazione post', 'Reportistica periodica');
      costFactors.push('Frequenza settimanale dei contenuti');
      costFactors.push('Eventuale produzione di foto o video professionali');
      break;
    }

    case 'formazione-ai': {
      const audience = answers['audience'] as string;
      const duration = answers['duration'] as string;

      min = 250; max = 450;
      summaryItems.push('Corso Formazione AI');

      if (audience === 'team' || audience === 'large-group') { min += 200; max += 400; }
      if (duration === 'full-day' || duration === 'multi-day') { min += 300; max += 600; }

      includedItems.push('Analisi processi reali', 'Lezioni ed esercitazioni pratiche', 'Materiali e prontuario prompt');
      costFactors.push('Numero di partecipanti e giornate');
      costFactors.push('Personalizzazione delle esercitazioni sui dati aziendali');
      break;
    }

    case 'infrastrutture': {
      const app = answers['target-app'] as string;
      min = 150; max = 350;
      summaryItems.push('Setup Server e Hosting');

      if (app === 'webapp' || app === 'gestionale') { min += 150; max += 300; }

      includedItems.push('Configurazione server cloud/VPS', 'Setup ambienti Docker', 'Certificati SSL HTTPS', 'Documentazione accessi');
      costFactors.push('Canone mensile del provider cloud prescelto');
      costFactors.push('Eventuale piano di backup e manutenzione ricorrente');
      break;
    }

    case 'non-sicuro': {
      const goal = answers['goal'] as string;
      if (goal === 'presence') {
        min = 550; max = 850;
        suggestedServiceTitle = 'Sito Web Essenziale';
        summaryItems.push('Orientamento: Presenza Web');
      } else if (goal === 'work-org') {
        min = 1200; max = 2200; requiresAnalysis = true;
        suggestedServiceTitle = 'Gestionale su Misura';
        summaryItems.push('Orientamento: Organizzazione Lavoro');
      } else if (goal === 'manual-tasks') {
        min = 350; max = 650;
        suggestedServiceTitle = 'Automazione Flussi';
        summaryItems.push('Orientamento: Riduzione Lavoro Manuale');
      } else {
        min = 450; max = 850;
        suggestedServiceTitle = 'Consulenza e Progetto Su Misura';
        summaryItems.push('Orientamento: Progetto Personalizzato');
      }

      includedItems.push('Chiamata di analisi iniziale', 'Definizione priorità e strumento', 'Stima dei tempi ed esecuzione');
      costFactors.push('Definizione finale dei requisiti');
      break;
    }
  }

  return {
    minPrice: min,
    maxPrice: max,
    isMonthly,
    requiresAnalysis,
    suggestedServiceTitle,
    summaryItems,
    includedItems,
    costFactors
  };
}

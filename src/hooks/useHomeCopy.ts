import { useTranslation } from 'react-i18next';

export const homeCopy = {
  it: {
    nav: { services: 'Servizi', projects: 'Progetti', pricing: 'Prezzi', about: 'Chi sono', journal: 'Journal', skip: 'Vai al contenuto', changeLanguage: 'Cambia lingua', openMenu: 'Apri menu', closeMenu: 'Chiudi menu' },
    hero: {
      titleA: 'Idee', titleAEmphasis: 'fuori di testa.', titleB: 'Soluzioni', titleBMiddle: 'con i', titleBEmphasis: 'piedi per terra.',
      typewriter: ['Siti web', 'Automazioni', 'Gestionali e web app', 'Formazione', 'Identità visiva', 'Infrastrutture'], staticTypewriter: 'siti web, automazioni, formazione e strumenti digitali.',
      book: 'Prenota 15 minuti', projects: 'Guarda i progetti', sceneLabel: 'Computer retro interattivo'
    },
    projects: {
      introA: 'Non ti racconto cosa potrei fare.', introB: 'Ti faccio vedere cosa sto facendo.', cta: 'Guarda il progetto', all: 'Vedi tutti i progetti',
      items: [
        { label: 'Digital Heroes', title: 'Meno dipendenza da Eventbrite. Più controllo.', description: 'Una piattaforma per gestire eventi, iscrizioni e biglietti con un sistema proprietario.', cta: 'Guarda Digital Heroes', open: 'Apri il progetto Digital Heroes', alt: 'Anteprima completa del progetto Digital Heroes' },
        { label: 'ABBO APS', title: 'Un gestionale pensato per l’associazione. Non adattato a forza.', description: 'È in sviluppo per riunire la gestione interna e sostituire strumenti generici, tra cui un servizio da 79 € al mese.', cta: 'Guarda il progetto', open: 'Apri il progetto ABBO APS', alt: 'Anteprima completa del progetto ABBO APS' }
      ]
    },
    services: {
      titleA: 'Dimmi cosa', titleEmphasis: 'non funziona.', titleB: 'Il servizio lo scegliamo dopo.', all: 'Vedi tutti i servizi',
      groups: [
        { title: 'Farti scegliere', services: 'Siti web · Identità', description: 'Per far capire in fretta chi sei, cosa fai e perché dovrebbero contattarti.', cta: 'Siti e identità', path: '/servizi/siti-web' },
        { title: 'Farti risparmiare tempo', emphasis: 'risparmiare tempo', services: 'Automazioni · Gestionali · Web app', description: 'Per togliere di mezzo passaggi manuali, doppioni e strumenti che non si parlano.', cta: 'Automazioni e software', path: '/servizi/automazioni' },
        { title: 'Darti autonomia', emphasis: 'autonomia', services: 'Formazione · Infrastruttura', description: 'Per capire meglio gli strumenti che usi e dipendere meno dagli altri.', cta: 'Formazione e infrastruttura', path: '/servizi/formazione-ai' }
      ]
    },
    formation: { title: 'Qualcosa che puoi usare il giorno dopo.', copyA: 'AI e strumenti digitali spiegati attraverso esempi, esercizi e problemi reali.', copyB: 'Niente sfilata di tool. L’obiettivo è capire cosa ti serve e imparare a usarlo davvero.', cta: 'Scopri la formazione' },
    process: {
      titleEmphasisA: 'Non sparisco', titleMiddle: 'per tre settimane.', titleB: 'È', titleEmphasisB: 'parte del servizio.', footer: 'Niente ostaggi digitali.', book: 'Prenota 15 minuti',
      steps: [
        ['01', 'Mi racconti il problema', 'Quindici minuti. Niente presentazioni infinite.'],
        ['02', 'Ti dico cosa farei', 'Cosa costruire, cosa evitare, quanto può costare e quanto tempo serve.'],
        ['03', 'Lo costruiamo', 'Vedi come procede. Quando una decisione riguarda te, la prendiamo insieme.'],
        ['04', 'Te lo consegno davvero', 'Accessi, codice, dati e indicazioni per usarlo.']
      ]
    },
    pricing: {
      titleEmphasis: 'Prezzi chiari.', titleB: 'Prima di iniziare.', footnote: 'Nessuno dei tre? Meglio non comprare un pacchetto sbagliato.', contact: 'Parliamone', book: 'Prenota 15 minuti',
      packages: [
        { name: 'PARTENZA', oldPrice: '880 €', price: '790 €', saving: 'Risparmi 90 €', features: ['Sito Essenziale', 'Logo'] },
        { name: 'CRESCITA', oldPrice: '2.255 €', price: '2.030 €', saving: 'Risparmi 225 €', features: ['Sito Standard', 'Brand Kit', 'Configurazione server'] },
        { name: 'SISTEMA', oldPrice: '4.950 €', price: '4.450 €', saving: 'Risparmi 500 €', features: ['Sito su misura', 'Identità completa', 'Gestionale base'] }
      ]
    },
    about: {
      title: 'Mi piacciono i problemi storti.', portraitAlt: 'Ritratto di Alessio Bellan',
      paragraphs: ['Progetto e sviluppo siti, automazioni e strumenti digitali.', 'Se una soluzione semplice basta, non ti vendo quella complicata.', 'Se invece la soluzione non esiste, provo a costruirla.', 'E c’è una regola a cui tengo parecchio:', 'Durante il progetto sai cosa sta succedendo.', 'Non sparisco con la tua idea per tornare settimane dopo con qualcosa che non riconosci.'],
      cta: 'Conosciamoci', abboTitle: 'Una parte del mio lavoro tiene in piedi anche qualcos’altro.', abboCopyA: 'Il', abboEmphasis: '10% del compenso di ogni progetto', abboCopyB: 'sostiene ABBO APS, l’associazione non profit per l’educazione digitale che ho cofondato e presiedo.', abboCta: 'Conosci ABBO APS'
    },
    testimonials: { title: 'Meglio far parlare loro.', previous: 'Testimonianza precedente', next: 'Testimonianza successiva' },
    faq: {
      titleA: 'Domande sensate.', titleB: 'Risposte senza giri strani.',
      items: [
        ['Non so esattamente cosa mi serve. È un problema?', 'No. Non devi arrivare con il nome della tecnologia o un capitolato di trenta pagine. Raccontami cosa vuoi ottenere o cosa oggi non funziona. La parte tecnica viene dopo.'],
        ['Perché dovrei scegliere te invece di un’agenzia?', 'Con me parli direttamente con la persona che pensa e costruisce il progetto. Meno passaggi, più confronto. Se il tuo progetto richiede una struttura più grande di quella che posso offrirti, te lo dico.'],
        ['Dominio, codice e dati restano miei?', 'Sì. Il progetto non deve diventare un modo per tenerti legato a me.'],
        ['Ci saranno costi mensili?', 'Se servono hosting, domini, software o servizi esterni, te li dico prima. Niente abbonamenti che compaiono magicamente dopo la consegna.'],
        ['Devo usare per forza una soluzione personalizzata?', 'No. Se WordPress, un software esistente o uno strumento già pronto risolve bene il problema, ha poco senso costruirne uno da zero. Custom non significa automaticamente migliore.'],
        ['Mi terrai aggiornato durante il progetto?', 'Sì. Preferisco mostrarti cosa sta succedendo mentre lavoriamo piuttosto che sparire e presentarti tutto alla fine.'],
        ['E dopo la consegna?', 'Decidiamo insieme quanta autonomia vuoi. Posso continuare a seguirti oppure lasciarti documentazione, accessi e strumenti per gestire ciò che puoi gestire da solo.'],
        ['Quanto tempo serve?', 'Dipende dal progetto. Un sito semplice può richiedere circa 1–2 settimane. Un progetto più complesso o un gestionale può richiedere 4–6 settimane o più. Prima di iniziare definiamo tempi e passaggi.']
      ]
    },
    contact: {
      title: 'Non devi conoscere già la soluzione.', copy: 'Raccontami il problema. In 15 minuti capiamo se posso aiutarti e quale potrebbe essere la strada giusta.', book: 'Prenota 15 minuti', metaA: 'Se non sono la persona adatta,', metaEmphasis: 'te lo dico.', metaB: '15 minuti. Nessuna pressione commerciale.',
      name: 'Nome', namePlaceholder: 'Il tuo nome…', email: 'Email', emailPlaceholder: 'nome@azienda.it…', service: 'Cosa vuoi sistemare?', servicePlaceholder: 'Scegli una voce', services: ['Sito web', 'Automazione', 'Gestionale o web app', 'Formazione', 'Identità o social', 'Non lo so ancora'], message: 'Raccontami in breve', messagePlaceholder: 'Cosa succede oggi? Cosa vorresti cambiare?…', submit: 'Prepara email', sent: 'Si è aperto il tuo programma email. Controlla destinatario e contenuto prima di inviare.', subject: 'Richiesta progetto da'
    },
    footer: { tagline: 'Idee fuori di testa. Soluzioni con i piedi per terra.', donation: 'Il 10% del compenso di ogni progetto sostiene ABBO APS.', explore: 'Esplora', talk: 'Parliamo', services: 'Servizi', projects: 'Progetti', pricing: 'Prezzi', about: 'Chi sono', built: 'Progettato e sviluppato da Alessio Bellan.' }
  },
  en: {
    nav: { services: 'Services', projects: 'Projects', pricing: 'Pricing', about: 'About', journal: 'Journal', skip: 'Skip to content', changeLanguage: 'Change language', openMenu: 'Open menu', closeMenu: 'Close menu' },
    hero: {
      titleA: 'Bold', titleAEmphasis: 'ideas.', titleB: 'Grounded', titleBMiddle: '', titleBEmphasis: 'solutions.',
      typewriter: ['Websites', 'Automation', 'Admin tools and web apps', 'Training', 'Visual identity', 'Infrastructure'], staticTypewriter: 'websites, automation, training and digital tools.',
      book: 'Book 15 minutes', projects: 'See projects', sceneLabel: 'Interactive retro computer'
    },
    projects: {
      introA: 'I won’t tell you what I could do.', introB: 'I’ll show you what I’m doing.', cta: 'See the project', all: 'See all projects',
      items: [
        { label: 'Digital Heroes', title: 'Less dependence on Eventbrite. More control.', description: 'A platform to manage events, registrations and tickets through a proprietary system.', cta: 'See Digital Heroes', open: 'Open the Digital Heroes project', alt: 'Full preview of the Digital Heroes project' },
        { label: 'ABBO APS', title: 'An admin tool designed for the association. Not forced to fit.', description: 'It is being built to bring internal operations together and replace generic tools, including a €79/month service.', cta: 'See the project', open: 'Open the ABBO APS project', alt: 'Full preview of the ABBO APS project' }
      ]
    },
    services: {
      titleA: 'Tell me what', titleEmphasis: 'is not working.', titleB: 'We choose the service after that.', all: 'See all services',
      groups: [
        { title: 'Help people choose you', services: 'Websites · Identity', description: 'So people quickly understand who you are, what you do and why they should contact you.', cta: 'Websites and identity', path: '/servizi/siti-web' },
        { title: 'Save you time', emphasis: 'time', services: 'Automations · Admin tools · Web apps', description: 'To remove manual steps, duplicate work and tools that do not speak to each other.', cta: 'Automation and software', path: '/servizi/automazioni' },
        { title: 'Give you autonomy', emphasis: 'autonomy', services: 'Training · Infrastructure', description: 'So you understand the tools you use and depend less on other people.', cta: 'Training and infrastructure', path: '/servizi/formazione-ai' }
      ]
    },
    formation: { title: 'Something you can use the day after.', copyA: 'AI and digital tools explained through examples, exercises and real problems.', copyB: 'No parade of tools. The point is to understand what you need and learn to use it for real.', cta: 'Explore training' },
    process: {
      titleEmphasisA: 'I do not disappear', titleMiddle: 'for three weeks.', titleB: 'It is', titleEmphasisB: 'part of the service.', footer: 'No digital hostages.', book: 'Book 15 minutes',
      steps: [
        ['01', 'You tell me the problem', 'Fifteen minutes. No endless presentations.'],
        ['02', 'I tell you what I would do', 'What to build, what to avoid, what it may cost and how long it may take.'],
        ['03', 'We build it', 'You see how it is going. When a decision affects you, we make it together.'],
        ['04', 'I actually hand it over', 'Access, code, data and guidance for using it.']
      ]
    },
    pricing: {
      titleEmphasis: 'Clear pricing.', titleB: 'Before we start.', footnote: 'None of the three? Better not buy the wrong package.', contact: 'Let’s talk', book: 'Book 15 minutes',
      packages: [
        { name: 'START', oldPrice: '€880', price: '€790', saving: 'Save €90', features: ['Essential website', 'Logo'] },
        { name: 'GROWTH', oldPrice: '€2,255', price: '€2,030', saving: 'Save €225', features: ['Standard website', 'Brand kit', 'Server setup'] },
        { name: 'SYSTEM', oldPrice: '€4,950', price: '€4,450', saving: 'Save €500', features: ['Custom website', 'Full identity', 'Basic admin tool'] }
      ]
    },
    about: {
      title: 'I like crooked problems.', portraitAlt: 'Portrait of Alessio Bellan',
      paragraphs: ['I design and build websites, automations and digital tools.', 'If a simple solution is enough, I will not sell you a complicated one.', 'If the solution does not exist, I try to build it.', 'And there is one rule I care about:', 'During the project, you know what is happening.', 'I do not disappear with your idea only to return weeks later with something you do not recognise.'],
      cta: 'Get to know me', abboTitle: 'Part of my work also keeps something else going.', abboCopyA: 'The', abboEmphasis: '10% of every project fee', abboCopyB: 'supports ABBO APS, the non-profit digital education association I co-founded and chair.', abboCta: 'Meet ABBO APS'
    },
    testimonials: { title: 'Better let them speak.', previous: 'Previous testimonial', next: 'Next testimonial' },
    faq: {
      titleA: 'Sensible questions.', titleB: 'Straight answers.',
      items: [
        ['I do not know exactly what I need. Is that a problem?', 'No. You do not need to arrive with the name of a technology or a thirty-page specification. Tell me what you want to achieve or what is not working today. The technical part comes after.'],
        ['Why choose you instead of an agency?', 'You speak directly with the person who thinks through and builds the project. Fewer handovers, more discussion. If your project needs a larger structure than I can provide, I will tell you.'],
        ['Will the domain, code and data remain mine?', 'Yes. The project should not become a way to keep you tied to me.'],
        ['Will there be monthly costs?', 'If hosting, domains, software or external services are needed, I tell you before. No subscriptions appearing after delivery.'],
        ['Do I have to use a custom solution?', 'No. If WordPress, an existing product or a ready-made tool solves the problem well, there is little point in building one from scratch. Custom does not automatically mean better.'],
        ['Will you keep me updated during the project?', 'Yes. I prefer showing you what is happening while we work instead of disappearing and presenting everything at the end.'],
        ['What happens after delivery?', 'We decide together how much autonomy you want. I can keep supporting you or leave documentation, access and tools so you can manage what you can independently.'],
        ['How long does it take?', 'It depends on the project. A simple website can take around 1–2 weeks. A more complex project or admin tool can take 4–6 weeks or more. Before starting, we define timing and stages.']
      ]
    },
    contact: {
      title: 'You do not need to know the solution already.', copy: 'Tell me the problem. In 15 minutes, we will understand whether I can help and what a sensible route could be.', book: 'Book 15 minutes', metaA: 'If I am not the right person,', metaEmphasis: 'I will tell you.', metaB: '15 minutes. No sales pressure.',
      name: 'Name', namePlaceholder: 'Your name…', email: 'Email', emailPlaceholder: 'name@company.com…', service: 'What do you want to fix?', servicePlaceholder: 'Choose an option', services: ['Website', 'Automation', 'Admin tool or web app', 'Training', 'Identity or social', 'I do not know yet'], message: 'Tell me briefly', messagePlaceholder: 'What happens today? What would you change?…', submit: 'Prepare email', sent: 'Your email app has opened. Check the recipient and content before sending.', subject: 'Project request from'
    },
    footer: { tagline: 'Bold ideas. Grounded solutions.', donation: '10% of every project fee supports ABBO APS.', explore: 'Explore', talk: 'Let’s talk', services: 'Services', projects: 'Projects', pricing: 'Pricing', about: 'About', built: 'Designed and built by Alessio Bellan.' }
  }
} as const;

export function useHomeCopy() {
  const { i18n } = useTranslation();
  return homeCopy[i18n.language.startsWith('en') ? 'en' : 'it'];
}

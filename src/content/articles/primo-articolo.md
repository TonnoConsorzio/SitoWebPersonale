---
title: Da WordPress ed Eventbrite a una piattaforma proprietaria: come ho sviluppato il sito di Digital Heroes
date: 2026-07-26
excerpt: Come ho costruito il sito web di di Digital Heroes da WordPress ed Eventbrite a una piattaforma proprietaria
tags: Tech, Markdown, React
---

Quando si parla di realizzare un sito web, spesso si pensa a una vetrina digitale: alcune pagine informative, un modulo di contatto e una sezione dedicata alle attività.

Per Digital Heroes, però, un semplice sito non sarebbe stato sufficiente.

L’obiettivo era costruire un ecosistema digitale capace non solo di raccontare il progetto, ma anche di gestirne concretamente le attività: pubblicazione degli eventi, iscrizioni, comunicazioni automatiche, lista d’attesa, presenze e amministrazione dei partecipanti.

In altre parole, non soltanto un sito web, ma un vero strumento operativo.

## Che cos’è Digital Heroes

Digital Heroes è un’iniziativa promossa da ABBO APS e rivolta principalmente a ragazzi tra i 9 e i 14 anni.

Il progetto nasce con l’obiettivo di accompagnare i più giovani nell’apprendimento pratico della tecnologia attraverso laboratori dedicati a programmazione, videogiochi, robotica, elettronica e consapevolezza digitale.

Le attività comprendono, tra le altre:

- coding con Scratch e Python;
- robotica con LEGO Spike e mBot;
- Minecraft Education;
- Arduino ed elettronica;
- sicurezza online;
- privacy, social network e riconoscimento delle fake news.

I laboratori si svolgono in presenza, durano generalmente circa tre ore e hanno un costo di 5 euro all’ora.

Alla base del progetto c’è un principio semplice: aiutare i ragazzi a non essere soltanto consumatori passivi di tecnologia, ma a comprenderla e utilizzarla in modo creativo e consapevole.

## Il problema del sistema precedente

In precedenza, la pubblicazione e la gestione degli eventi si basavano su un sito WordPress integrato con Eventbrite.

Era una soluzione funzionante, ma presentava diversi limiti.

Il percorso di registrazione risultava più macchinoso del necessario e portava l’utente fuori dall’ambiente del progetto. Inoltre, l’esperienza era poco personalizzabile e dipendeva dalle logiche, dall’interfaccia e dai costi di una piattaforma esterna.

Per iscriversi a un laboratorio destinato a ragazzi e famiglie, volevamo invece un processo molto semplice:

1. aprire la pagina dell’evento;
2. inserire i dati richiesti;
3. confermare l’iscrizione;
4. ricevere immediatamente tutte le informazioni utili.

Senza obbligare le persone a scaricare un’applicazione o a creare un nuovo account.

Da qui è nata la scelta di sviluppare un sistema proprietario.

## Non un’integrazione, ma un prodotto completo

La decisione più importante è stata quella di non limitarsi a sostituire Eventbrite con un altro servizio.

Ho progettato e sviluppato un’unica applicazione che comprende sia il sito pubblico sia il pannello amministrativo.

Dal lato dell’utente, il sistema permette di consultare gli eventi disponibili e iscrivere uno o più ragazzi attraverso un modulo integrato direttamente nel sito.

Durante la registrazione vengono raccolte le informazioni necessarie, come i dati del genitore o tutore, il nome del partecipante, l’eventuale necessità di ricevere un computer dall’associazione e i consensi relativi a privacy e comunicazioni.

Dopo l’iscrizione, il sistema salva i dati e invia automaticamente una conferma contenente le informazioni logistiche dell’evento.

Quando i posti disponibili terminano, l’iscrizione può essere inserita in una lista d’attesa. Se successivamente si libera un posto, l’amministratore può promuovere il partecipante e inviargli automaticamente una nuova comunicazione.

Sono stati previsti anche reminder prima dell’evento e notifiche in caso di annullamento, così da ridurre le operazioni manuali e mantenere più facilmente aggiornate le famiglie.

## Il gestionale amministrativo

La parte pubblica rappresenta solo una metà del progetto.

All’interno della stessa applicazione ho sviluppato un’area amministrativa protetta, attraverso la quale è possibile:

- creare e modificare gli eventi;
- configurare data, orario, sede, immagine, descrizione, capienza e prezzo;
- controllare le iscrizioni ricevute;
- gestire la lista d’attesa;
- inserire manualmente una prenotazione;
- registrare le presenze;
- gestire l’annullamento degli eventi;
- esportare i dati;
- consultare statistiche e indicatori operativi.

In questo modo il sito non è più soltanto il luogo in cui vengono presentate le attività, ma diventa lo strumento centrale con cui vengono organizzate.

Questo approccio consente inoltre di avere maggiore controllo sull’esperienza utente, sui dati raccolti e sull’evoluzione futura del progetto.

## Le tecnologie utilizzate

Per la realizzazione ho scelto uno stack JavaScript e TypeScript moderno.

Il frontend è stato sviluppato con React, TypeScript e Vite, mentre per l’interfaccia e il sistema di stile ho utilizzato Tailwind CSS.

La parte backend è basata su Node.js ed Express. Per database e autenticazione ho utilizzato Supabase, basato su PostgreSQL, mentre le email transazionali e i reminder vengono gestiti attraverso servizi dedicati e automazioni programmate.

Il sito e il gestionale fanno parte della stessa applicazione, ma le aree pubbliche e amministrative sono separate attraverso autenticazione, ruoli e controlli sui permessi.

Ho lavorato anche sulla visibilità organica del progetto, inserendo metadati e dati strutturati dedicati agli eventi, in modo da fornire ai motori di ricerca informazioni più precise su date, luoghi, modalità di partecipazione e prezzi.

## La sicurezza come difficoltà principale

La sfida tecnica più importante non è stata la realizzazione di una singola funzionalità, ma la sicurezza complessiva del sistema.

Quando un’applicazione gestisce dati relativi a iscrizioni, minori, genitori ed eventi, non è sufficiente nascondere l’area amministrativa dietro una schermata di login.

È necessario verificare ogni operazione, validare i dati ricevuti e impedire che un utente possa eseguire azioni per le quali non possiede i permessi necessari.

Per questo sono stati introdotti diversi livelli di protezione:

- autenticazione per l’accesso al gestionale;
- ruoli e permessi amministrativi;
- controlli sia lato client sia lato server;
- limitazione delle richieste alle API;
- sistemi anti-bot nei moduli pubblici;
- validazione degli input;
- gestione esplicita dei consensi privacy;
- protezione delle operazioni più sensibili.

È probabilmente la parte meno visibile per chi utilizza il sito, ma è anche una delle più importanti.

## Un’identità visiva Neobrutalist

Oltre all’architettura tecnica, ho curato personalmente anche la progettazione e lo sviluppo dell’interfaccia.

In accordo con il direttore artistico, abbiamo scelto uno stile ispirato al Neobrutalism: colori netti, bordi marcati, ombre evidenti, tipografia decisa e componenti immediatamente riconoscibili.

L’obiettivo non era seguire semplicemente una tendenza grafica, ma costruire un’identità coerente con Digital Heroes: giovane, energica, accessibile e lontana dall’aspetto istituzionale che spesso caratterizza i progetti educativi.

Ho seguito l’intero processo, dalla grafica e dalla user experience fino al database, alle automazioni, alla sicurezza e al deployment.

## Cosa ho imparato sviluppando l’intero progetto

Questo progetto mi ha confermato quanto la qualità del contesto iniziale sia fondamentale per la buona riuscita di un prodotto digitale.

Prima di sviluppare bisogna comprendere con precisione il problema, i flussi operativi, gli utenti e le eccezioni che il sistema dovrà gestire.

Ho imparato anche l’importanza delle verifiche incrociate.

Quando ci si accorge che una funzionalità, una scelta architetturale o anche un piccolo dettaglio non funziona correttamente, conviene fermarsi e tornare indietro. Ignorare un problema nelle prime fasi significa quasi sempre trascinarlo fino alla fine, quando correggerlo sarà più complesso.

La necessità di approfondire gli strumenti utilizzati mi ha inoltre portato a studiare nuovi argomenti e a conseguire diverse certificazioni. Non soltanto per aggiungere tecnologie al progetto, ma per comprenderle abbastanza da poter prendere decisioni consapevoli.

## Il prossimo passo: il test sul campo

Il sito è attualmente in fase di test.

Le funzionalità sono state verificate attraverso prove tecniche e dati generici, ma il sistema non è ancora stato utilizzato con dati reali di partecipanti.

Il primo test operativo è previsto per ottobre 2026, con l’inizio della nuova stagione di Digital Heroes.

Sarà il momento in cui potremo osservare il comportamento della piattaforma nel suo contesto reale: dalla semplicità del percorso di iscrizione all’affidabilità delle comunicazioni, fino alla gestione quotidiana degli eventi attraverso il pannello amministrativo.

Il progetto è consultabile su [digital-heroes.me](https://digital-heroes.me/).

Essendo ancora in fase di evoluzione, osservazioni, suggerimenti e nuove idee sono più che benvenuti.

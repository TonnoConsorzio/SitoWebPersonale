---
title: Da Eventbrite a una piattaforma proprietaria: il viaggio dietro Digital Heroes
date: 2026-07-26
excerpt: Come ho costruito il sito web di di Digital Heroes da WordPress ed Eventbrite a una piattaforma proprietaria
tags: Tech, Markdown, React
---

**Ho sviluppato una piattaforma proprietaria per gestire eventi, iscrizioni e reminder. Ma il vero lavoro è iniziato quando ho capito che non stavo costruendo un semplice sito web.**

Stavo costruendo il sistema operativo di un progetto educativo.

Questa è la storia di Digital Heroes, delle difficoltà che mi hanno portato a ripensare da zero la gestione degli eventi e di ciò che ho imparato occupandomi personalmente dell’intero progetto: identità visiva, esperienza utente, frontend, backend, database, sicurezza e deployment.

## Il punto di partenza: un progetto per creare, non solo consumare

Digital Heroes è un’iniziativa promossa da **ABBO APS** e rivolta principalmente a ragazzi tra i **9 e i 14 anni**.

L’obiettivo è accompagnarli nell’apprendimento pratico della tecnologia e aiutarli a passare da consumatori passivi a creatori consapevoli.

I laboratori affrontano temi come:

- coding con Scratch e Python;
- robotica con LEGO Spike e mBot;
- sviluppo di piccoli videogiochi;
- Minecraft Education;
- Arduino ed elettronica;
- sicurezza online;
- privacy, social network e riconoscimento delle fake news.

Le attività si svolgono in presenza, durano generalmente circa tre ore e hanno un costo di **5 euro all’ora**.

Il progetto educativo era chiaro.

Lo strumento digitale che avrebbe dovuto sostenerlo, invece, aveva bisogno di evolvere.

## Il primo ostacolo: quando una soluzione funzionante non è più quella giusta

In precedenza, gli eventi venivano pubblicati su un sito WordPress e gestiti attraverso un’integrazione con Eventbrite.

Il sistema funzionava, ma imponeva al progetto le logiche di una piattaforma esterna.

Il percorso di registrazione era più macchinoso di quanto volessimo. L’esperienza grafica era poco personalizzabile, gli utenti venivano portati fuori dall’ambiente di Digital Heroes e i costi erano elevati rispetto alle nostre esigenze.

Soprattutto, c’era una domanda che continuava a tornare:

> Perché chiedere a un genitore di scaricare un’applicazione o creare un nuovo account solo per iscrivere un ragazzo a un laboratorio?

Volevamo un percorso più diretto:

1. aprire la pagina dell’evento;
2. leggere tutte le informazioni;
3. compilare il modulo;
4. ricevere la conferma.

Nessun passaggio superfluo. Nessun account obbligatorio. Nessun cambio di piattaforma.

A quel punto avremmo potuto cercare un altro servizio esterno.

Ho scelto invece la strada più impegnativa: costruire un sistema proprietario.

## La soglia da attraversare: smettere di pensare a un sito

La prima svolta del progetto è arrivata quando ho smesso di considerarlo un semplice sito web.

Digital Heroes aveva bisogno di due prodotti che lavorassero insieme:

- uno spazio pubblico capace di raccontare il progetto e presentare gli eventi;
- un gestionale amministrativo per organizzare concretamente le attività.

Ho quindi sviluppato un’unica applicazione che unisce comunicazione e operatività.

Dal lato pubblico, le famiglie possono consultare gli eventi e iscrivere uno o più partecipanti direttamente dal sito.

Il modulo raccoglie i dati del genitore o tutore, il nome del ragazzo, l’eventuale necessità di ricevere un computer dall’associazione, l’iscrizione di fratelli o sorelle e i consensi relativi alla privacy e alla newsletter.

Dopo l’invio, l’iscrizione viene registrata e il sistema invia automaticamente una conferma con le informazioni utili.

Quando un evento raggiunge la capienza massima, entra in gioco la lista d’attesa. Se si libera un posto, l’amministratore può promuovere un partecipante e comunicargli automaticamente la disponibilità.

Sono previsti anche reminder prima del laboratorio e comunicazioni in caso di annullamento.

L’utente vede pochi passaggi.

Dietro quei pochi passaggi, però, esiste un’intera macchina organizzativa.

## Le prove del viaggio: costruire il gestionale amministrativo

La parte pubblica è solo ciò che si vede.

Nel pannello amministrativo ho sviluppato gli strumenti necessari per gestire il ciclo di vita degli eventi:

- creazione e modifica degli eventi;
- configurazione di data, orario, sede, descrizione, immagine, capienza e prezzo;
- pubblicazione e gestione delle attività;
- visualizzazione delle iscrizioni;
- gestione della lista d’attesa;
- inserimento manuale delle prenotazioni;
- registrazione delle presenze;
- annullamento degli eventi;
- esportazione dei dati;
- consultazione di statistiche e indicatori operativi.

Il sito non è quindi soltanto il luogo in cui Digital Heroes viene presentato.

È diventato lo strumento con cui il progetto può essere organizzato.

Questa scelta ci permette di controllare direttamente l’esperienza utente, i flussi amministrativi e l’evoluzione futura della piattaforma, senza dipendere dalle funzionalità decise da un fornitore esterno.

## Gli strumenti: uno stack JavaScript e TypeScript moderno

Per il frontend ho utilizzato **React, TypeScript, Vite e Tailwind CSS**.

La parte backend è stata sviluppata con **Node.js, Express e TypeScript**.

Per il database e l’autenticazione ho scelto **Supabase**, basato su PostgreSQL. Le email transazionali e i reminder vengono gestiti attraverso servizi dedicati e automazioni programmate.

Il sito pubblico e il pannello amministrativo fanno parte della stessa applicazione, ma sono separati attraverso autenticazione, ruoli e controlli sui permessi.

Ho lavorato anche sull’ottimizzazione per i motori di ricerca, inserendo metadati e dati strutturati dedicati agli eventi, così da descrivere in modo più preciso date, luoghi, prezzi e modalità di partecipazione.

La tecnologia, però, è soltanto una parte della storia.

La sfida più importante era proteggere tutto ciò che quella tecnologia avrebbe gestito.

## La prova più difficile: la sicurezza

La difficoltà tecnica principale è stata la sicurezza complessiva della piattaforma.

Quando un sistema gestisce iscrizioni, dati dei genitori e informazioni relative a partecipanti minorenni, una semplice schermata di login non è sufficiente.

Ogni operazione deve essere verificata.

Ogni dato deve essere validato.

Ogni utente deve poter eseguire soltanto le azioni previste dal proprio ruolo.

Per questo ho lavorato su più livelli di protezione:

- autenticazione dell’area amministrativa;
- ruoli e permessi;
- controlli lato client e lato server;
- validazione degli input;
- limitazione delle richieste alle API;
- sistemi anti-bot nei moduli pubblici;
- gestione esplicita dei consensi;
- protezione delle operazioni sensibili.

È un lavoro che spesso rimane invisibile.

Ed è proprio questo il punto: quando la sicurezza funziona, l’utente non dovrebbe accorgersi della sua complessità.

## L’identità dell’eroe: il Neobrutalism

Un progetto dedicato alla creatività e alla tecnologia non poteva avere un’identità visiva anonima.

In accordo con il direttore artistico, abbiamo scelto uno stile ispirato al **Neobrutalism**: colori netti, bordi marcati, ombre evidenti, tipografia decisa e componenti immediatamente riconoscibili.

Non volevamo seguire una tendenza soltanto perché popolare.

Volevamo un linguaggio visivo coerente con l’energia di Digital Heroes: giovane, diretto, accessibile e lontano dall’aspetto troppo istituzionale che spesso accompagna i progetti educativi.

Ho curato personalmente anche questa parte, traducendo l’identità concordata in interfacce, componenti, navigazione e comportamento responsive.

## La trasformazione: ciò che il progetto mi ha insegnato

Sviluppare l’intera piattaforma mi ha confermato una cosa fondamentale:

> La qualità del risultato dipende dalla qualità del contesto da cui parti.

Prima di scrivere codice bisogna comprendere il problema, gli utenti, i flussi, le eccezioni e le conseguenze di ogni scelta.

Un requisito poco chiaro non scompare durante lo sviluppo.

Diventa un problema tecnico.

Ho imparato anche il valore delle verifiche incrociate. Quando qualcosa non torna, anche se sembra un dettaglio minimo, fermarsi e tornare indietro è quasi sempre la decisione migliore.

Ignorare un errore nelle prime fasi significa trascinarlo fino alla fine, quando correggerlo richiederà molto più tempo.

Questo progetto mi ha anche costretto, nel senso migliore del termine, a studiare in profondità gli strumenti che stavo utilizzando. Da questo percorso sono nate nuove competenze e diverse certificazioni.

Non ho semplicemente aggiunto tecnologie a un progetto.

Ho dovuto comprenderle abbastanza da assumermi la responsabilità delle decisioni prese.

## Il ritorno: la piattaforma è pronta, ma la storia non è finita

Digital Heroes è attualmente in fase di test.

Le funzionalità sono state verificate con dati generici, ma la piattaforma non è ancora stata utilizzata con dati reali dei partecipanti.

Il primo vero test operativo è previsto per **ottobre 2026**, con l’inizio della nuova stagione.

Sarà il momento in cui il sistema incontrerà finalmente il contesto per cui è stato costruito.

Potremo verificare la semplicità del percorso di iscrizione, l’affidabilità delle comunicazioni, la gestione dei posti e l’utilizzo quotidiano del pannello amministrativo.

Per questo non considero il progetto concluso.

Il software non termina quando viene pubblicato.

Comincia davvero quando viene utilizzato.

La piattaforma è disponibile su **[digital-heroes.me](https://digital-heroes.me/)**.

Se doveste iscrivere vostro figlio a un laboratorio, quale passaggio vorreste che fosse ancora più semplice?

Suggerimenti, osservazioni e nuove idee sono benvenuti.

---

## Testo consigliato per condividere l’articolo su LinkedIn

Ho sviluppato una piattaforma proprietaria per gestire eventi, iscrizioni e reminder.

Ma il vero lavoro è iniziato quando ho capito che non stavo costruendo un semplice sito web.

Stavo costruendo il sistema operativo di Digital Heroes.

Siamo partiti da WordPress ed Eventbrite. Volevamo eliminare account obbligatori, passaggi superflui, scarsa personalizzazione e dipendenza da una piattaforma esterna.

Ho quindi progettato e sviluppato tutto il sistema: identità visiva Neobrutalist, frontend, backend, database, area amministrativa, automazioni, sicurezza e deployment.

La parte più difficile?

Non una singola funzionalità, ma proteggere correttamente un’applicazione che gestirà iscrizioni e dati relativi a partecipanti minorenni.

Il progetto entrerà nella sua prima vera prova sul campo a ottobre 2026.

Nell’articolo racconto le scelte, gli errori evitati, le verifiche incrociate e la lezione più importante che mi porto dietro:

**La qualità del risultato dipende dalla qualità del contesto da cui parti.**

La piattaforma è già online: [digital-heroes.me](https://digital-heroes.me/)

Se doveste iscrivere vostro figlio a un laboratorio, quale passaggio vorreste che fosse ancora più semplice?
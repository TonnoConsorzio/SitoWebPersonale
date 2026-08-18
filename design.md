# Design — Alessio Bellan

Sistema visivo per il sito personale e commerciale. Il sistema usa una direzione cinematografica editoriale, crema caldo, nero, giallo disciplinato e un Impossible Engine procedurale persistente.

## Genere

Atmospheric editorial con struttura commerciale leggibile.

## Macrostruttura

- Pagine marketing: scorrimento narrativo a scene, con un oggetto procedurale che cambia stato tra caos, lavoro, sistema, processo e risoluzione.
- Portfolio: showcase sticky con lavoro reale, immagini in proiezione e testo breve.
- Contenuti: Long Document, con testo continuo e gerarchie brevi.

## Tema

- Background: `#f2eee5`
- Foreground: `#111113`
- Paper strong: `#e9e3d8`
- Accent: `#fbcf15`
- Border: linee sottili, mai poster o ombre rigide
- Focus: `#111113` con offset visibile

## Tipografia

- Display: Bricolage Grotesque, 600–700.
- Corpo: Instrument Sans, 400–700.
- Testo: 16–18px, interlinea 1.5–1.7, larghezza massima 65ch.

## Spaziatura e movimento

- Sezioni ampie, blocchi brevi, griglia usata solo quando aiuta il confronto.
- Movimento sobrio. WebGL nativo leggero per l’engine, SVG statico se WebGL non è disponibile.
- Scroll scrub controllato solo sulle immagini dei progetti; niente scroll hijacking, bounce o fade-up ripetuti.
- `prefers-reduced-motion`: transizioni e animazioni ridotte a un cambio di opacità.

## Voce CTA

- Primaria: “Raccontami il progetto” o una variante concreta legata al contesto.
- Secondaria: “Vedi i lavori”.
- Niente promesse generiche, metriche inventate o prezzi barrati.

## Regole condivise

- Conservare logo, palette, font e comportamento narrativo dell’Impossible Engine.
- Usare dati verificabili e indicare i punti da confermare nel copy.
- Dare priorità a Sito Essenziale, Automation Sprint e Pilot Web White Label.
- Focus tastiera sempre visibile, target interattivi di almeno 44px, contrasto WCAG 2.2 AA.

/* Hallmark · genre: atmospheric-editorial · macrostructure: Feature Stack · design-system: design.md · designed-as-app */

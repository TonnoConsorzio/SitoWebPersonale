import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const domain = 'https://alessiobellan.it';
const defaultImage = `${domain}/media/brand/foto-profilo.JPG`;
const services = JSON.parse(fs.readFileSync(path.join(root, 'src/data/servicesData.json'), 'utf8'));
const projects = JSON.parse(fs.readFileSync(path.join(root, 'src/data/portfolio.json'), 'utf8'));
const articleDirectory = path.join(root, 'src/content/articles');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const localized = (value) => typeof value === 'string' ? value : value?.it || '';
const publicPath = (value = '') => String(value).replace(/^\.\//, '/');
const absoluteUrl = (value = '/') => `${domain}${publicPath(value)}`;

function readArticle(file) {
  const raw = fs.readFileSync(path.join(articleDirectory, file), 'utf8');
  const metadata = Object.fromEntries([...raw.matchAll(/^([\w-]+):\s*(.+)$/gm)].map(([, key, value]) => [key, value.trim()]));
  return { slug: file.replace(/\.md$/, ''), ...metadata };
}

function render({ route, title, description, content = '', type = 'website', image = defaultImage, imageAlt = 'Alessio Bellan', schema, noIndex = false, redirectTo }) {
  const canonical = `${domain}${redirectTo || route}`;
  const metadata = [
    `<title>${escapeHtml(title)} | Alessio Bellan</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:title" content="${escapeHtml(title)} | Alessio Bellan">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:image" content="${image}">`,
    noIndex ? '<meta name="robots" content="noindex,follow">' : '',
    redirectTo ? `<meta http-equiv="refresh" content="0; url=${redirectTo}">` : '',
    schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : '',
  ].filter(Boolean).join('\n    ');
  const fallback = `<main class="seo-fallback"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${content}</main>`;
  const shell = template
    .replace(/\s*<meta name="description"[^>]*>/g, '')
    .replace(/<title>[\s\S]*?<\/title>/, '');
  const html = shell
    .replace('</head>', `    ${metadata}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
  const target = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

const pageSchema = (route, title, description) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url: `${domain}${route}`,
  isPartOf: { '@id': `${domain}/#website` },
  about: { '@id': `${domain}/#alessio-bellan` },
});

const schemaForPage = (page) => {
  let primary;
  if (page.kind === 'service') primary = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.description,
    url: `${domain}${page.route}`,
    provider: { '@id': `${domain}/#alessio-bellan` },
    areaServed: ['Provincia di Monza e Brianza', 'Provincia di Milano', 'Provincia di Lecco', 'Provincia di Bergamo'].map((name) => ({ '@type': 'AdministrativeArea', name })),
  };
  else if (page.kind === 'project') primary = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: page.title,
    description: page.description,
    url: `${domain}${page.route}`,
    image: page.image,
    creator: { '@id': `${domain}/#alessio-bellan` },
  };
  else if (page.kind === 'article') primary = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.title,
    description: page.description,
    datePublished: page.date,
    mainEntityOfPage: `${domain}${page.route}`,
    author: { '@id': `${domain}/#alessio-bellan`, name: page.author || 'Alessio Bellan' },
  };
  else primary = pageSchema(page.route, page.title, page.description);
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${domain}/#alessio-bellan`,
    name: 'Alessio Bellan',
    url: `${domain}/chi-sono`,
    jobTitle: 'Sviluppatore web freelance',
    email: 'email@alessiobellan.it',
    sameAs: ['https://www.linkedin.com/in/alessio-bellan', 'https://www.instagram.com/alessio.bellan'],
  };
  return [primary, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: domain },
      { '@type': 'ListItem', position: 2, name: page.route.startsWith('/journal') ? 'Journal' : page.route.startsWith('/progetti') ? 'Progetti' : page.route.startsWith('/servizi') ? 'Servizi' : page.title, item: `${domain}${page.route.startsWith('/journal') ? '/journal' : page.route.startsWith('/progetti') ? '/progetti' : page.route.startsWith('/servizi') ? '/servizi' : page.route}` },
      ...(page.route === '/' ? [] : [{ '@type': 'ListItem', position: 3, name: page.title, item: `${domain}${page.route}` }]),
    ],
  }, ...(page.route === '/' || page.route === '/chi-sono' ? [person] : [])];
};

const pages = [
  { route: '/', title: 'Idee fuori di testa. Soluzioni con i piedi per terra.', description: 'Siti web e strumenti digitali per PMI, professionisti e associazioni in Lombardia.', content: '<p>Siti web, gestionali, grafica, social media e infrastrutture.</p><p><a href="/servizi">Scopri i servizi</a> · <a href="/progetti">Vedi i progetti</a></p>' },
  { route: '/chi-sono', title: 'Chi sono', description: 'Esperienze, formazione e certificazioni di Alessio Bellan.', content: '<p>Sviluppatore web, coordinatore di progetti digitali e presidente di ABBO APS.</p><p><a href="/servizi">Scopri i servizi</a></p>' },
  { route: '/servizi', title: 'Servizi digitali', description: 'Siti web, gestionali, automazioni, identità visiva, social media, formazione e infrastrutture.', content: `<ul>${services.overview.grid.map((item) => `<li><a href="${escapeHtml(item.path)}">${escapeHtml(item.title)}</a><p>${escapeHtml(item.desc || item.shortPhrase || '')}</p></li>`).join('')}</ul>` },
  { route: '/progetti', title: 'Progetti', description: 'Progetti digitali di Alessio Bellan raccontati attraverso lavoro, vincoli e materiali pubblicati.', content: `<ul>${projects.map((project) => `<li><a href="/progetti/${escapeHtml(project.slug)}">${escapeHtml(localized(project.title))}</a><p>${escapeHtml(localized(project.description))}</p></li>`).join('')}</ul>` },
  { route: '/agenzie', title: 'Collaborazioni con agenzie', description: 'Supporto operativo su progetti digitali.', content: '<p>Supporto operativo per sviluppo web, coordinamento e consegna di progetti digitali.</p>' },
  { route: '/journal', title: 'Journal', description: 'Appunti di progetto, scelte tecniche e lavoro sul campo.', content: '<p><a href="/progetti">Collega gli appunti ai progetti pubblicati.</a></p>' },
];

for (const service of services.overview.grid) {
  pages.push({ kind: 'service', route: service.path, title: service.title, description: service.desc || service.shortPhrase || '', content: `<p>${escapeHtml(service.shortPhrase || service.desc || '')}</p><p><a href="/servizi">Tutti i servizi</a> · <a href="/progetti">Progetti collegati</a></p>` });
}

for (const project of projects) {
  const route = `/progetti/${project.slug}`;
  pages.push({ kind: 'project', route, title: localized(project.title), description: localized(project.description), image: absoluteUrl(project.image), imageAlt: project.imageAlt, content: `<img src="${publicPath(project.image)}" width="${project.imageWidth}" height="${project.imageHeight}" alt="${escapeHtml(project.imageAlt)}"><p>${escapeHtml(localized(project.description))}</p><p><a href="/progetti">Tutti i progetti</a>${project.service ? ` · <a href="/servizi/${escapeHtml(project.service)}">Servizio collegato</a>` : ''}</p>` });
}

for (const file of fs.readdirSync(articleDirectory).filter((file) => file.endsWith('.md') && !file.startsWith('_'))) {
  const article = readArticle(file);
  pages.push({ kind: 'article', route: `/journal/${article.slug}`, title: article.title, description: article.excerpt, type: 'article', date: article.date, author: article.author, content: `<p>Pubblicato il ${escapeHtml(article.date || '')}. <a href="/journal">Torna al Journal</a> · <a href="/progetti">Vedi i progetti</a></p>` });
}

pages.forEach((page) => render({ ...page, schema: schemaForPage(page) }));

const legacyTargets = {
  '/curriculum': '/chi-sono',
  '/portfolio': '/progetti',
  '/portfolio/1': '/progetti/la-voce-del-fumagalli',
  '/portfolio/2': '/progetti/digital-heroes',
  '/portfolio/3': '/progetti/abbo-aps',
  '/servizi/automation': '/servizi/automazioni',
  '/servizi/gestionali': '/servizi/gestionali-web-app',
  '/servizi/grafica': '/servizi/grafica-identita',
  '/servizi/infra': '/servizi/infrastrutture',
  '/servizi/social': '/servizi/social-media',
};
const provinces = ['monza-brianza', 'milano', 'lecco', 'bergamo'];
const oldServices = { 'siti-web': 'siti-web', gestionali: 'gestionali-web-app', grafica: 'grafica-identita', 'social-media': 'social-media', infrastrutture: 'infrastrutture' };
for (const [oldService, target] of Object.entries(oldServices)) for (const province of provinces) legacyTargets[`/servizi/${oldService}-${province}`] = `/servizi/${target}`;
for (const [route, target] of Object.entries(legacyTargets)) render({ route, title: 'Pagina spostata', description: 'Questa pagina è stata spostata.', noIndex: true, redirectTo: target, content: `<p><a href="${target}">Vai alla pagina aggiornata</a></p>`, schema: pageSchema(target, 'Pagina spostata', 'Questa pagina è stata spostata.') });

console.log(`Generated static fallbacks for ${pages.length} public routes and ${Object.keys(legacyTargets).length} legacy URLs.`);

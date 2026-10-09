import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const domain = 'https://alessiobellan.it';
const services = JSON.parse(fs.readFileSync(path.join(root, 'src/data/servicesData.json'), 'utf8'));
const projects = JSON.parse(fs.readFileSync(path.join(root, 'src/data/portfolio.json'), 'utf8'));
const articleDirectory = path.join(root, 'src/content/articles');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const escapeHtml = (value = '') => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const localized = (value) => typeof value === 'string' ? value : value?.it || '';

function readArticle(file) {
  const raw = fs.readFileSync(path.join(articleDirectory, file), 'utf8');
  const metadata = Object.fromEntries([...raw.matchAll(/^([\w-]+):\s*(.+)$/gm)].map(([, key, value]) => [key, value.trim()]));
  return { slug: file.replace(/\.md$/, ''), ...metadata };
}

function render({ route, title, description, content, type = 'website', noIndex = false, redirectTo }) {
  const canonical = `${domain}${redirectTo || route}`;
  const metadata = [
    `<title>${escapeHtml(title)} | Alessio Bellan</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:title" content="${escapeHtml(title)} | Alessio Bellan">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    noIndex ? '<meta name="robots" content="noindex,follow">' : '',
    redirectTo ? `<meta http-equiv="refresh" content="0; url=${redirectTo}">` : '',
  ].filter(Boolean).join('\n    ');
  const fallback = `<main class="seo-fallback"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${content || ''}</main>`;
  const html = template.replace(/\s*<meta name="description"[^>]*\/>/, '').replace(/<title>[\s\S]*?<\/title>/, metadata).replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
  const target = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

const pages = [
  { route: '/', title: 'Alessio Bellan', description: 'Siti web e strumenti digitali per PMI, professionisti e associazioni in Lombardia.', content: '<p>Siti web, gestionali, grafica, social media e infrastrutture.</p>' },
  { route: '/chi-sono', title: 'Chi sono', description: 'Esperienze, formazione e certificazioni di Alessio Bellan.', content: '<p>Sviluppatore web, coordinatore di progetti digitali e presidente di ABBO APS.</p>' },
  { route: '/servizi', title: 'Servizi digitali', description: 'Siti web, gestionali, automazioni, identità visiva, social media, formazione e infrastrutture.', content: `<ul>${services.overview.grid.map((item) => `<li><a href="${item.path}">${escapeHtml(item.title)}</a></li>`).join('')}</ul>` },
  { route: '/portfolio', title: 'Portfolio', description: 'Progetti digitali di Alessio Bellan.', content: `<ul>${projects.map((project) => `<li><a href="/portfolio/${project.id}">${escapeHtml(localized(project.title))}</a></li>`).join('')}</ul>` },
  { route: '/agenzie', title: 'Collaborazioni con agenzie', description: 'Supporto operativo su progetti digitali.', content: '' },
  { route: '/journal', title: 'Journal', description: 'Appunti di progetto, scelte tecniche e lavoro sul campo.', content: '' },
];

for (const service of services.overview.grid) pages.push({ route: service.path, title: service.title, description: service.desc, content: `<p>${escapeHtml(service.shortPhrase || '')}</p><p><a href="/servizi">Tutti i servizi</a></p>` });
for (const project of projects) pages.push({ route: `/portfolio/${project.id}`, title: localized(project.title), description: localized(project.description), content: '<p><a href="/portfolio">Torna al portfolio</a></p>' });
for (const file of fs.readdirSync(articleDirectory).filter((file) => file.endsWith('.md') && !file.startsWith('_'))) {
  const article = readArticle(file);
  pages.push({ route: `/journal/${article.slug}`, title: article.title, description: article.excerpt, type: 'article', content: `<p>Pubblicato il ${escapeHtml(article.date || '')}. <a href="/journal">Torna al Journal</a></p>` });
}
pages.forEach(render);

const legacyTargets = {
  '/curriculum': '/chi-sono',
  '/servizi/automation': '/servizi/automazioni',
  '/servizi/gestionali': '/servizi/gestionali-web-app',
  '/servizi/grafica': '/servizi/grafica-identita',
  '/servizi/infra': '/servizi/infrastrutture',
  '/servizi/social': '/servizi/social-media',
};
const provinces = ['monza-brianza', 'milano', 'lecco', 'bergamo'];
const oldServices = { 'siti-web': 'siti-web', gestionali: 'gestionali-web-app', grafica: 'grafica-identita', 'social-media': 'social-media', infrastrutture: 'infrastrutture' };
for (const [oldService, target] of Object.entries(oldServices)) for (const province of provinces) legacyTargets[`/servizi/${oldService}-${province}`] = `/servizi/${target}`;
for (const [route, target] of Object.entries(legacyTargets)) render({ route, title: 'Pagina spostata', description: 'Questa pagina è stata spostata.', noIndex: true, redirectTo: target, content: `<p><a href="${target}">Vai alla pagina aggiornata</a></p>` });

console.log(`Generated static fallbacks for ${pages.length} public routes and ${Object.keys(legacyTargets).length} legacy URLs.`);

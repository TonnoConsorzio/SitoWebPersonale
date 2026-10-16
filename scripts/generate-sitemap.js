import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const domain = 'https://alessiobellan.it';
const services = JSON.parse(fs.readFileSync(path.join(root, 'src/data/servicesData.json'), 'utf8'));
const projects = JSON.parse(fs.readFileSync(path.join(root, 'src/data/portfolio.json'), 'utf8'));
const articleDirectory = path.join(root, 'src/content/articles');

const articleSlugs = fs.readdirSync(articleDirectory)
  .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
  .map((file) => file.replace(/\.md$/, ''));

const routes = [
  { route: '/', priority: '1.0' },
  { route: '/chi-sono', priority: '0.8' },
  { route: '/servizi', priority: '0.9' },
  ...services.overview.grid.map((service) => ({ route: service.path, priority: '0.8' })),
  { route: '/progetti', priority: '0.9' },
  ...projects.map((project) => ({
    route: `/progetti/${project.slug}`,
    priority: '0.8',
    image: `${domain}${String(project.image).replace(/^\.\//, '/')}`,
    imageTitle: typeof project.title === 'string' ? project.title : project.title.it,
  })),
  { route: '/agenzie', priority: '0.6' },
  { route: '/journal', priority: '0.7' },
  ...articleSlugs.map((slug) => ({ route: `/journal/${slug}`, priority: '0.6' })),
];

const escapeXml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...routes.map(({ route, priority, image, imageTitle }) => [
    '  <url>',
    `    <loc>${escapeXml(domain + route)}</loc>`,
    `    <changefreq>${route.startsWith('/journal') ? 'monthly' : 'yearly'}</changefreq>`,
    `    <priority>${priority}</priority>`,
    image ? `    <image:image><image:loc>${escapeXml(image)}</image:loc><image:title>${escapeXml(imageTitle)}</image:title></image:image>` : '',
    '  </url>',
  ].filter(Boolean).join('\n')),
  '</urlset>',
  '',
].join('\n');

const robots = `User-agent: *
Allow: /

# Search and user-requested retrieval: allowed.
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

# Training crawlers: not allowed.
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

Sitemap: ${domain}/sitemap.xml
`;

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap);
fs.writeFileSync(path.join(root, 'public/robots.txt'), robots);
console.log(`Generated sitemap for ${routes.length} canonical URLs.`);

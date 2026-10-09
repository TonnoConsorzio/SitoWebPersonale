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
  '/',
  '/chi-sono',
  '/servizi',
  ...services.overview.grid.map((service) => service.path),
  '/portfolio',
  ...projects.map((project) => `/portfolio/${project.id}`),
  '/agenzie',
  '/journal',
  ...articleSlugs.map((slug) => `/journal/${slug}`),
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${domain}${route}</loc></url>`),
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

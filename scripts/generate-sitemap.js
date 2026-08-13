import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import data
const landingPagesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/landingPages.json'), 'utf8'));
const geoLandingPagesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/geoLandingPages.json'), 'utf8'));

const domain = 'https://alessiobellan.it';
const today = new Date().toISOString().split('T')[0];

let urls = [];

// Static pages
urls.push({ loc: `${domain}/`, priority: '1.0', changefreq: 'weekly' });
urls.push({ loc: `${domain}/curriculum`, priority: '0.5', changefreq: 'monthly' });
urls.push({ loc: `${domain}/portfolio`, priority: '0.5', changefreq: 'monthly' });
urls.push({ loc: `${domain}/prezzi`, priority: '0.5', changefreq: 'monthly' });
urls.push({ loc: `${domain}/agenzie`, priority: '0.7', changefreq: 'monthly' });

// Hub service pages
Object.keys(landingPagesData).forEach(id => {
  urls.push({ loc: `${domain}/servizi/${id}`, priority: '0.8', changefreq: 'monthly' });
});

// Geo service pages
Object.keys(geoLandingPagesData).forEach(slug => {
  urls.push({ loc: `${domain}/servizi/${slug}`, priority: '0.6', changefreq: 'monthly' });
});

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

urls.forEach(url => {
  xml += `  <url>\n`;
  xml += `    <loc>${url.loc}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
  xml += `    <priority>${url.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

// Write sitemap to public folder
fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), xml);

// Write robots.txt
const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${domain}/sitemap.xml
`;

fs.writeFileSync(path.resolve(__dirname, '../public/robots.txt'), robotsTxt);

console.log('Sitemap and robots.txt generated successfully in public directory.');

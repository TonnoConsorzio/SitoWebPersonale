import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const key = process.env.INDEXNOW_KEY;

if (!key) {
  console.error('INDEXNOW_KEY non configurata. Crea una chiave reale e aggiungila alle variabili d’ambiente prima dell’invio.');
  process.exit(1);
}

const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url);
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'alessiobellan.it', key, keyLocation: `https://alessiobellan.it/${key}.txt`, urlList }),
});

if (!response.ok) throw new Error(`IndexNow: ${response.status} ${await response.text()}`);
console.log(`IndexNow inviato per ${urlList.length} URL.`);

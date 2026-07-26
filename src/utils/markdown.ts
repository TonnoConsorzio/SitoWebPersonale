export interface ArticleMetadata {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  [key: string]: any;
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  content: string;
}

export function parseFrontmatter(markdown: string) {
  // Support both Unix (\n) and Windows (\r\n) line endings
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  
  if (!match) {
    return {
      metadata: { title: "Senza Titolo", date: new Date().toISOString().split('T')[0], excerpt: "" } as ArticleMetadata,
      content: markdown
    };
  }

  const frontmatter = match[1];
  const content = match[2].trim();
  const metadata: any = {};

  frontmatter.split(/\r?\n/).forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      
      if (key === 'tags') {
        metadata[key] = value.split(',').map(tag => tag.trim());
      } else {
        metadata[key] = value;
      }
    }
  });

  // Ensure title and date exist
  if (!metadata.title) metadata.title = "Senza Titolo";
  if (!metadata.date) metadata.date = new Date().toISOString().split('T')[0];
  if (!metadata.excerpt) metadata.excerpt = "";

  return { metadata: metadata as ArticleMetadata, content };
}

export async function getAllArticles(): Promise<Article[]> {
  // Vite's import.meta.glob to read all markdown files in the folder
  const files = import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default' });
  
  const articles: Article[] = [];

  for (const path in files) {
    // Skip template or files starting with _
    const filename = path.split('/').pop() || '';
    if (filename.startsWith('_')) continue;
    
    const slug = filename.replace(/\.md$/, '');
    const markdown = await files[path]() as string;
    
    const { metadata, content } = parseFrontmatter(markdown);
    
    articles.push({ slug, metadata, content });
  }

  // Sort by date (descending)
  return articles.sort((a, b) => {
    const timeA = new Date(a.metadata.date).getTime();
    const timeB = new Date(b.metadata.date).getTime();
    const valA = isNaN(timeA) ? 0 : timeA;
    const valB = isNaN(timeB) ? 0 : timeB;
    return valB - valA;
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

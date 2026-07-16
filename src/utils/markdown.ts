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
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!match) {
    return {
      metadata: { title: "Senza Titolo", date: "", excerpt: "" } as ArticleMetadata,
      content: markdown
    };
  }

  const frontmatter = match[1];
  const content = match[2].trim();
  const metadata: any = {};

  frontmatter.split('\n').forEach(line => {
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
  return articles.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

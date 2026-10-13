import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'src/content/blog')

export interface Post {
  slug: string
  title: string
  seoTitle?: string
  excerpt: string
  date: string
  updated?: string
  publishAt?: string
  readTime: number
  tag: string
  category?: string
  keywords?: string[]
  content?: string
  faq?: { q: string; a: string }[]
}

const MD_INLINE = /\[([^\]]+)\]\([^)]+\)|[*_]{1,2}([^*_]+)[*_]{1,2}/g

function stripMarkdown(s: string): string {
  return s.replace(MD_INLINE, (_m, link, em) => link ?? em ?? '').trim()
}

/** Extrait les paires Q/R du bloc "## Questions fréquentes" (ou FAQ) d'un article, pour le schema FAQPage. */
export function extractFaq(markdown: string): { q: string; a: string }[] {
  const section = markdown.match(/##\s*(?:Questions fréquentes|FAQ|Questions récurrentes)[^\n]*\n([\s\S]*?)(?:\n##\s|\n---\s*\n|$)/i)
  if (!section) return []
  const pairs: { q: string; a: string }[] = []
  const re = /\*\*(.+?\?)\*\*[ \t]*\n((?:(?!\*\*)[^\n]+\n?)+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(section[1]))) {
    const q = stripMarkdown(m[1])
    const a = stripMarkdown(m[2].replace(/\n/g, ' '))
    if (q && a) pairs.push({ q, a })
  }
  return pairs
}

function normalizePost(slug: string, data: Record<string, unknown>): Post {
  const excerpt = (data.excerpt as string) || (data.description as string) || ''
  return { slug, ...(data as Omit<Post, 'slug' | 'excerpt'>), excerpt }
}

/** Un article programmé (publishAt dans le futur) est invisible : listes, pages, sitemap, RSS. */
export function isPublished(post: Pick<Post, 'publishAt'>): boolean {
  if (!post.publishAt) return true
  return new Date(post.publishAt).getTime() <= Date.now()
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDir)
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const slug = f.replace('.md', '')
      const raw = fs.readFileSync(path.join(postsDir, f), 'utf8')
      const { data } = matter(raw)
      return normalizePost(slug, data as Record<string, unknown>)
    })
    .filter(isPublished)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const pre = normalizePost(slug, data as Record<string, unknown>)
  if (!isPublished(pre)) return null
  const processed = await remark().use(html).process(content)
  return { ...pre, content: processed.toString(), faq: extractFaq(content) }
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'src/content/blog')

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  updated?: string
  readTime: number
  tag: string
  category?: string
  keywords?: string[]
  content?: string
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDir)
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const slug = f.replace('.md', '')
      const raw = fs.readFileSync(path.join(postsDir, f), 'utf8')
      const { data } = matter(raw)
      return { slug, ...(data as Omit<Post, 'slug'>) }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return { slug, ...(data as Omit<Post, 'slug' | 'content'>), content: processed.toString() }
}

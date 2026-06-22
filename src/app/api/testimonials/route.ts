import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'

const FILE = path.join(process.cwd(), 'public', 'testimonials.json')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, company, projectType, rating, text } = body

    if (!name || !rating || !text) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    let existing: unknown[] = []
    try {
      const raw = await readFile(FILE, 'utf-8')
      existing = JSON.parse(raw)
    } catch {
      existing = []
    }

    existing.push({
      id: Date.now(),
      name,
      company: company || '',
      projectType: projectType || '',
      rating,
      text,
      approved: false,
      date: new Date().toISOString(),
    })

    await writeFile(FILE, JSON.stringify(existing, null, 2))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

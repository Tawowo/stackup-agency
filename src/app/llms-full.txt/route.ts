import { llmsFull } from '@/lib/llms'

export const revalidate = 43200
export const GET = () => new Response(llmsFull(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

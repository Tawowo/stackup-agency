import { llmsTxt } from '@/lib/llms'

export const revalidate = 43200
export const GET = () => new Response(llmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

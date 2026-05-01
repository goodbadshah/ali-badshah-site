import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[chat API] ANTHROPIC_API_KEY is not set')
    return new Response('Server misconfigured', { status: 500 })
  }

  const { messages, userMessage } = (await request.json()) as {
    messages: ChatMessage[]
    userMessage: string
  }

  let systemPrompt: string
  try {
    systemPrompt = fs.readFileSync(
      path.join(process.cwd(), 'ai-context.md'),
      'utf-8'
    )
  } catch (err) {
    console.error('[chat API] failed to read ai-context.md:', err)
    return new Response('Context file unavailable', { status: 500 })
  }

  const stream = anthropic.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [...messages, { role: 'user', content: userMessage }],
  })

  const readableStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text))
          }
        }
      } catch (err) {
        console.error('[chat API] stream error:', err)
        controller.error(err)
        return
      }
      controller.close()
    },
  })

  return new Response(readableStream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

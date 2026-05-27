'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'

type Role = 'user' | 'assistant'
type Message = { role: Role; content: string }

const INTENTS: { label: string; message: string }[] = [
  { label: 'Hiring manager?', message: "I'm a hiring manager evaluating Ali for a role." },
  { label: 'Founder?', message: "I'm a founder looking for strategic help." },
  { label: 'Producer or casting director?', message: "I'm a producer or casting director looking for talent." },
  { label: 'Need coaching?', message: "I'm looking for coaching." },
]

const LONG_INPUT_THRESHOLD = 1500
const TEXTAREA_MAX_HEIGHT = 240
const SCROLL_STICKY_THRESHOLD = 40
const JUMP_PILL_THRESHOLD = 80

export default function HeroChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [showJumpPill, setShowJumpPill] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const stickyRef = useRef(true)
  const bufferRef = useRef('')
  const rafRef = useRef<number | null>(null)
  const reduceMotionRef = useRef(false)

  const hasConversation = messages.length > 0
  const isBusy = isPending || isStreaming
  const lineCount = useMemo(() => input.split('\n').length, [input])
  const isLongInput = input.length > LONG_INPUT_THRESHOLD

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotionRef.current = mq.matches
    const onChange = () => {
      reduceMotionRef.current = mq.matches
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`
  }, [input])

  useEffect(() => {
    if (!threadRef.current || !stickyRef.current) return
    threadRef.current.scrollTop = threadRef.current.scrollHeight
  }, [messages])

  const handleThreadScroll = () => {
    const el = threadRef.current
    if (!el) return
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight
    stickyRef.current = distance < SCROLL_STICKY_THRESHOLD
    setShowJumpPill(distance > JUMP_PILL_THRESHOLD && isStreaming)
  }

  const jumpToLatest = () => {
    const el = threadRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
    stickyRef.current = true
    setShowJumpPill(false)
  }

  const appendToLastAssistant = (chunk: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1]
      if (!last || last.role !== 'assistant') return prev
      return [...prev.slice(0, -1), { ...last, content: last.content + chunk }]
    })
  }

  // Drain the network buffer at a rate proportional to its size so the rendered
  // text reads as steady typing regardless of how the bytes arrive over the wire.
  const drainBuffer = () => {
    const len = bufferRef.current.length
    if (len === 0) {
      rafRef.current = null
      return
    }
    const drainCount = Math.max(2, Math.min(len, Math.ceil(len / 8)))
    const next = bufferRef.current.slice(0, drainCount)
    bufferRef.current = bufferRef.current.slice(drainCount)
    appendToLastAssistant(next)
    rafRef.current = requestAnimationFrame(drainBuffer)
  }

  const ensureDrainRunning = () => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(drainBuffer)
    }
  }

  const flushBufferImmediately = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (bufferRef.current.length > 0) {
      appendToLastAssistant(bufferRef.current)
      bufferRef.current = ''
    }
  }

  const sendMessage = async (text: string) => {
    const userMessage = text.trim()
    if (!userMessage || isBusy) return

    const updatedMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(updatedMessages)
    setInput('')
    setIsPending(true)
    stickyRef.current = true

    abortRef.current = new AbortController()

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, userMessage }),
        signal: abortRef.current.signal,
      })

      if (!response.ok || !response.body) throw new Error('API error')

      setMessages([...updatedMessages, { role: 'assistant', content: '' }])
      setIsPending(false)
      setIsStreaming(true)

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        if (reduceMotionRef.current) {
          appendToLastAssistant(chunk)
        } else {
          bufferRef.current += chunk
          ensureDrainRunning()
        }
      }

      await new Promise<void>((resolve) => {
        const tick = () => {
          if (bufferRef.current.length === 0) resolve()
          else requestAnimationFrame(tick)
        }
        tick()
      })
    } catch (err) {
      const aborted = (err as Error).name === 'AbortError'
      if (!aborted) {
        flushBufferImmediately()
        setMessages((prev) => {
          const trimmed = prev.filter(
            (m, idx) => !(idx === prev.length - 1 && m.role === 'assistant' && m.content === '')
          )
          return [
            ...trimmed,
            {
              role: 'assistant',
              content: 'Something went wrong. Try again or reach Ali directly at ali@fulstakt.com.',
            },
          ]
        })
      }
    } finally {
      setIsStreaming(false)
      setIsPending(false)
      setShowJumpPill(false)
      abortRef.current = null
    }
  }

  const stopGeneration = () => {
    abortRef.current?.abort()
    flushBufferImmediately()
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const lastMessage = messages[messages.length - 1]
  const showLoadingDots =
    isPending ||
    (isStreaming && (!lastMessage || lastMessage.role === 'user' || lastMessage.content === ''))

  const canSubmit = input.trim().length > 0 && !isBusy
  const showFauxCaret = !input && !isFocused && !isBusy

  return (
    <div className="relative w-full px-5 pt-4 pb-4 rounded-3xl border border-white/15 bg-[#1a0707] transition-shadow duration-150 focus-within:ring-1 focus-within:ring-white/40 focus-within:border-white/30">
      {hasConversation && (
        <div className="relative mb-3">
          <div
            ref={threadRef}
            onScroll={handleThreadScroll}
            role="log"
            aria-busy={isBusy}
            aria-live="polite"
            className="max-h-80 md:max-h-[480px] lg:max-h-[60vh] overflow-y-auto pr-1 space-y-4"
          >
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[85%] text-sm md:text-base text-white bg-white/15 border border-white/20 px-3.5 py-2 rounded-2xl whitespace-pre-wrap break-words'
                      : 'max-w-[62ch] text-base font-medium text-white whitespace-pre-wrap break-words leading-6'
                  }
                >
                  {m.content}
                  {m.role === 'assistant' &&
                    isStreaming &&
                    i === messages.length - 1 &&
                    m.content !== '' && (
                      <span
                        className="inline-block w-px h-4 bg-white/70 ml-px align-middle"
                        style={{ animation: 'cursor-blink 1s step-end infinite' }}
                      />
                    )}
                </div>
              </div>
            ))}
            {showLoadingDots && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 px-1 py-2" aria-label="Assistant is typing">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
          {showJumpPill && (
            <button
              type="button"
              onClick={jumpToLatest}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-white text-black hover:bg-white/90 transition shadow-lg"
            >
              ↓ Jump to latest
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {isLongInput && (
          <div className="flex items-center gap-2 self-start px-2.5 py-1 rounded-full border border-white/20 bg-white/5 text-white/70 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            Long content attached · {lineCount.toLocaleString()} {lineCount === 1 ? 'line' : 'lines'} · {input.length.toLocaleString()} chars
          </div>
        )}

        <div className="flex items-end gap-2">
          <div className="relative flex-1 min-w-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              disabled={isBusy && !isStreaming}
              rows={1}
              placeholder={showFauxCaret ? '' : 'Ask how Ali is right for you...'}
              className="block w-full bg-transparent text-white placeholder:text-white/50 text-base font-medium resize-none outline-none disabled:opacity-60 leading-6"
              style={{ maxHeight: TEXTAREA_MAX_HEIGHT }}
            />
            {showFauxCaret && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-start text-base font-medium leading-6 text-white/50"
              >
                <span
                  className="inline-block w-px h-5 bg-white/70 mr-1"
                  style={{ animation: 'cursor-blink 1.06s step-end infinite' }}
                />
                <span className="truncate">Ask how Ali is right for you...</span>
              </div>
            )}
          </div>
          {isBusy ? (
            <button
              type="button"
              onClick={stopGeneration}
              aria-label="Stop generating"
              title="Stop"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-white text-black hover:bg-white/90 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <rect width="10" height="10" rx="1.5" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSubmit}
              onClick={(e) => {
                if (!canSubmit) return
                e.preventDefault()
                sendMessage(input)
              }}
              aria-label="Send message"
              title="Send · Enter"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              className={
                canSubmit
                  ? 'shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-white text-black hover:bg-white/90 transition-colors active:bg-white/80'
                  : 'shrink-0 w-11 h-11 rounded-full flex items-center justify-center border border-white/15 bg-white/5 text-white/40 cursor-not-allowed transition-colors'
              }
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 12V2M7 2L2.5 6.5M7 2l4.5 4.5" />
              </svg>
            </button>
          )}
        </div>

        {!hasConversation && (
          <div className="flex flex-wrap gap-2">
            {INTENTS.map((intent) => (
              <button
                key={intent.label}
                type="button"
                onClick={() => sendMessage(intent.message)}
                disabled={isBusy}
                className="px-3.5 py-1.5 rounded-lg border border-white/15 bg-white/5 text-white/70 text-xs font-semibold whitespace-nowrap hover:bg-white/10 hover:text-white transition-colors duration-150 disabled:opacity-40"
              >
                {intent.label}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}

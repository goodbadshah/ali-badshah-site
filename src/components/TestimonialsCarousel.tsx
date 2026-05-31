'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'

type Testimonial = {
  quote: string
  name: string
  role: string
}

// TODO: Ali to replace placeholders with real testimonials gathered offline.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: '[Placeholder] One- to three-sentence quote about working with Ali. Concrete and specific about the outcome.',
    name: '[Name]',
    role: '[Title, Company]',
  },
  {
    quote: '[Placeholder] One- to three-sentence quote. The strongest testimonials name a before-and-after, not an adjective.',
    name: '[Name]',
    role: '[Title, Company]',
  },
  {
    quote: '[Placeholder] One- to three-sentence quote. Skip "amazing to work with." Lead with the result.',
    name: '[Name]',
    role: '[Title, Company]',
  },
]

export default function TestimonialsCarousel() {
  const reduced = useReducedMotion() ?? false
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const total = TESTIMONIALS.length
  const current = TESTIMONIALS[index]

  const goTo = (next: number) => {
    const wrapped = (next + total) % total
    setDirection(wrapped > index ? 1 : -1)
    setIndex(wrapped)
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') goTo(index + 1)
    if (e.key === 'ArrowLeft') goTo(index - 1)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKey}
      className="relative outline-none focus-visible:ring-1 focus-visible:ring-[var(--red-hero)] rounded-3xl"
    >
      <div className="relative min-h-[260px] md:min-h-[300px] overflow-hidden">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.figure
            key={index}
            custom={direction}
            initial={reduced ? false : { opacity: 0, x: direction * 24 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="px-2 md:px-12"
          >
            <blockquote
              className="heading-display-sm max-w-3xl mx-auto text-center"
              style={{ color: 'var(--ink)' }}
            >
              <span aria-hidden="true" className="select-none" style={{ opacity: 0.35 }}>
                &ldquo;
              </span>
              {current.quote}
              <span aria-hidden="true" className="select-none" style={{ opacity: 0.35 }}>
                &rdquo;
              </span>
            </blockquote>
            <figcaption className="mt-8 text-center">
              <div
                className="eyebrow"
                style={{ color: 'var(--ink)', opacity: 0.95 }}
              >
                {current.name}
              </div>
              <div
                className="eyebrow mt-2"
                style={{ color: 'var(--ink)', opacity: 0.55 }}
              >
                {current.role}
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            border: '1px solid rgba(20, 17, 15, 0.18)',
            color: 'var(--ink)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--ink)'
            e.currentTarget.style.color = 'var(--bone)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--ink)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1} of ${total}`}
              onClick={() => goTo(i)}
              className="rounded-full transition-all"
              style={{
                width: i === index ? '24px' : '8px',
                height: '8px',
                background:
                  i === index ? 'var(--ink)' : 'rgba(20, 17, 15, 0.25)',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            border: '1px solid rgba(20, 17, 15, 0.18)',
            color: 'var(--ink)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--ink)'
            e.currentTarget.style.color = 'var(--bone)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--ink)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

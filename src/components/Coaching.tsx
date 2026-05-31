'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useMagnetic } from '@/lib/useMagnetic'

type Track = {
  id: string
  eyebrow: string
  description: string
  consultUrl: string
}

// TODO: Replace each consultUrl with the real Calendly link for that track.
// Tracks and copy mirror ai-context.md Section 4 (THE COACHING OFFER).
const TRACKS: Track[] = [
  {
    id: 'strategic',
    eyebrow: 'Strategic',
    description:
      'Founders, operators, and professionals navigating career pivots who need to think more clearly about what they are building and why.',
    consultUrl: 'https://calendly.com/your-handle/strategic-consult',
  },
  {
    id: 'creative',
    eyebrow: 'Creative',
    description:
      'Artists, writers, performers, and makers who are stuck, scared, or sitting on something that needs to get out.',
    consultUrl: 'https://calendly.com/your-handle/creative-consult',
  },
  {
    id: 'personal',
    eyebrow: 'Personal',
    description:
      'People navigating divorce, estrangement, loss, or the slow erosion of self-worth.',
    consultUrl: 'https://calendly.com/your-handle/personal-consult',
  },
  {
    id: 'transformational',
    eyebrow: 'Transformational',
    description:
      'Identity-level work for people who sense that the version of themselves that got them here will not get them where they are going.',
    consultUrl: 'https://calendly.com/your-handle/transformational-consult',
  },
]

function TrackContent({ track }: { track: Track }) {
  return (
    <>
      <p className="eyebrow mb-5" style={{ color: 'var(--red-hero)' }}>
        {track.eyebrow}
      </p>
      <p
        className="body-base flex-1 mb-7"
        style={{ color: 'var(--ink)', opacity: 0.78 }}
      >
        {track.description}
      </p>
      <a
        href={track.consultUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-widest pb-1 transition-colors"
        style={{
          color: 'var(--ink)',
          borderBottom: '1px solid rgba(20, 17, 15, 0.4)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--red-hero)'
          e.currentTarget.style.borderBottomColor = 'var(--red-hero)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--ink)'
          e.currentTarget.style.borderBottomColor = 'rgba(20, 17, 15, 0.4)'
        }}
      >
        Book a 15-min consult
        <span aria-hidden="true">→</span>
      </a>
    </>
  )
}

function TrackCard({ track }: { track: Track }) {
  const magnet = useMagnetic({
    maxOffset: 8,
    tiltDegrees: 3,
    innerParallaxRange: 4,
  })

  const cardStyle = {
    background: 'var(--bone)',
    border: '1px solid rgba(20, 17, 15, 0.12)',
    borderRadius: '28px',
  }

  if (magnet.reduced) {
    return (
      <div
        id={`coaching-${track.id}`}
        className="relative flex flex-col h-full p-7 md:p-8"
        style={cardStyle}
      >
        <TrackContent track={track} />
      </div>
    )
  }

  return (
    <motion.div
      ref={magnet.ref as React.RefObject<HTMLDivElement>}
      id={`coaching-${track.id}`}
      onPointerLeave={magnet.onPointerLeave}
      onPointerMove={magnet.onPointerMove}
      className="relative flex flex-col h-full p-7 md:p-8"
      style={{
        ...cardStyle,
        x: magnet.x,
        y: magnet.y,
        rotateX: magnet.rotateX,
        rotateY: magnet.rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <TrackContent track={track} />
    </motion.div>
  )
}

export default function Coaching() {
  const reduced = useReducedMotion() ?? false

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
      style={{ perspective: reduced ? undefined : 1200 }}
    >
      {TRACKS.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  )
}

'use client'

import { motion } from 'motion/react'

type Track = {
  id: string
  eyebrow: string
  description: string
  consultUrl: string
  ctaLabel: string
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
    ctaLabel: 'Schedule',
  },
  {
    id: 'creative',
    eyebrow: 'Creative',
    description:
      'Artists, writers, performers, and makers who are stuck, scared, or sitting on something that needs to get out.',
    consultUrl: 'https://calendly.com/your-handle/creative-consult',
    ctaLabel: "Schedule",
  },
  {
    id: 'personal',
    eyebrow: 'Personal',
    description:
      'People navigating divorce, estrangement, loss, or the slow erosion of self-worth.',
    consultUrl: 'https://calendly.com/your-handle/personal-consult',
    ctaLabel: 'Schedule',
  },
  {
    id: 'transformational',
    eyebrow: 'Transformational',
    description:
      'Identity-level work for people who sense that the version of themselves that got them here will not get them where they are going.',
    consultUrl: 'https://calendly.com/your-handle/transformational-consult',
    ctaLabel: 'Explore',
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
        style={{ color: 'var(--bone)', opacity: 0.8 }}
      >
        {track.description}
      </p>
      <a
        href={track.consultUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 self-start text-[0.9rem] font-bold tracking-wide pb-1 transition-colors mt-auto group"
        style={{
          color: 'var(--bone)',
          borderBottom: '1.5px solid rgba(255, 255, 255, 0.4)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--red-hero)'
          e.currentTarget.style.borderBottomColor = 'var(--red-hero)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--bone)'
          e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.4)'
        }}
      >
        {track.ctaLabel}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </>
  )
}

function TrackCard({ track }: { track: Track }) {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '28px',
  }

  return (
    <motion.div
      id={`coaching-${track.id}`}
      whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.05)' }}
      className="relative flex flex-col h-full p-7 md:p-8 transition-colors"
      style={cardStyle}
    >
      <TrackContent track={track} />
    </motion.div>
  )
}

export default function Coaching() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
      initial="hidden"
      animate="visible"
    >
      {TRACKS.map((track) => (
        <motion.div key={track.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <TrackCard track={track} />
        </motion.div>
      ))}
    </motion.div>
  )
}

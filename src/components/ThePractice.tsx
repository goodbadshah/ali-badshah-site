'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import WaitlistForm from './WaitlistForm'
import { useMagnetic } from '@/lib/useMagnetic'

const CALENDLY_URL = 'https://calendly.com/your-handle/fortress-forge-fit-call'

type CardId = 'moat' | 'fortress' | 'garrison'

type CardProps = {
  id: string
  primary?: boolean
  numeral: string
  hovered: boolean
  onEnter: () => void
  onLeave: () => void
  children: ReactNode
}

function PracticeCard({ id, primary, numeral, hovered, onEnter, onLeave, children }: CardProps) {
  const magnet = useMagnetic({
    maxOffset: primary ? 14 : 10,
    tiltDegrees: 5,
    innerParallaxRange: 6,
  })

  const bg = primary ? 'var(--ink-elev)' : 'var(--bone)'
  const color = primary ? 'var(--bone)' : 'var(--ink)'

  const baseShadow = primary
    ? '0 28px 70px -28px rgba(187, 53, 53, 0.45), 0 12px 30px -12px rgba(0, 0, 0, 0.55)'
    : '0 18px 50px -24px rgba(20, 17, 15, 0.45)'

  const glowShadow = primary
    ? '0 40px 90px -28px rgba(187, 53, 53, 0.85), 0 20px 50px -16px rgba(187, 53, 53, 0.4), 0 12px 30px -12px rgba(0, 0, 0, 0.55)'
    : '0 28px 65px -24px rgba(20, 17, 15, 0.55)'

  if (magnet.reduced) {
    return (
      <div
        id={id}
        className="relative flex flex-col h-full p-7 md:p-8"
        style={{
          background: bg,
          color,
          borderRadius: '28px',
          boxShadow: baseShadow,
          overflow: 'hidden',
        }}
      >
        {primary ? (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'var(--red-hero)',
            }}
          />
        ) : null}
        <span
          aria-hidden="true"
          className="ali-custom-font select-none pointer-events-none"
          style={{
            position: 'absolute',
            bottom: '-1.5rem',
            right: '-0.5rem',
            fontSize: 'clamp(10rem, 18vw, 16rem)',
            lineHeight: 1,
            color: primary ? 'rgba(244, 238, 230, 0.06)' : 'rgba(20, 17, 15, 0.05)',
          }}
        >
          {numeral}
        </span>
        <div className="relative z-10 flex flex-col h-full">{children}</div>
      </div>
    )
  }

  return (
    <motion.div
      ref={magnet.ref as React.RefObject<HTMLDivElement>}
      id={id}
      role="group"
      onPointerEnter={onEnter}
      onPointerLeave={() => {
        magnet.onPointerLeave()
        onLeave()
      }}
      onPointerMove={magnet.onPointerMove}
      animate={{ boxShadow: hovered ? glowShadow : baseShadow }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col h-full p-7 md:p-8"
      style={{
        background: bg,
        color,
        borderRadius: '28px',
        overflow: 'hidden',
        x: magnet.x,
        y: magnet.y,
        rotateX: magnet.rotateX,
        rotateY: magnet.rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow',
      }}
    >
      {primary ? (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--red-hero)',
            transform: 'translateZ(40px)',
          }}
        />
      ) : null}

      <motion.span
        aria-hidden="true"
        className="ali-custom-font select-none pointer-events-none"
        style={{
          position: 'absolute',
          bottom: '-1.5rem',
          right: '-0.5rem',
          fontSize: 'clamp(10rem, 18vw, 16rem)',
          lineHeight: 1,
          color: primary ? 'rgba(244, 238, 230, 0.06)' : 'rgba(20, 17, 15, 0.05)',
          x: magnet.parallaxX,
          y: magnet.parallaxY,
          willChange: 'transform',
        }}
      >
        {numeral}
      </motion.span>

      <motion.div
        className="relative flex flex-col h-full"
        style={{
          x: magnet.parallaxX,
          y: magnet.parallaxY,
          transform: 'translateZ(40px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function ThePractice() {
  const reduced = useReducedMotion() ?? false
  const [active, setActive] = useState<CardId | null>(null)

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"
      style={{ perspective: reduced ? undefined : 1200 }}
    >
      <PracticeCard
        id="card-moat-manifesto"
        numeral="01"
        hovered={active === 'moat'}
        onEnter={() => setActive('moat')}
        onLeave={() => setActive(null)}
      >
        <p className="eyebrow mb-6" style={{ color: 'var(--red-hero)' }}>
          One-time · In development
        </p>
        <h3 className="heading-display-sm mb-4">Moat Manifesto</h3>
        <p className="body-base mb-3" style={{ opacity: 0.85 }}>
          A guided strategic tool that maps your uncontested territory, designs delight, and
          architects engagement.
        </p>
        <p className="body-base flex-1" style={{ opacity: 0.6 }}>
          For founders and producers building from idea to defensible product.
        </p>
        <div className="mt-7">
          <WaitlistForm variant="light" />
        </div>
      </PracticeCard>

      <PracticeCard
        id="card-fortress-forge"
        primary
        numeral="02"
        hovered={active === 'fortress'}
        onEnter={() => setActive('fortress')}
        onLeave={() => setActive(null)}
      >
        <p className="eyebrow mb-6" style={{ color: 'var(--red-hero)' }}>
          Two-week intensive
        </p>
        <h3 className="heading-display-sm mb-4">Fortress Forge</h3>
        <p className="body-base mb-3" style={{ opacity: 0.92 }}>
          We forge your moat together against your real product, your real market, and your
          real constraints.
        </p>
        <p className="body-base flex-1" style={{ opacity: 0.65 }}>
          For founders and producers with early signal and no product lead.
        </p>
        <div className="mt-7">
          {/* TODO: replace CALENDLY_URL placeholder with the real Calendly link. */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red w-full"
          >
            Book a Fit Call
          </a>
        </div>
      </PracticeCard>

      <PracticeCard
        id="card-garrison"
        numeral="03"
        hovered={active === 'garrison'}
        onEnter={() => setActive('garrison')}
        onLeave={() => setActive(null)}
      >
        <p className="eyebrow mb-6" style={{ color: 'var(--red-hero)' }}>
          Ongoing leadership
        </p>
        <h3 className="heading-display-sm mb-4">Garrison</h3>
        <p className="body-base mb-3" style={{ opacity: 0.85 }}>
          Embedded product or IP leadership. Inside your team, inside your decisions,
          inside the work.
        </p>
        <p className="body-base flex-1" style={{ opacity: 0.6 }}>
          For founders not yet ready to hire a full-time CPO.
        </p>
        <div className="mt-7">
          <a
            href="mailto:ali@fulstakt.com?subject=Garrison%20Inquiry"
            className="w-full inline-flex items-center justify-center"
            style={{
              padding: '0.95rem 1.5rem',
              borderRadius: '9999px',
              border: '1px solid var(--ink)',
              color: 'var(--ink)',
              fontWeight: 700,
              fontSize: '0.9375rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'background 200ms ease, color 200ms ease',
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
            Start a Conversation
          </a>
        </div>
      </PracticeCard>
    </div>
  )
}

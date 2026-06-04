'use client'

import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import WaitlistForm from './WaitlistForm'

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
  const bg = primary ? 'linear-gradient(145deg, rgba(187, 53, 53, 0.15), rgba(187, 53, 53, 0.05))' : 'rgba(255, 255, 255, 0.03)'
  const color = 'var(--bone)'

  const baseShadow = primary
    ? '0 28px 70px -28px rgba(187, 53, 53, 0.45), 0 12px 30px -12px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.05)'
    : '0 18px 50px -24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)'

  const glowShadow = primary
    ? '0 40px 90px -28px rgba(187, 53, 53, 0.85), 0 20px 50px -16px rgba(187, 53, 53, 0.4), 0 12px 30px -12px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255,255,255,0.08)'
    : '0 28px 65px -24px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255,255,255,0.1)'

  return (
    <motion.div
      id={id}
      role="group"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      animate={{ boxShadow: hovered ? glowShadow : baseShadow, y: hovered ? -4 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col h-full p-7 md:p-8"
      style={{
        background: bg,
        color,
        borderRadius: '28px',
        overflow: 'hidden',
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
          color: primary ? 'rgba(244, 238, 230, 0.08)' : 'rgba(244, 238, 230, 0.04)',
        }}
      >
        {numeral}
      </span>

      <div
        className="relative flex flex-col h-full z-10"
      >
        {children}
      </div>
    </motion.div>
  )
}

export default function ThePractice() {
  const [active, setActive] = useState<CardId | null>(null)

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
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
          A guided strategic framework that maps your uncontested territory and uncovers what makes your product uniquely yours.
        </p>
        <p className="body-base flex-1" style={{ opacity: 0.6 }}>
          For founders and producers building from idea to defensible product.
        </p>
        <div className="mt-7">
          <WaitlistForm variant="dark" />
        </div>
      </PracticeCard>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
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
          We forge your defensible moat using your real product, your real market, and your
          real constraints.
        </p>
        <p className="body-base flex-1" style={{ opacity: 0.65 }}>
          For founders and producers with early signal and no product lead.
        </p>
        <div className="mt-7">
          {/* TODO: replace CALENDLY_URL placeholder with the real Calendly link. */}
          <motion.a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red w-full"
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
          >
            Apply
          </motion.a>
        </div>
      </PracticeCard>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
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
          <motion.a
            href="mailto:ali@fulstakt.com?subject=Garrison%20Inquiry"
            className="btn-red-light w-full"
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '9999px',
              border: '1.5px solid rgba(244, 238, 230, 0.2)',
              color: 'var(--bone)',
              transition: 'background 300ms ease, color 300ms ease, border-color 300ms ease',
            }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bone)'
              e.currentTarget.style.color = 'var(--ink)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--bone)'
            }}
          >
            Inquire
          </motion.a>
        </div>
      </PracticeCard>
      </motion.div>
    </motion.div>
  )
}

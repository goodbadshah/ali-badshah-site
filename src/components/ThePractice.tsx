'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import WaitlistForm from './WaitlistForm'

const SPRING = { type: 'spring' as const, damping: 20, stiffness: 180, mass: 0.6 }

const CALENDLY_URL = 'https://calendly.com/your-handle/fortress-forge-fit-call'

type CardId = 'moat' | 'fortress' | 'garrison'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

function PrimaryOfferTag({ hovered }: { hovered: boolean }) {
  const tagVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: SPRING },
  }
  return (
    <motion.span
      variants={tagVariants}
      animate={hovered ? 'hover' : 'rest'}
      className="absolute top-4 right-4 uppercase font-bold"
      style={{
        fontSize: '10px',
        letterSpacing: '0.05em',
        padding: '4px 8px',
        border: '1px solid var(--red-hero)',
        color: 'var(--red-hero)',
        background: 'transparent',
        borderRadius: '4px',
      }}
    >
      PRIMARY OFFER
    </motion.span>
  )
}

function Card({
  id,
  hero,
  active,
  anyActive,
  isDesktop,
  reduced,
  onHover,
  onLeave,
  children,
}: {
  id: string
  hero?: boolean
  active: boolean
  anyActive: boolean
  isDesktop: boolean
  reduced: boolean
  onHover: () => void
  onLeave: () => void
  children: ReactNode
}) {
  const animateHover = isDesktop && !reduced
  const liftY = hero ? -8 : -6

  const animateProps = animateHover
    ? {
        y: active ? liftY : 0,
        opacity: anyActive && !active ? 0.85 : 1,
      }
    : { y: 0, opacity: 1 }

  const baseShadow = hero
    ? '0 18px 40px -12px rgba(187, 53, 53, 0.25), 0 6px 16px -6px rgba(0, 0, 0, 0.08)'
    : '0 6px 18px -8px rgba(0, 0, 0, 0.12)'

  return (
    <motion.div
      id={id}
      role="group"
      onPointerEnter={animateHover ? onHover : undefined}
      onPointerLeave={animateHover ? onLeave : undefined}
      animate={animateProps}
      transition={SPRING}
      className="relative flex flex-col h-full rounded-2xl p-6 md:p-8 border border-gray-200"
      style={{
        background: hero ? 'rgba(212, 104, 104, 0.08)' : '#ffffff',
        boxShadow: baseShadow,
      }}
    >
      {hero ? <PrimaryOfferTag hovered={active} /> : null}
      {children}
    </motion.div>
  )
}

export default function ThePractice() {
  const reduced = useReducedMotion() ?? false
  const isDesktop = useIsDesktop()
  const [active, setActive] = useState<CardId | null>(null)

  const anyActive = active !== null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <Card
        id="card-moat-manifesto"
        active={active === 'moat'}
        anyActive={anyActive}
        isDesktop={isDesktop}
        reduced={reduced}
        onHover={() => setActive('moat')}
        onLeave={() => setActive(null)}
      >
        <h3 className="text-2xl md:text-3xl text-gray-900 ali-custom-font mb-2">
          MOAT MANIFESTO
        </h3>
        <p className="italic text-gray-500 mb-5">
          A strategic instrument for founders and storytellers.
        </p>
        <div className="space-y-4 text-gray-700 text-base leading-relaxed flex-1">
          <p>
            A guided five-stage process built on three phases: Terrain Analysis, Feature
            Architecture, and Motivation Design. You answer the questions. The tool builds
            your Moat Manifesto: a complete strategic document that maps your uncontested
            territory, designs the features or franchise elements that will create real
            delight, and architects the engagement that turns first-time users or
            first-time audiences into lifetime customers.
          </p>
          <p>
            One-time payment. Multiple runs across as many ideas, products, or IPs as you
            want.
          </p>
          <p className="text-gray-500 text-sm">
            In development. Founders and producers on the waitlist get early access and
            founding-member pricing.
          </p>
        </div>
        <div className="mt-6">
          <WaitlistForm />
        </div>
      </Card>

      <Card
        id="card-fortress-forge"
        hero
        active={active === 'fortress'}
        anyActive={anyActive}
        isDesktop={isDesktop}
        reduced={reduced}
        onHover={() => setActive('fortress')}
        onLeave={() => setActive(null)}
      >
        <h3 className="text-2xl md:text-3xl text-gray-900 ali-custom-font mb-2 mt-6">
          FORTRESS FORGE
        </h3>
        <p className="italic text-gray-500 mb-5">
          Two weeks. We forge your moat together.
        </p>
        <div className="space-y-4 text-gray-700 text-base leading-relaxed flex-1">
          <p>
            A fixed two-week intensive. We work through the Moat Manifesto methodology
            against your real product, your real market, and your real constraints. For
            founders, that means your codebase, your users, your roadmap. For producers,
            that means your IP, your audience, and the franchise architecture you are
            trying to build.
          </p>
          <p>
            You leave with a Terrain Map, a Feature Architecture, a Motivation Design, and
            a 90-day execution plan. You also leave with clarity on what to kill.
          </p>
          <p className="text-gray-500 text-sm">
            For founders and producers with early signal and no product lead. Limited
            engagements per quarter.
          </p>
        </div>
        <div className="mt-6">
          {/* TODO: replace CALENDLY_URL placeholder with the real Calendly link. */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red w-full"
          >
            BOOK A FIT CALL
          </a>
        </div>
      </Card>

      <Card
        id="card-garrison"
        active={active === 'garrison'}
        anyActive={anyActive}
        isDesktop={isDesktop}
        reduced={reduced}
        onHover={() => setActive('garrison')}
        onLeave={() => setActive(null)}
      >
        <h3 className="text-2xl md:text-3xl text-gray-900 ali-custom-font mb-2">
          GARRISON
        </h3>
        <p className="italic text-gray-500 mb-5">
          Embedded product or IP leadership, ongoing.
        </p>
        <div className="space-y-4 text-gray-700 text-base leading-relaxed flex-1">
          <p>
            Part-time product leadership for AI-native startups not yet ready to hire a
            full-time CPO. Or part-time creative and franchise leadership for production
            companies developing IP without an embedded showrunner-strategist. Inside your
            team. Inside your decisions. Inside the work.
          </p>
          <p>
            Same judgment a full-time executive brings. Without the equity package or the
            eighteen-month commitment.
          </p>
          <p className="text-gray-500 text-sm">
            Available to qualified founders and producers. Those who have completed a
            Fortress Forge get priority placement.
          </p>
        </div>
        <div className="mt-6">
          <a
            href="mailto:ali@fulstakt.com?subject=Garrison%20Inquiry"
            className="btn-red w-full"
          >
            START A CONVERSATION
          </a>
        </div>
      </Card>
    </div>
  )
}

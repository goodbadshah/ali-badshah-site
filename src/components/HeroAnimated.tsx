'use client'

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react'
import { Fragment, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import HeroChat from './HeroChat'

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

const blockSpring = { type: 'spring' as const, damping: 22, stiffness: 180, mass: 0.9 }

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: blockSpring },
}

const photoVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 22, stiffness: 160, mass: 0.9 },
  },
}

type HeadingGroup = { words: string[]; nowrap?: boolean }

const HEADING_GROUPS: HeadingGroup[] = [
  { words: ['Build', 'a', 'product,'], nowrap: true },
  { words: ['write', 'a', 'novel,'] },
  { words: ['lose', '30', 'pounds,'] },
  { words: ['fall', 'in', 'love,'] },
  { words: ['and', 'save', 'the', 'world', 'in', '90', 'days!*'] },
]

function MaskedWord({ word, trailingSpace }: { word: string; trailingSpace: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        lineHeight: 'inherit',
      }}
    >
      <span
        className="word-inner"
        style={{
          display: 'inline-block',
          transform: 'translateY(60px)',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      >
        {word}
        {trailingSpace ? '\u00A0' : ''}
      </span>
    </span>
  )
}

function AnimatedHeading({ reduced }: { reduced: boolean }) {
  const groupRefs = useRef<(HTMLSpanElement | null)[]>([])
  const asteriskRef = useRef<HTMLSpanElement | null>(null)

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.12 })
      groupRefs.current.forEach((groupEl) => {
        if (!groupEl) return
        const inners = groupEl.querySelectorAll<HTMLElement>('.word-inner')
        if (!inners.length) return
        tl.to(inners, {
          y: 0,
          opacity: 1,
          stagger: 0.035,
          duration: 0.8,
          ease: 'power3.out',
        })
      })
      if (asteriskRef.current) {
        gsap.set(asteriskRef.current, { opacity: 0, y: 12 })
        tl.to(
          asteriskRef.current,
          { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' },
          '-=0.15',
        )
      }
    })
    return () => ctx.revert()
  }, [reduced])

  if (reduced) {
    return (
      <h2 className="heading-section text-white ali-custom-font">
        <span className="whitespace-nowrap">Build a product,</span> write a novel, lose 30 pounds, fall in love, and save the world in 90 days!*
        <span className="block text-xs text-white/60 mt-2">*results may vary</span>
      </h2>
    )
  }

  return (
    <h2 className="heading-section text-white ali-custom-font">
      {HEADING_GROUPS.map((group, gi) => {
        const isLastGroup = gi === HEADING_GROUPS.length - 1
        const content = group.words.map((word, wi) => {
          const isLastWordInGroup = wi === group.words.length - 1
          // Trailing space after every word except the final word of the final group
          const trailingSpace = !(isLastGroup && isLastWordInGroup)
          return (
            <MaskedWord
              key={`g${gi}-w${wi}`}
              word={word}
              trailingSpace={trailingSpace}
            />
          )
        })
        const groupNode = (
          <span
            ref={(el) => {
              groupRefs.current[gi] = el
            }}
            style={group.nowrap ? { whiteSpace: 'nowrap' } : undefined}
          >
            {content}
          </span>
        )
        return <Fragment key={`g${gi}`}>{groupNode}</Fragment>
      })}
      <span ref={asteriskRef} className="block text-xs text-white/60 mt-2">
        *results may vary
      </span>
    </h2>
  )
}

function ParallaxPortrait({ reduced }: { reduced: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const springConfig = { damping: 22, stiffness: 120, mass: 0.6 }
  const sx = useSpring(px, springConfig)
  const sy = useSpring(py, springConfig)

  const rotateY = useTransform(sx, [-1, 1], [-6, 6])
  const rotateX = useTransform(sy, [-1, 1], [4, -4])
  const translateX = useTransform(sx, [-1, 1], [-8, 8])
  const translateY = useTransform(sy, [-1, 1], [-8, 8])

  useEffect(() => {
    if (reduced) return
    const el = containerRef.current
    if (!el) return

    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = (e.clientX - cx) / (rect.width / 2)
      const ny = (e.clientY - cy) / (rect.height / 2)
      px.set(Math.max(-1, Math.min(1, nx)))
      py.set(Math.max(-1, Math.min(1, ny)))
    }
    const handleLeave = () => {
      px.set(0)
      py.set(0)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerleave', handleLeave)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
    }
  }, [px, py, reduced])

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-6 mt-8 lg:mt-0"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden"
        style={{
          aspectRatio: '4/5',
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          x: reduced ? 0 : translateX,
          y: reduced ? 0 : translateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        variants={reduced ? undefined : photoVariants}
      >
        <img
          src="/images/ali-badshah-photo-06.png"
          alt="Ali Badshah"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
    </div>
  )
}

export default function HeroAnimated({ tagline }: { tagline: ReactNode }) {
  const reduced = useReducedMotion() ?? false

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="space-y-8">
        <div className="flex flex-col gap-10">
          <AnimatedHeading reduced={reduced} />
          <motion.p
            variants={blockVariants}
            className="text-base md:text-lg text-white/80 font-medium leading-relaxed"
          >
            {tagline}
          </motion.p>
          <motion.div variants={blockVariants}>
            <HeroChat />
          </motion.div>
        </div>
      </div>
      <ParallaxPortrait reduced={reduced} />
    </motion.div>
  )
}

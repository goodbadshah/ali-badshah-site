'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'

const ITEMS = [
  { numeral: '01', statement: 'Uncontested market.' },
  { numeral: '02', statement: 'Emotional delight.' },
  { numeral: '03', statement: 'Lifetime customers.' },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 22, stiffness: 160, mass: 0.9 },
  },
}

export default function PromiseTricolon() {
  const reduced = useReducedMotion() ?? false

  if (reduced) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {ITEMS.map((it) => (
          <div key={it.numeral}>
            <div
              className="ali-custom-font text-6xl md:text-7xl leading-none mb-4"
              style={{ color: 'var(--red-hero)' }}
            >
              {it.numeral}
            </div>
            <p className="text-large text-gray-900">{it.statement}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {ITEMS.map((it) => (
        <motion.div key={it.numeral} variants={item}>
          <div
            className="ali-custom-font text-6xl md:text-7xl leading-none mb-4"
            style={{ color: 'var(--red-hero)' }}
          >
            {it.numeral}
          </div>
          <p className="text-large text-gray-900">{it.statement}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

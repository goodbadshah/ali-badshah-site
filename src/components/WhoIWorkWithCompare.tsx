'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { useState } from 'react'

const NOT_THIS = [
  'A generalist consultant who hands you a deck',
  'A PM for hire who takes a task list',
  'Someone who disappears after the engagement',
  'A cheerleader for ideas that should be killed',
]

const THIS_ITEMS = [
  'A product operator who has shipped AI-native products from zero',
  'A fractional CPO with a proprietary methodology, not opinions',
  'Someone who will tell you what is wrong with your idea before you build it',
  'Your first product hire, on a timeline that fits your stage',
]

const notThisContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const thisContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const notThisItemV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 28, stiffness: 120, mass: 0.9 },
  },
}

const thisItemV: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 22, stiffness: 160, mass: 0.9 },
  },
}

export default function WhoIWorkWithCompare() {
  const reduced = useReducedMotion() ?? false
  const [activeRow, setActiveRow] = useState<number | null>(null)

  if (reduced) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">NOT THIS</h3>
          <ul className="space-y-0">
            {NOT_THIS.map((item, i) => (
              <li
                key={i}
                className={`text-gray-500 text-lg leading-relaxed border-t border-gray-200 py-4 ${
                  i === NOT_THIS.length - 1 ? 'border-b' : ''
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3
            className="text-sm font-black uppercase tracking-widest mb-6"
            style={{ color: 'var(--red-hero)' }}
          >
            THIS
          </h3>
          <ul className="space-y-0">
            {THIS_ITEMS.map((item, i) => (
              <li
                key={i}
                className={`text-gray-900 text-lg leading-relaxed font-medium border-t border-gray-900 py-4 ${
                  i === THIS_ITEMS.length - 1 ? 'border-b' : ''
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">NOT THIS</h3>
        <motion.ul
          className="space-y-0"
          variants={notThisContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {NOT_THIS.map((item, i) => {
            const isLast = i === NOT_THIS.length - 1
            const isActive = activeRow === i
            return (
              <motion.li
                key={i}
                variants={notThisItemV}
                className={`border-t border-gray-200 ${isLast ? 'border-b' : ''}`}
                onPointerEnter={() => setActiveRow(i)}
                onPointerLeave={() => setActiveRow(null)}
              >
                <motion.span
                  className="block text-gray-500 text-lg leading-relaxed py-4"
                  animate={{
                    opacity: isActive ? 0.4 : 1,
                    letterSpacing: isActive ? '-0.01em' : '0em',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {item}
                </motion.span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
      <div>
        <h3
          className="text-sm font-black uppercase tracking-widest mb-6"
          style={{ color: 'var(--red-hero)' }}
        >
          THIS
        </h3>
        <motion.ul
          className="space-y-0"
          variants={thisContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {THIS_ITEMS.map((item, i) => {
            const isLast = i === THIS_ITEMS.length - 1
            const isActive = activeRow === i
            return (
              <motion.li
                key={i}
                variants={thisItemV}
                className={`border-t border-gray-900 ${isLast ? 'border-b' : ''}`}
                onPointerEnter={() => setActiveRow(i)}
                onPointerLeave={() => setActiveRow(null)}
              >
                <motion.span
                  className="block text-gray-900 text-lg leading-relaxed font-medium py-4"
                  animate={{ x: isActive ? 4 : 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 240, mass: 0.5 }}
                >
                  {item}
                </motion.span>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </div>
  )
}

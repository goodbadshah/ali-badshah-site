'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

const CONSULT_URL = 'https://calendly.com/your-handle/15-min-consult'

export default function RightTabCTA() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-1/2 right-0 z-[100] -translate-y-1/2 flex items-center">
      {/* The visible persistent tab */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-32 bg-[var(--ink)] text-[var(--bone)] flex items-center justify-center rounded-l-2xl shadow-xl border border-r-0 border-[rgba(255,255,255,0.1)] outline-none"
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span 
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} 
          className="uppercase tracking-widest text-[0.65rem] font-bold"
        >
          {isOpen ? 'Close' : 'Consult'}
        </span>
      </motion.button>

      {/* The fly-out panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="absolute right-10 bg-[var(--ink)] text-[var(--bone)] p-8 rounded-l-3xl shadow-2xl w-72 md:w-80 border-t border-b border-l border-[rgba(255,255,255,0.1)]"
          >
            <h3 className="heading-display-sm mb-3">Work with Ali</h3>
            <p className="body-base mb-6 opacity-75">
              Available for select strategic engagements and 1:1 tracks.
            </p>
            <a
              href={CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-5 py-3 font-semibold bg-[var(--bone)] text-[var(--ink)] transition-transform rounded hover:scale-[1.02] active:scale-95"
            >
              Book 15-min fit call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

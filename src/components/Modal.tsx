'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Modal({ open, onClose, labelledBy, children }: Props) {
  const reduced = useReducedMotion() ?? false
  const panelRef = useRef<HTMLDivElement>(null)
  const lastActiveRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        if (nodes.length === 0) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [open, onClose],
  )

  useEffect(() => {
    if (!open) return
    lastActiveRef.current = document.activeElement as HTMLElement | null

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', handleKey)

    const t = window.setTimeout(() => {
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      nodes?.[0]?.focus()
    }, 50)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prevOverflow
      window.clearTimeout(t)
      lastActiveRef.current?.focus?.()
    }
  }, [open, handleKey])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 w-full h-full cursor-default"
            style={{ background: 'rgba(5, 4, 4, 0.65)', backdropFilter: 'blur(24px) saturate(0.6)' }}
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{ 
              background: 'radial-gradient(circle at 50% -20%, rgba(187, 53, 53, 0.15), var(--ink))', 
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08) inset, 0 40px 100px -20px rgba(0, 0, 0, 0.9)'
            }}
            initial={reduced ? false : { opacity: 0, y: 32, scale: 0.95 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          >
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--bone)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2 2l10 10M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
            <div className="p-7 md:p-12">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

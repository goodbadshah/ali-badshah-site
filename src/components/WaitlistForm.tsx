'use client'

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'submitting' | 'success' | 'error'

type Variant = 'light' | 'dark'

export default function WaitlistForm({ variant = 'light' }: { variant?: Variant }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const isValid = EMAIL_RE.test(email.trim())
  const isDark = variant === 'dark'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid || status === 'submitting') return
    setStatus('submitting')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const fieldColor = isDark ? 'var(--bone)' : 'var(--ink)'
  const fieldBorder = isDark ? 'rgba(244, 238, 230, 0.18)' : 'rgba(20, 17, 15, 0.14)'
  const fieldBg = isDark ? 'rgba(244, 238, 230, 0.04)' : 'rgba(20, 17, 15, 0.02)'
  const placeholder = isDark ? 'rgba(244, 238, 230, 0.45)' : 'rgba(20, 17, 15, 0.4)'

  if (status === 'success') {
    return (
      <p className="body-base" style={{ color: fieldColor }}>
        You're on the list.
      </p>
    )
  }

  if (status === 'error') {
    return (
      <p className="body-base" style={{ color: fieldColor }}>
        Something went wrong. Email{' '}
        <a href="mailto:ali@fulstakt.com" style={{ color: 'var(--red-hero)' }}>
          ali@fulstakt.com
        </a>
        .
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className="relative flex items-center"
        style={{
          background: fieldBg,
          border: `1px solid ${fieldBorder}`,
          borderRadius: '9999px',
          paddingLeft: '20px',
          paddingRight: '6px',
          transition: 'border-color 200ms ease',
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Join the waitlist"
          aria-label="Email address for waitlist"
          className="flex-1 bg-transparent border-0 outline-none py-3 text-base"
          style={{
            color: fieldColor,
            ['--placeholder-color' as string]: placeholder,
          }}
        />
        <motion.button
          type="submit"
          disabled={!isValid || status === 'submitting'}
          aria-label="Submit"
          whileHover={isValid ? { scale: 1.05 } : {}}
          whileTap={isValid ? { scale: 0.95 } : {}}
          className="flex items-center justify-center transition-colors relative"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '9999px',
            background: isValid ? 'var(--red-hero)' : 'transparent',
            color: isValid ? '#fff' : (isDark ? 'rgba(244, 238, 230, 0.4)' : 'rgba(20, 17, 15, 0.4)'),
            border: 'none',
            cursor: isValid ? 'pointer' : 'not-allowed',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === 'submitting' ? (
              <motion.span 
                key="submitting"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
              />
            ) : (
              <motion.svg 
                key="idle"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
              >
                <path
                  d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <style jsx>{`
        input::placeholder {
          color: var(--placeholder-color);
        }
      `}</style>
    </form>
  )
}

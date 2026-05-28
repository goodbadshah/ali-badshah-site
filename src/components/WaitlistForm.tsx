'use client'

import { useState, type FormEvent } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const isValid = EMAIL_RE.test(email.trim())

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
      console.log('[waitlist] response:', res)
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.log('[waitlist] network error:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-gray-900 text-base font-medium">You are on the list.</p>
  }

  if (status === 'error') {
    return (
      <p className="text-gray-900 text-base font-medium">
        Something went wrong. Email ali@fulstakt.com.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
        style={{ ['--tw-ring-color' as string]: 'var(--red-hero)' }}
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={!isValid || status === 'submitting'}
        className="btn-red w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'JOINING...' : 'JOIN THE WAITLIST'}
      </button>
    </form>
  )
}

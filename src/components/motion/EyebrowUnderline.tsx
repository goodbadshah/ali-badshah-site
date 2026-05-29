'use client'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  color?: string
}

export default function EyebrowUnderline({
  children,
  className = '',
  color = 'var(--red-hero)',
}: Props) {
  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <span className="eyebrow-display" style={{ color }}>
        {children}
      </span>
      <span
        aria-hidden="true"
        style={{
          display: 'block',
          height: '1px',
          width: '2.25rem',
          marginTop: '0.55rem',
          background: color,
        }}
      />
    </span>
  )
}

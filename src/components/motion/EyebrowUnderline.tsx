'use client'

import type { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  color?: string
  size?: 'default' | 'lg'
  underline?: boolean
}

export default function EyebrowUnderline({
  children,
  className = '',
  color = 'var(--red-hero)',
  size = 'default',
  underline = true,
}: Props) {
  const textStyle: CSSProperties = { color }
  if (size === 'lg') {
    // Inline fontSize override keeps the .eyebrow-display class (Cooper Black)
    // and avoids relying on a freshly-added CSS class that may not hot-reload.
    textStyle.fontSize = 'clamp(1.25rem, 2.4vw, 1.75rem)'
  }

  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <span className="eyebrow-display" style={textStyle}>
        {children}
      </span>
      {underline ? (
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
      ) : null}
    </span>
  )
}

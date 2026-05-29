'use client'

type Props = {
  className?: string
  color?: string
}

export default function DividerDraw({
  className = '',
  color = 'var(--red-hero)',
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        height: '1px',
        background: color,
        opacity: 0.35,
      }}
    />
  )
}

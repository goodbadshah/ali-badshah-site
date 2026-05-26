'use client'

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'

const MAX_OFFSET = 12

export default function MagneticCard({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLAnchorElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { damping: 20, stiffness: 180, mass: 0.6 }
  const x = useSpring(px, spring)
  const y = useSpring(py, spring)

  if (reduced) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const nx = (e.clientX - cx) / (rect.width / 2)
    const ny = (e.clientY - cy) / (rect.height / 2)
    px.set(Math.max(-1, Math.min(1, nx)) * MAX_OFFSET)
    py.set(Math.max(-1, Math.min(1, ny)) * MAX_OFFSET)
  }

  const handleLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y, willChange: 'transform' }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.a>
  )
}

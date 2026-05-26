'use client'

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { useRef, type CSSProperties } from 'react'

export default function ParallaxPhoto({
  src,
  alt,
  className,
  style,
  wrapperClassName,
}: {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  wrapperClassName?: string
}) {
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const springConfig = { damping: 22, stiffness: 120, mass: 0.6 }
  const sx = useSpring(px, springConfig)
  const sy = useSpring(py, springConfig)
  const rotateY = useTransform(sx, [-1, 1], [-6, 6])
  const rotateX = useTransform(sy, [-1, 1], [4, -4])
  const translateX = useTransform(sx, [-1, 1], [-8, 8])
  const translateY = useTransform(sy, [-1, 1], [-8, 8])

  if (reduced) {
    return (
      <img src={src} alt={alt} className={className} style={style} />
    )
  }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const nx = (e.clientX - cx) / (rect.width / 2)
    const ny = (e.clientY - cy) / (rect.height / 2)
    px.set(Math.max(-1, Math.min(1, nx)))
    py.set(Math.max(-1, Math.min(1, ny)))
  }
  const handleLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={wrapperClassName}
      style={{ perspective: 1000 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={className}
        style={{
          ...style,
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

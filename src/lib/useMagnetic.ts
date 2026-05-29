'use client'

import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useRef, type PointerEvent as ReactPointerEvent } from 'react'

type UseMagneticOptions = {
  maxOffset?: number
  tiltDegrees?: number
  innerParallaxRange?: number
  spring?: { damping: number; stiffness: number; mass: number }
}

export type MagneticState = {
  ref: React.RefObject<HTMLElement | null>
  onPointerMove: (e: ReactPointerEvent<HTMLElement>) => void
  onPointerLeave: () => void
  x: MotionValue<number>
  y: MotionValue<number>
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
  reduced: boolean
}

export function useMagnetic({
  maxOffset = 12,
  tiltDegrees = 5,
  innerParallaxRange = 8,
  spring = { damping: 20, stiffness: 180, mass: 0.6 },
}: UseMagneticOptions = {}): MagneticState {
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLElement | null>(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const sxRaw = useSpring(px, spring)
  const syRaw = useSpring(py, spring)

  const x = useTransform(sxRaw, [-1, 1], [-maxOffset, maxOffset])
  const y = useTransform(syRaw, [-1, 1], [-maxOffset, maxOffset])

  const rotateY = useTransform(sxRaw, [-1, 1], [-tiltDegrees, tiltDegrees])
  const rotateX = useTransform(syRaw, [-1, 1], [tiltDegrees, -tiltDegrees])

  const parallaxX = useTransform(sxRaw, [-1, 1], [-innerParallaxRange, innerParallaxRange])
  const parallaxY = useTransform(syRaw, [-1, 1], [-innerParallaxRange, innerParallaxRange])

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const nx = (e.clientX - cx) / (rect.width / 2)
    const ny = (e.clientY - cy) / (rect.height / 2)
    px.set(Math.max(-1, Math.min(1, nx)))
    py.set(Math.max(-1, Math.min(1, ny)))
  }

  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return {
    ref,
    onPointerMove,
    onPointerLeave,
    x,
    y,
    rotateX,
    rotateY,
    parallaxX,
    parallaxY,
    reduced,
  }
}

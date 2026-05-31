'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import Coaching from './Coaching'
import Modal from './Modal'
import ThePractice from './ThePractice'

type Door = 'build' | 'work' | null

// TODO: Draft CTA labels — Ali to refine. Sublabels factual; headings parallel.
const DOORS = {
  build: {
    sublabel: 'For founders & producers',
    label: 'Build with Ali',
    heading: 'Build with Ali',
    subheading: 'Three depths. One method.',
  },
  work: {
    sublabel: 'For 1:1 coaching',
    label: 'Work with Ali',
    heading: 'Work 1:1 with Ali',
    subheading: 'Four tracks. One conversation.',
  },
} as const

function GateCard({
  doorKey,
  onOpen,
  reduced,
}: {
  doorKey: 'build' | 'work'
  onOpen: () => void
  reduced: boolean
}) {
  const door = DOORS[doorKey]

  const hoverMotion = reduced
    ? {}
    : {
        whileHover: { y: -4 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      }

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="group relative text-left rounded-3xl p-10 md:p-14 lg:p-16 min-h-[280px] md:min-h-[360px] flex flex-col"
      style={{
        background: 'var(--bone)',
        color: 'var(--ink)',
        boxShadow: '0 22px 60px -28px rgba(0, 0, 0, 0.55)',
      }}
      {...hoverMotion}
    >
      <p
        className="eyebrow"
        style={{ color: 'var(--red-hero)' }}
      >
        {door.sublabel}
      </p>
      <h3 className="heading-display mt-10 md:mt-16 max-w-[12ch]">
        {door.label}
      </h3>
      <span
        aria-hidden="true"
        className="absolute bottom-8 right-8 md:bottom-10 md:right-10 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:translate-x-1"
        style={{
          background: 'var(--ink)',
          color: 'var(--bone)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.button>
  )
}

export default function PracticeGate() {
  const reduced = useReducedMotion() ?? false
  const [openDoor, setOpenDoor] = useState<Door>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
        <GateCard doorKey="build" onOpen={() => setOpenDoor('build')} reduced={reduced} />
        <GateCard doorKey="work" onOpen={() => setOpenDoor('work')} reduced={reduced} />
      </div>

      <Modal
        open={openDoor === 'build'}
        onClose={() => setOpenDoor(null)}
        labelledBy="modal-build-heading"
      >
        <div className="mb-10 md:mb-14">
          <h2
            id="modal-build-heading"
            className="heading-display"
            style={{ color: 'var(--ink)' }}
          >
            {DOORS.build.heading}
          </h2>
          <p
            className="body-base mt-4"
            style={{ color: 'var(--ink)', opacity: 0.7 }}
          >
            {DOORS.build.subheading}
          </p>
        </div>
        <ThePractice />
      </Modal>

      <Modal
        open={openDoor === 'work'}
        onClose={() => setOpenDoor(null)}
        labelledBy="modal-work-heading"
      >
        <div className="mb-10 md:mb-14">
          <h2
            id="modal-work-heading"
            className="heading-display"
            style={{ color: 'var(--ink)' }}
          >
            {DOORS.work.heading}
          </h2>
          <p
            className="body-base mt-4"
            style={{ color: 'var(--ink)', opacity: 0.7 }}
          >
            {DOORS.work.subheading}
          </p>
        </div>
        <Coaching />
      </Modal>
    </>
  )
}

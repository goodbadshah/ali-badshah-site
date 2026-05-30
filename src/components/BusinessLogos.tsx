'use client'

// TODO: Ali to source greyscale SVG/PNG files and replace placeholder slots.
// Replace each entry's `src` with the asset path; the slot will swap automatically.
type LogoSlot = {
  label: string
  src?: string
  alt?: string
}

const LOGOS: LogoSlot[] = [
  { label: 'Sysco' },
  { label: 'TD Bank' },
  { label: 'AstraZeneca' },
  { label: 'UCL' },
  { label: 'Historica Canada' },
  { label: 'Santander Universities' },
]

function LogoCell({ slot }: { slot: LogoSlot }) {
  if (slot.src) {
    return (
      <img
        src={slot.src}
        alt={slot.alt ?? slot.label}
        className="h-7 md:h-9 max-w-[140px] object-contain"
        style={{
          filter: 'grayscale(1)',
          opacity: 0.65,
        }}
      />
    )
  }
  return (
    <div
      className="h-12 md:h-14 w-full max-w-[160px] flex items-center justify-center rounded-md"
      style={{
        border: '1px dashed rgba(20, 17, 15, 0.18)',
        color: 'rgba(20, 17, 15, 0.45)',
      }}
    >
      <span className="eyebrow text-center px-2">{slot.label}</span>
    </div>
  )
}

export default function BusinessLogos() {
  return (
    <div
      role="list"
      aria-label="Business and institutional credentials"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 items-center"
    >
      {LOGOS.map((slot) => (
        <div key={slot.label} role="listitem" className="flex items-center justify-center">
          <LogoCell slot={slot} />
        </div>
      ))}
    </div>
  )
}

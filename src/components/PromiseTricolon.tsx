'use client'

const ITEMS = [
  { numeral: '01', statement: 'Uncontested market.' },
  { numeral: '02', statement: 'Emotional delight.' },
  { numeral: '03', statement: 'Lifetime customers.' },
]

export default function PromiseTricolon() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
      {ITEMS.map((it) => (
        <div key={it.numeral}>
          <div
            className="ali-custom-font leading-none mb-5"
            style={{
              color: 'var(--red-hero)',
              fontSize: 'clamp(5rem, 11vw, 9rem)',
            }}
          >
            {it.numeral}
          </div>
          <p className="heading-display-sm" style={{ color: 'var(--ink)' }}>
            {it.statement}
          </p>
        </div>
      ))}
    </div>
  )
}

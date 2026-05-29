'use client'

import { Fragment, type ElementType, type ReactNode } from 'react'

type Props = {
  lines?: string[]
  children?: ReactNode
  as?: ElementType
  className?: string
}

export default function MaskedHeading({
  lines,
  children,
  as: Tag = 'h2',
  className,
}: Props) {
  if (lines && lines.length > 0) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < lines.length - 1 ? <br /> : null}
          </Fragment>
        ))}
      </Tag>
    )
  }
  return <Tag className={className}>{children}</Tag>
}

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export function VisuallyHidden({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'sr-only absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 -m-px',
        className,
      )}
      {...props}
    />
  )
}

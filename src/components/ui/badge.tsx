import type { HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary'
}

export function Badge({ variant = 'primary', className = '', ...props }: BadgeProps) {
  const base = 'inline-block px-2 py-1 text-xs font-semibold rounded'
  const colors =
    variant === 'secondary'
      ? 'bg-gray-100 text-gray-700'
      : 'bg-blue-100 text-blue-800'

  return (
    <span className={`${base} ${colors} ${className}`} {...props} />
  )
}

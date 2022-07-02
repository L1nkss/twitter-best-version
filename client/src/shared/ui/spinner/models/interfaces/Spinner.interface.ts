import React from 'react'

export interface SpinnerProps {
  children?: React.ReactElement | string
  size?: number
  strokeWidth?: number
  percentage?: number
  className?: string
  rotating?: boolean
}

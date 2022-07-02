import React, { FC, useMemo } from 'react'

import cn from 'classnames'

import { SpinnerProps } from '@shared/ui/spinner/models/interfaces/Spinner.interface'

const Spinner: FC<SpinnerProps> = ({
  children,
  size = 20,
  strokeWidth = 2,
  percentage = 25,
  className = '',
  rotating
}) => {
  const viewBox = useMemo(() => `0 0 ${size} ${size}`, [])
  const radius = useMemo(() => (size - strokeWidth) / 2, [])
  const circumference = useMemo(() => radius * Math.PI * 2, []) // длина окружности
  const dash = (percentage * circumference) / 100

  return (
    <svg
      width={ size }
      height={ size }
      viewBox={ viewBox }
      className={ cn('spinner', {'rotating': rotating}, className) }
    >
      <circle
        className="spinner__inner-circle"
        fill="none"
        cx={ size / 2 }
        cy={ size / 2 }
        r={ radius }
        strokeWidth={ `${strokeWidth}px` }
      />
      <circle
        fill="none"
        cx={ size / 2 }
        cy={ size / 2 }
        r={ radius }
        strokeWidth={ `${strokeWidth}px` }
        strokeDasharray={ `${dash} ${circumference - dash}` }
        transform={ `rotate(-90 ${size / 2} ${size / 2})` }
        strokeLinecap="round"
      />
      {children}
    </svg>
  )
}

export { Spinner }

import React, { FC } from 'react'
import cn from 'classnames'
import { ButtonProps } from './models/Button.interface'
import { Spinner } from '../spinner/spinner'

const Button: FC<ButtonProps> = ({
  buttonType = 'primary',
  isLoading = false,
  ...props
}: ButtonProps) => {
  const getButtonTypeClass = (): string => {
    return `button--${buttonType}`
  }

  return (
    <button
      {...props}
      className={cn('button', getButtonTypeClass(), props.className)}
      disabled={props.disabled}
    >
      {!isLoading && <span>{props.children}</span>}
      {isLoading && <Spinner strokeWidth={2} className="rotating" />}
    </button>
  )
}

export { Button }

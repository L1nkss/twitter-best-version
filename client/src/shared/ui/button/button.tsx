import React, { FC } from 'react'

import cn from 'classnames'

import { Icon } from '@shared/ui/icon/icon'

import { Spinner } from '../spinner/spinner'
import { ButtonProps } from './models/interfaces/Button.interface'

const Button: FC<ButtonProps> = ({
  buttonType = 'primary',
  isLoading = false,
  iconName,
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
      {iconName && <Icon classNames="mr-2" name={iconName} />}
      {!isLoading && <span>{props.children}</span>}
      {isLoading && <Spinner strokeWidth={2} className="rotating" />}
    </button>
  )
}

export { Button }

import React from 'react'

export type ButtonType = 'primary' | 'outline' | 'rounded'

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonType?: ButtonType
  isLoading?: boolean
}

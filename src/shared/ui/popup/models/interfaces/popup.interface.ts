import { ReactNode } from 'react'

export interface PopupProps {
  onClose: (status: boolean) => void
  isVisible: boolean
  title?: string
  children: ReactNode
}

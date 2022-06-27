import { FunctionComponent, ReactNode } from 'react'

export interface TwitterRoute {
  path: string
  element: ReactNode
  hocWrapper?: FunctionComponent<any>
  classes?: string
}

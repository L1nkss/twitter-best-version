import { FunctionComponent } from 'react'

export type NavigationName =
  | 'Home'
  | 'Explore'
  | 'Notifications'
  | 'Messages'
  | 'Lists'
  | 'Bookmarks'
  | 'Profile'

export interface NavigationRoute {
  id: string
  label: NavigationName
  icon: FunctionComponent
}

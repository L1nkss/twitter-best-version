import React from 'react'

export interface GuardRouteProps {
  isAllowed: boolean
  children: React.ReactElement
  redirectUrl?: string
}

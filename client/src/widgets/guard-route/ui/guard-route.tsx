import React, { FC } from 'react'

import { Navigate } from 'react-router'
import { Outlet } from 'react-router-dom'

import { GuardRouteProps } from '@widgets/guard-route/models/interfaces/GuardRoute.interface'

const GuardRoute: FC<GuardRouteProps> = ({
  isAllowed,
  children,
  redirectUrl = '/sign-in',
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectUrl} replace />
  }

  return children ? children : <Outlet />
}

export { GuardRoute }

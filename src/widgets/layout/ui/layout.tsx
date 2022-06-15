import React, { FC } from 'react'

import { Outlet } from 'react-router-dom'

import { Navigation } from '@widgets/navigations/ui/navigation'

const Layout: FC = () => {
  return (
    <div className="container flex mx-auto">
      <Navigation />
      <main className="main-content flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export { Layout }

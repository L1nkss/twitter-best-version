import React, { useEffect } from 'react'

import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { Bookmarks } from '@pages/bookmarks/ui/bookmarks'
import { Explore } from '@pages/explore/ui/explore'
import { Home } from '@pages/home/ui/home'
import { Lists } from '@pages/lists/ui/lists'
import { Messages } from '@pages/messages/ui/messages'
import { MobileVersion } from '@pages/mobile-version/ui/mobile-version'
import { Notifications } from '@pages/notifications/ui/notifications'
import { Profile } from '@pages/profile/ui/profile'
import { SignIn } from '@pages/sign-in/ui/sign-in'
import { SignUp } from '@pages/sign-up/ui/sign-up'
import { useAuth } from '@shared/hooks/useAuth'
import { useCheckIsMobile } from '@shared/hooks/useIsDeviceMobile'

import { Loader } from '@shared/ui/loader/loader'
import { AnimationPage } from '@widgets/animation-page/ui/animation-page'
import { GuardRoute } from '@widgets/guard-route/ui/guard-route'
import { Layout } from '@widgets/layout/ui/layout'

import { NotificationContainer } from '@widgets/notifications/ui/notifications';

import { TwitterRoute } from '../models/interfaces/TwitterRoute.interface'

function App() {
  const isMobile = useCheckIsMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const [ isAuth, isLoading ] = useAuth()

  const createRoute = (route: TwitterRoute) => {
    const routeElement = route.hocWrapper ? <route.hocWrapper classes={ route.classes }>{route.element}</route.hocWrapper> : route.element;
    return <Route key={ route.path } path={ route.path } element={ routeElement }/>
  }

  const routes: TwitterRoute[] = [
    {path: 'home', element: <Home/>, hocWrapper: AnimationPage},
    {path: 'explore', element: <Explore/>, hocWrapper: AnimationPage},
    {
      path: 'notifications',
      element: <Notifications/>,
      hocWrapper: AnimationPage,
    },
    {path: 'messages', element: <Messages/>, hocWrapper: AnimationPage, classes: 'flex flex-col'},
    {path: 'lists', element: <Lists/>, hocWrapper: AnimationPage},
    {path: 'bookmarks', element: <Bookmarks/>, hocWrapper: AnimationPage},
    {path: '/:id', element: <Profile/>, hocWrapper: AnimationPage},
    {path: '/', element: <Navigate to="/home"/>},
  ]

  useEffect(() => {
    const route = isMobile ? '/mobile-version' : '/'
    navigate(route)
  }, [ isMobile ])

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader/>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Routes key={ location.pathname } location={ location }>
          <Route
            path="/"
            element={
              <GuardRoute isAllowed={ isAuth }>
                <Layout/>
              </GuardRoute>
            }
          >
            {routes.map(createRoute)}
          </Route>
          <Route path="sign-in" element={ <SignIn/> }/>
          <Route path="sign-up" element={ <SignUp/> }/>
          <Route path="mobile-version" element={ <MobileVersion/> }/>
        </Routes>
      </AnimatePresence>
      <NotificationContainer/>
    </>
  )
}

export default App

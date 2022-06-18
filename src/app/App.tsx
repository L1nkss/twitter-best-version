import React, { useEffect, useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import {useAppDispatch} from '@app/store';
import { User } from '@features/user/models/User.interface'
import { setUser } from '@features/user/userSlice'
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
import { Popup } from '@shared/ui/popup/popup'
import { isEmptyObject } from '@shared/utils/utils'
import { AnimationPage } from '@widgets/animation-page/ui/animation-page'
import { GuardRoute } from '@widgets/guard-route/ui/guard-route'
import { Layout } from '@widgets/layout/ui/layout'

import { TwitterRoute } from '../models/interfaces/TwitterRoute.interface'

function App() {
  const [showPopup, setShowPopup] = useState<boolean>(true)
  const dispatch = useAppDispatch();
  const isMobile = useCheckIsMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const [isAuth, isLoading] = useAuth()

  useEffect(() => {
    // const userData: User = JSON.parse(localStorage.getItem('userTwitterData') || '{}');
    //
    // if (!isEmptyObject(userData)) {
    //   dispatch(setUser(userData))
    // }
  }, [])

  const createRoute = (route: TwitterRoute) => {
    let routeElement = route.element

    if (route.hocWrapper) {
      routeElement = <route.hocWrapper>{route.element}</route.hocWrapper>
    }

    return <Route key={route.path} path={route.path} element={routeElement} />
  }

  const routes: TwitterRoute[] = [
    { path: 'home', element: <Home />, hocWrapper: AnimationPage },
    { path: 'explore', element: <Explore />, hocWrapper: AnimationPage },
    {
      path: 'notifications',
      element: <Notifications />,
      hocWrapper: AnimationPage,
    },
    { path: 'messages', element: <Messages />, hocWrapper: AnimationPage },
    { path: 'lists', element: <Lists />, hocWrapper: AnimationPage },
    { path: 'bookmarks', element: <Bookmarks />, hocWrapper: AnimationPage },
    { path: '/:id', element: <Profile />, hocWrapper: AnimationPage },
    { path: '/', element: <Navigate to="/home" /> },
  ]

  useEffect(() => {
    const route = isMobile ? '/mobile-version' : '/'
    navigate(route)
  }, [isMobile])

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <GuardRoute isAllowed={isAuth}>
              <Layout />
            </GuardRoute>
          }
        >
          {routes.map(createRoute)}
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="mobile-version" element={<MobileVersion />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App

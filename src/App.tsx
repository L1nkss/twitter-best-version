import React, { ReactNode, useEffect } from 'react'

import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import {
  Bookmarks,
  Explore,
  Home,
  Lists,
  Messages,
  MobileVersion,
  Notifications,
  Profile,
  SignIn,
  SignUp,
} from './pages'

import { useAuth, useCheckIsMobile } from './shared'
import { AnimationPage, GuardRoute, Layout } from './widgets'

interface TwitterRoute {
  path: string
  element: ReactNode
  hocWrapper?: any
}

function App() {
  const isMobile = useCheckIsMobile()
  const navigate = useNavigate()
  const location = useLocation()
  // Вынести в хук
  const [isAuth] = useAuth()

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
    { path: 'profile', element: <Profile />, hocWrapper: AnimationPage },
    { path: '/', element: <Navigate to="/home" /> },
  ]

  useEffect(() => {
    const route = isMobile ? '/mobile-version' : '/'
    navigate(route)
  }, [isMobile])

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

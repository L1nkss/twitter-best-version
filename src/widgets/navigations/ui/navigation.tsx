import React, { FC } from 'react'

import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { userSelector } from '@features/user/userSlice'
import { Button } from '@shared/ui/button/button'
import { Icon } from '@shared/ui/icon/icon'
import { NavigationRoute } from '@widgets/navigations/models/interfaces/NavigationRoute.interface'

import { logout } from '../../../firebase'

const Navigation: FC = () => {
  const user = useSelector(userSelector)
  const navigate = useNavigate()

  const routes: NavigationRoute[] = [
    { id: 'home', label: 'Home', icon: 'home-svg' },
    { id: 'explore', label: 'Explore', icon: 'explore-svg' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications-svg' },
    { id: 'messages', label: 'Messages', icon: 'messages-svg' },
    { id: 'lists', label: 'Lists', icon: 'lists-svg' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'bookmarks-svg' },
    { id: user.nickName, label: 'Profile', icon: 'profile-svg' },
  ]

  const signOut = async () => {
    try {
      await logout()
      navigate('/sign-in')
    } catch (e) {}
  }

  const getRoutes = (): Array<React.ReactElement> => {
    const linkClassName = 'main-navigation__link'

    return routes.map((route) => {
      return (
        <li key={route.id} className="main-navigation__item">
          <NavLink
            className={(navData) =>
              navData.isActive
                ? `${linkClassName} main-navigation__link--active`
                : linkClassName
            }
            to={`/${route.id}`}
          >
            <Icon name={route.icon} />
            {route.label}
          </NavLink>
        </li>
      )
    })
  }
  return (
    <div className="navigation">
      <div className="navigation__wrapper">
        <header className="navigation__header">
          <Icon name="logo-svg" />
        </header>

        <ul className="main-navigation">{getRoutes()}</ul>

        <Button onClick={signOut}>logout</Button>
      </div>
    </div>
  )
}

export { Navigation }

import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { Icon } from '@shared/ui/icon/icon'
import { NavigationRoute } from '@widgets/navigations/models/interfaces/NavigationRoute.interface'

const Navigation: FC = () => {
  const routes: NavigationRoute[] = [
    { id: 'home', label: 'Home', icon: 'home-svg' },
    { id: 'explore', label: 'Explore', icon: 'explore-svg' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications-svg' },
    { id: 'messages', label: 'Messages', icon: 'messages-svg' },
    { id: 'lists', label: 'Lists', icon: 'lists-svg' },
    { id: 'bookmarks', label: 'Bookmarks', icon: 'bookmarks-svg' },
    { id: 'profile', label: 'Profile', icon: 'profile-svg' },
  ]

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
      </div>
    </div>
  )
}

export { Navigation }

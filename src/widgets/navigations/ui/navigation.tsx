import { NavLink } from "react-router-dom";
import React from "react";

// Выглядит херово, наверно переделать todo
import { ReactComponent as HomeSvg } from "../assets/home-svg.svg";
import { ReactComponent as ExploreSvg } from "../assets/explore-svg.svg";
import { ReactComponent as NotificationsSvg } from "../assets/notifications-svg.svg";
import { ReactComponent as MessagesSvg } from "../assets/messages-svg.svg";
import { ReactComponent as BookmarksSvg } from "../assets/bookmarks-svg.svg";
import { ReactComponent as ListsSvg } from "../assets/lists-svg.svg";
import { ReactComponent as ProfileSvg } from "../assets/profile-svg.svg";

const Navigation = () => {
  const routes = [
    { id: "home", label: "Home", icon: HomeSvg },
    { id: "explore", label: "Explore", icon: ExploreSvg },
    { id: "notifications", label: "Notifications", icon: NotificationsSvg },
    { id: "messages", label: "Messages", icon: MessagesSvg },
    { id: "lists", label: "Lists", icon: ListsSvg },
    { id: "bookmarks", label: "Bookmarks", icon: BookmarksSvg },
    { id: "profile", label: "Profile", icon: ProfileSvg },
  ];

  const getRoutes = (): Array<React.ReactElement> => {
    const linkClassName = "main-navigation__link";

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
            {/* Выглядит херово, наверно переделать todo */}
            <route.icon />
            {route.label}
          </NavLink>
        </li>
      );
    });
  };
  return (
    <div className="navigation">
      <header className="navigation__header">{/*  Logo  */}</header>
      <div className="navigation__wrapper">
        <ul className="main-navigation">{getRoutes()}</ul>
      </div>
    </div>
  );
};

export { Navigation };

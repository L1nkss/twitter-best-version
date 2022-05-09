import React, { FC } from "react";
import { Navigate } from "react-router";
import { Outlet } from "react-router-dom";

interface GuardRouteProps {
  isAllowed: boolean;
  children: React.ReactElement;
  redirectUrl?: string;
}

const GuardRoute: FC<GuardRouteProps> = ({
  isAllowed,
  children,
  redirectUrl = "/sign-in",
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectUrl} replace />;
  }

  return children ? children : <Outlet />;
};

export default GuardRoute;

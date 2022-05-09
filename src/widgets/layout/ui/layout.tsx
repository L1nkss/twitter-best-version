import { Outlet } from "react-router-dom";
import React from "react";
import { Navigation } from "../../navigations";

const Layout = () => {
  return (
    <div className="container flex mx-auto">
      <Navigation />
      <main className="main-content flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };

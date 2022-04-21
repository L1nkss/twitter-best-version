import Navigation from "../../navigations/ui/navigation";
import {Outlet} from "react-router-dom";
import React from "react";

const Layout = () => {
    return (
        <div className="container flex mx-auto">
            <Navigation/>
            <main className="grow main-content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
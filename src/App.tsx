import React, {useEffect} from 'react';
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Home from "./pages/home/ui/home";
import Bookmarks from "./pages/bookmarks/ui/bookmarks";
import Explore from "./pages/explore/ui/explore";
import Notifications from "./pages/notifications/ui/notifications";
import Messages from "./pages/messages/ui/messages";
import Lists from "./pages/lists/ui/lists";
import Profile from "./pages/profile/ui/profile";
import MobileVersion from "./pages/mobile-version/ui/mobile-version";
import useCheckIsMobile from "./shared/hooks/useIsDeviceMobile";
import Layout from "./widgets/layout/ui/layout";

function App() {
    const isMobile = useCheckIsMobile();
    const navigate = useNavigate();

    useEffect(() => {
        const route = isMobile ? '/mobile-version' : '/';
        navigate(route);
    }, [isMobile])

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="home" element={<Home/>}/>
                <Route path="explore" element={<Explore/>}/>
                <Route path="notifications" element={<Notifications/>}/>
                <Route path="messages" element={<Messages/>}/>
                <Route path="lists" element={<Lists/>}/>
                <Route path="bookmarks" element={<Bookmarks/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="/" element={<Navigate to="/home"/>}/>
            </Route>
            <Route path="mobile-version" element={<MobileVersion/>}/>
        </Routes>
    );
}

export default App;

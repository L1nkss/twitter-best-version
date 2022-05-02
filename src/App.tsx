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
import AnimationPage from "./widgets/animation-page/ui/animation-page";
import {AnimatePresence} from "framer-motion";
import {useLocation} from "react-router";
import SignIn from "./pages/sign-in/ui/sign-in";
import GuardRoute from "./widgets/guard-route/ui/guard-route";
import useAuth from "./shared/hooks/useAuth";
import SignUp from "./pages/sign-up/ui/sign-up";

function App() {
    const isMobile = useCheckIsMobile();
    const navigate = useNavigate();
    const location = useLocation();
    // Вынести в хук
    const [isAuth] = useAuth();

    useEffect(() => {
        const route = isMobile ? '/mobile-version' : '/';
        navigate(route);
    }, [isMobile])

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
                <Route path="/" element={<GuardRoute isAllowed={isAuth} ><Layout /></GuardRoute>}>
                    <Route path="home" element={<AnimationPage><Home/></AnimationPage>}/>
                    <Route path="explore" element={<AnimationPage><Explore/></AnimationPage>}/>
                    <Route path="notifications" element={<AnimationPage><Notifications/></AnimationPage>}/>
                    <Route path="messages" element={<AnimationPage><Messages/></AnimationPage>}/>
                    <Route path="lists" element={<AnimationPage><Lists/></AnimationPage>}/>
                    <Route path="bookmarks" element={<AnimationPage><Bookmarks/></AnimationPage>}/>
                    <Route path="profile" element={<AnimationPage><Profile/></AnimationPage>}/>
                    <Route path="/" element={<Navigate to="/home"/>}/>
                </Route>
                <Route path="sign-in" element={<SignIn />}/>
                <Route path="sign-up" element={<SignUp />}/>
                <Route path="mobile-version" element={<MobileVersion/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default App;

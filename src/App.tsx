import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
} from "./pages";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";
import { AnimationPage, GuardRoute, Layout } from "./widgets";
import { useAuth, useCheckIsMobile } from "./shared";

function App() {
  const isMobile = useCheckIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  // Вынести в хук
  const [isAuth] = useAuth();

  useEffect(() => {
    const route = isMobile ? "/mobile-version" : "/";
    navigate(route);
  }, [isMobile]);

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
          <Route
            path="home"
            element={
              <AnimationPage>
                <Home />
              </AnimationPage>
            }
          />
          <Route
            path="explore"
            element={
              <AnimationPage>
                <Explore />
              </AnimationPage>
            }
          />
          <Route
            path="notifications"
            element={
              <AnimationPage>
                <Notifications />
              </AnimationPage>
            }
          />
          <Route
            path="messages"
            element={
              <AnimationPage>
                <Messages />
              </AnimationPage>
            }
          />
          <Route
            path="lists"
            element={
              <AnimationPage>
                <Lists />
              </AnimationPage>
            }
          />
          <Route
            path="bookmarks"
            element={
              <AnimationPage>
                <Bookmarks />
              </AnimationPage>
            }
          />
          <Route
            path="profile"
            element={
              <AnimationPage>
                <Profile />
              </AnimationPage>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="mobile-version" element={<MobileVersion />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

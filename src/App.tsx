import React from 'react';
import Navigation from "./widgets/navigations/ui/navigation";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/ui/home";
import Bookmarks from "./pages/bookmarks/ui/bookmarks";
import Explore from "./pages/explore/ui/explore";
import Notifications from "./pages/notifications/ui/notifications";
import Messages from "./pages/messages/ui/messages";
import Lists from "./pages/lists/ui/lists";
import Profile from "./pages/profile/ui/profile";

function App() {
  return (
    <div className="container flex mx-auto">
        <Navigation />
        <main className="grow main-content">
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="messages" element={<Messages />} />
                <Route path="lists" element={<Lists />} />
                <Route path="bookmarks" element={<Bookmarks />} />
                <Route path="profile" element={<Profile />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </main>
    </div>
  );
}

export default App;

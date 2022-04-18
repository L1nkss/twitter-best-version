import React from 'react';
import Navigation from "./widgets/navigations/ui/navigation";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/home/ui/home";
import Bookmarks from "./pages/bookmarks/ui/bookmarks";

function App() {
  return (
    <div className="container flex mx-auto">
        <Navigation />
        <main className="grow main-content">
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="bookmarks" element={<Bookmarks />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </main>
    </div>
  );
}

export default App;

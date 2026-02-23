import React from "react";
import { Outlet } from "react-router-dom";
import HomeContactIcons from "./HomeContactIcons";
import HeaderLatest from "./HeaderLatest";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop"; // ✅ import

function Layout() {
  return (
    <div className="wrapper">
      <ScrollToTop /> {/* ✅ scroll fix */}

      <HeaderLatest />

      <main className="content">
        <Outlet />
      </main>

      <HomeContactIcons />
      <Footer />
    </div>
  );
}

export default Layout;
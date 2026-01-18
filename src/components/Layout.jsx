import React from "react";
import { Outlet, Link } from "react-router-dom";
import HomeContactIcons from "./HomeContactIcons";
import Header from "./Header";

function Layout() {
  return (
    <div className="wrapper"> 

      <Header />

      {/* Main content */}
      <main className="content">
        <Outlet /> 
      </main>
 
      <HomeContactIcons />

      {/* Footer */}
      <footer>footer</footer>
    </div>
  );
}

export default Layout;

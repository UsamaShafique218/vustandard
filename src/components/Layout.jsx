import React from "react";
import { Outlet, Link } from "react-router-dom";
import HomeContactIcons from "./HomeContactIcons";

function Layout() {
  return (
    <div className="wrapper"> 

      <header className="header">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/support">Support</Link>
        </nav>
      </header>

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

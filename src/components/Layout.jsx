import React from "react";
import { Outlet, Link } from "react-router-dom";
import HomeContactIcons from "./HomeContactIcons";
// import Header from "./Header";
import HeaderLatest from "./HeaderLatest";

function Layout() {
  return (
    <div className="wrapper"> 

      {/* <Header /> */}
      <HeaderLatest />
 
      <main className="content">
        <Outlet /> 
      </main>
  
      <HomeContactIcons /> 
      <footer>footer</footer>
    </div>
  );
}

export default Layout;

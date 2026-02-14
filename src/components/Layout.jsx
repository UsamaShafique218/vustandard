import React from "react";
import { Outlet, Link } from "react-router-dom";
import HomeContactIcons from "./HomeContactIcons";
// import Header from "./Header";
import HeaderLatest from "./HeaderLatest";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="wrapper"> 

      {/* <Header /> */}
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

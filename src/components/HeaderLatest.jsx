import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import TopNavMob from "./TopNavMob";
import MobileFooter from "./MobileFooter";
import logo from "../assets/images/logo.png";

function HeaderLatest() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const headerRef = useRef(null);
  const topNavRef = useRef(null);
  const location = useLocation();

  /* ================= ROUTE BASED ACTIVE CHECK ================= */

  const downloadRoutes = ["/finalterm-files", "/faqs"];
  const quizRoutes = ["/solved-mcqs"];
  const helpRoutes = ["/about-us", "/faqs", "/support", "/contact-us"];

  const isDownloadActive = downloadRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const isQuizActive = quizRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const isHelpActive = helpRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  /* ================= Sticky Header ================= */

  useEffect(() => {
    const handleScroll = () => {
      const navHeight = topNavRef.current?.offsetHeight || 0;
      setSticky(window.scrollY > navHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= Close dropdown outside ================= */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".hasDropdown_li")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= Body class for mobile ================= */

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("openMobileMenu");
    } else {
      document.body.classList.remove("openMobileMenu");
    }

    return () => {
      document.body.classList.remove("openMobileMenu");
    };
  }, [mobileMenuOpen]);

  /* ================= Close menus on route change ================= */

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMenuLinkClick = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const navClass = ({ isActive }) =>
    isActive ? "menuLink active" : "menuLink";

  return (
    <header
      className={`header ${sticky ? "sticky" : ""}`}
      ref={headerRef}
      style={{ paddingBottom: sticky ? headerRef.current?.offsetHeight : 0 }}
    >
      {/* Top Bar */}
      <div className="topNav topNavWeb" ref={topNavRef}>
        <div className="autoContent">
          <div className="topNavInner">
            <AnnouncementBar />
          </div>
        </div>
      </div>

      <TopNavMob />

      {/* Main Header */}
      <div className="header_main">
        <div className="autoContent">
          <div className="header_mainInner">

            {/* Logo */}
            <div className="header_left">
              <NavLink
                to="/"
                end
                className="header_logo"
                onClick={handleMenuLinkClick}
              >
                <img src={logo} alt="Logo" />
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="header_right">
              <div className="header_link">
                <ul>

                  <li>
                    <NavLink to="/" end className={navClass}>
                      Home
                    </NavLink>
                  </li>

                  {/* Download Notes */}
                  <li
                    className={`hasDropdown_li ${
                      activeDropdown === "download" || isDownloadActive
                        ? "open"
                        : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={`menuLink hasDropdown ${
                        isDownloadActive ? "active" : ""
                      }`}
                      onClick={(e) => toggleDropdown(e, "download")}
                    >
                      Download Notes
                    </a>

                    <div className="dropdownMenu">
                      <div className="dropdownMenu_inner">
                        <div className="autoContent">
                          <div className="dropdownMenuList">
                            <ul>
                              <li>
                                <NavLink
                                  to="/finalterm-files"
                                  className={navClass}
                                >
                                  Finalterm Files
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/midterm-files" className={navClass}>
                                  Midterm Files
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div
                        className="dropdownMenu_overlay"
                        onClick={() => setActiveDropdown(null)}
                      />
                    </div>
                  </li>

                  {/* Start Quiz */}
                  <li
                    className={`hasDropdown_li ${
                      activeDropdown === "quiz" || isQuizActive
                        ? "open"
                        : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={`menuLink hasDropdown ${
                        isQuizActive ? "active" : ""
                      }`}
                      onClick={(e) => toggleDropdown(e, "quiz")}
                    >
                      Start Quiz
                    </a>

                    <div className="dropdownMenu">
                      <div className="dropdownMenu_inner">
                        <div className="autoContent">
                          <div className="dropdownMenuList">
                            <ul>
                              <li>
                                <NavLink
                                  to="/solved-mcqs"
                                  className={navClass}
                                >
                                  Solved Mcq's
                                </NavLink>
                              </li> 
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div
                        className="dropdownMenu_overlay"
                        onClick={() => setActiveDropdown(null)}
                      />
                    </div>
                  </li>

                  <li>
                    <NavLink to="/lms-handled" className={navClass}>
                      LMS Handled
                    </NavLink>
                  </li>

                  {/* Help */}
                  <li
                    className={`hasDropdown_li ${
                      activeDropdown === "help" || isHelpActive
                        ? "open"
                        : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={`menuLink hasDropdown ${
                        isHelpActive ? "active" : ""
                      }`}
                      onClick={(e) => toggleDropdown(e, "help")}
                    >
                      Help
                    </a>

                    <div className="dropdownMenu">
                      <div className="dropdownMenu_inner">
                        <div className="autoContent">
                          <div className="dropdownMenuList">
                            <ul>
                              <li>
                                <NavLink to="/about-us" className={navClass}>
                                  About Us
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/faqs" className={navClass}>
                                  FAQs
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/support" className={navClass}>
                                  Support
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="/contact-us" className={navClass}>
                                  Contact Us
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div
                        className="dropdownMenu_overlay"
                        onClick={() => setActiveDropdown(null)}
                      />
                    </div>
                  </li>

                   <li>
                    <NavLink to="/cisco-courses" className={navClass}>
                      Cisco Courses
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/student-results" className={navClass}>
                      Result's
                    </NavLink>
                  </li>

                </ul>
              </div>
            </div>

            {/* Mobile Button */}
            <div
              className={`mob_menuBtn hc_cricle hamburger-lines ${
                mobileMenuOpen ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen((prev) => !prev);
              }}
            >
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>

          </div>
        </div>
      </div>

      <div className="mobileFooter">
        <MobileFooter />
      </div>
    </header>
  );
}

export default HeaderLatest;
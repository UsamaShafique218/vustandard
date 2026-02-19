import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import TopNavMob from "./TopNavMob";
import MobileFooter from "./MobileFooter";

import logo from "../assets/images/logo.png";

function HeaderLatest() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);

  const headerRef = useRef(null);
  const topNavRef = useRef(null);
  const location = useLocation();

  /* Sticky Header */
  useEffect(() => {
    const handleScroll = () => {
      const navHeight = topNavRef.current?.offsetHeight || 0;
      setSticky(window.scrollY > navHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".hasDropdown_li")) {
        setHelpDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* Body class for mobile menu */
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

  /* Close menus on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
    setHelpDropdownOpen(false);
  }, [location.pathname]);

  const handleMenuLinkClick = () => {
    setMobileMenuOpen(false);
    setHelpDropdownOpen(false);
  };

  const toggleHelpDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHelpDropdownOpen((prev) => !prev);
  };

  /* Active class handler */
  const navClass = ({ isActive }) =>
    isActive ? "menuLink active" : "menuLink";

  /* Help active detection */
  const helpRoutes = ["/about-us", "/faqs", "/support", "/contact-us"];
  const isHelpActive = helpRoutes.includes(location.pathname);

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
                    <NavLink
                      to="/"
                      end
                      className={navClass}
                    >
                      Home
                    </NavLink>
                  </li>

                  {/* Help Dropdown */}
                  <li
                    className={`hasDropdown_li ${
                      helpDropdownOpen ? "open" : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={`menuLink hasDropdown ${
                        isHelpActive ? "active" : ""
                      }`}
                      onClick={toggleHelpDropdown}
                    >
                      Help
                    </a>

                    <div className="dropdownMenu">
                      <div className="dropdownMenu_inner">
                        <div className="autoContent">
                          <div className="dropdownMenuList">
                            <ul>
                              <li>
                                <NavLink
                                  to="/about-us"
                                  className={navClass}
                                >
                                  About Us
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/faqs"
                                  className={navClass}
                                >
                                  FAQs
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/support"
                                  className={navClass}
                                >
                                  Support
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/contact-us"
                                  className={navClass}
                                >
                                  Contact Us
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div
                        className="dropdownMenu_overlay"
                        onClick={() => setHelpDropdownOpen(false)}
                      />
                    </div>
                  </li>

                  <li>
                    <NavLink
                      to="/download-notes"
                      className={navClass}
                    >
                      Download Notes
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/solved-mcqs"
                      className={navClass}
                    >
                      Solved Mcq's
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/lms-handled"
                      className={navClass}
                    >
                      LMS Handled
                    </NavLink>
                  </li>

                </ul>
              </div>
            </div>

            {/* Mobile Hamburger */}
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

      {/* Mobile Footer */}
      <div className="mobileFooter">
        <MobileFooter />
      </div>
    </header>
  );
}

export default HeaderLatest;
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import AnnouncementBar from "./AnnouncementBar"; 

function Header() {
  const [openLangDropdown, setOpenLangDropdown] = useState(false);
  const [openCurrDropdown, setOpenCurrDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState("ENG");
  const [selectedCurr, setSelectedCurr] = useState("USD");
  const [openTrackDropdown, setOpenTrackDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const headerRef = useRef();
  const topNavRef = useRef();

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const navHeight = topNavRef.current?.offsetHeight || 0;
      setSticky(window.scrollY > navHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".navDropdown") &&
        !e.target.closest(".customDropdownParent")
      ) {
        setOpenLangDropdown(false);
        setOpenCurrDropdown(false);
        setOpenTrackDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header
      className={`header ${sticky ? "sticky" : ""}`}
      ref={headerRef}
      style={{ paddingBottom: sticky ? headerRef.current?.offsetHeight : 0 }}
    >
      {/* Top Navigation */}
      <div className="topNav" ref={topNavRef}>
        <div className="autoContent">
          <div className="topNavInner"> 
             <AnnouncementBar />
          </div>
        </div>
      </div> 
      <div className="header_main">
        <div className="autoContent">
          <div className="header_mainInner"> 
            <div className="header_left">
              <Link to="/" className="header_logo">
                VuStandard
              </Link>
            </div> 
            <div className="header_right">
                
              <div className="header_link">
                <ul>
                  <li>
                    <Link className="menuLink" to="/">
                      Home
                    </Link>
                  </li> 
                  <li className="hasDropdown_li">
                    <Link className="menuLink hasDropdown" to="#">
                      Help
                    </Link>
                    <div className="dropdownMenu">
                      <div className="dropdownMenu_inner">
                        <div className="autoContent">
                          <div className="dropdownMenuList">
                            <ul>
                              <li>
                                <Link className="menuLink" to="/rides">
                                  About Us
                                </Link>
                              </li>
                              <li>
                                <Link className="menuLink" to="/faqs">
                                  FAQs
                                </Link>
                              </li>
                              <li>
                                <Link className="menuLink" to="/support">
                                  Support
                                </Link>
                              </li>
                              <li>
                                <Link className="menuLink" to="/contact-us">
                                  Contact Us
                                </Link>
                              </li>
                              {/* <li>
                                <Link
                                  className="menuLink"
                                  to="/full-day-chauffeur"
                                >
                                  Terms And Conditions
                                </Link>
                              </li>
                              <li>
                                <Link className="menuLink" to="/courier-service">
                                  Privacy Policy
                                </Link>
                              </li>  */}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="dropdownMenu_overlay"></div>
                    </div>
                  </li> 
                  <li>
                    <Link className="menuLink" to="/download-notes">
                      Download Notes
                    </Link>
                  </li>
                  <li>
                    <Link className="menuLink" to="/">
                      Solved Mcq's
                    </Link>
                  </li>
                  <li className="hasDropdown_li d-none">
                    <Link className="menuLink hasDropdown" to="#">
                      Our Services
                    </Link>
                    <div className="dropdownMenu">
                      <div className="dropdownMenu_inner">
                        <div className="autoContent">
                          <div className="dropdownMenuList">
                            <ul>
                              <li>
                                <Link className="menuLink" to="/rides">
                                  Rides
                                </Link>
                              </li>
                              <li>
                                <Link className="menuLink" to="/airport-ride">
                                  Airport Rides
                                </Link>
                              </li>
                              <li>
                                <Link className="menuLink" to="/city-tour">
                                  City Tour
                                </Link>
                              </li>
                              <li>
                                <Link className="menuLink" to="/car-rentals">
                                  Car Rentals
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="menuLink"
                                  to="/full-day-chauffeur"
                                >
                                  Full Day Chauffeur
                                </Link>
                              </li>
                              <li>
                                <Link className="menuLink" to="/courier-service">
                                  Courier Service
                                </Link>
                              </li>
                              <li>
                                <Link className="menuLink" to="/desert-safari">
                                  Desert Safari
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="dropdownMenu_overlay"></div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Track Booking Dropdown */}
              <div className="header_tracking"> 
                <div className="header_user_info">
                  <Link className="header_login_link" to="/login">
                    Login / Signup
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div
                className={`mob_menuBtn hc_cricle hamburger-lines ${
                  mobileMenuOpen ? "active" : ""
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

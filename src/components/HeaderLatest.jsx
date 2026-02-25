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

  const downloadRoutes = ["/finalterm-files", "/midterm-files"];
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
              <div className="navInfo navInfo_mobile">
                <div className="navInfoMobile_partner">
                  <a className="navOutlineBtn" href="become_partner.html">
                    <i>
                      <svg width="15" height="10" viewBox="0 0 15 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.74562 0L2.5457 0.297357C2.69778 0.368157 2.72423 0.467276 2.70439 0.644274L1.26293 4.75064C1.21003 4.88515 1.09762 4.99135 0.958769 4.96303C0.707505 4.84268 0.370283 4.78604 0.132244 4.6586C0.0528976 4.61612 0.033061 4.54532 0 4.46036V4.35416L1.44146 0.233638C1.48113 0.120359 1.55387 0.0353997 1.66627 0H1.74562Z"
                          fill="white" />
                        <path
                          d="M11.4389 6.68165C11.4389 6.68165 11.4323 6.66041 11.4191 6.64625C10.2487 5.34354 9.19078 3.9134 8.0072 2.61777C7.87496 2.47617 7.72949 2.27085 7.52451 2.38413C6.72443 2.85141 5.91775 3.32576 5.09122 3.72932C4.56886 3.9134 4.2647 3.39656 4.48951 2.90805C4.57547 2.71689 4.90608 2.47617 5.07139 2.33457C5.63342 1.87438 6.24836 1.42126 6.85668 1.03186C7.64353 0.522109 8.19895 0.146872 9.11144 0.656628C9.43543 0.833626 10.0438 1.36462 10.3545 1.4071C10.6256 1.4425 10.8306 1.30798 11.0554 1.17346L12.8936 4.93999C12.6424 5.4639 12.2522 5.93118 11.8489 6.32057C11.7629 6.40553 11.677 6.48341 11.591 6.56129C11.5712 6.58253 11.4455 6.68873 11.4323 6.68165H11.4389Z"
                          fill="white" />
                        <path
                          d="M12.3712 0.0625C12.4506 0.0625 12.5299 0.0978997 12.5894 0.154539C13.2573 1.47849 13.9053 2.83075 14.54 4.17594C14.5533 4.2963 14.5467 4.39542 14.4607 4.4733C14.2491 4.60074 14.0309 4.72818 13.8127 4.84854C13.6077 4.96181 13.4622 5.06801 13.2837 4.82022L11.4191 0.975811C11.353 0.834213 11.3463 0.664294 11.472 0.558095C11.7166 0.423577 11.9547 0.267818 12.1993 0.140379C12.2522 0.11206 12.3117 0.0695799 12.3712 0.0695799V0.0625Z"
                          fill="white" />
                        <path
                          d="M3.39214 0.992561L2.03664 4.79449L3.09459 6.04763C3.09459 6.04763 3.02185 6.10427 2.9954 6.13259C2.96896 6.16091 2.86316 6.29543 2.84994 6.28835C2.70447 6.13967 2.56561 5.98391 2.42675 5.82816C2.22839 5.6016 1.99035 5.33256 1.81182 5.09184C1.6928 4.929 1.67296 4.83697 1.73909 4.63165C2.22178 3.3431 2.64496 2.03331 3.12104 0.744763C3.24005 0.581925 3.47148 0.560685 3.61034 0.702284C3.65001 0.737683 3.66324 0.794323 3.68968 0.829722C3.74258 0.900522 3.97401 1.00672 4.05336 1.02796C4.75425 1.1908 5.4882 0.199608 6.30811 0.256248C6.49326 0.270408 6.76436 0.362447 6.8966 0.504046C6.92966 0.539445 6.92966 0.546525 6.8966 0.574845C6.87015 0.596085 6.64534 0.737683 6.63211 0.737683C6.60566 0.737683 6.48003 0.666884 6.42713 0.652724C5.89816 0.511125 5.30306 1.05628 4.83359 1.2616C4.36413 1.46692 4.00046 1.49524 3.57728 1.1908C3.51116 1.14124 3.40536 1.07752 3.38552 0.985481L3.39214 0.992561Z"
                          fill="white" />
                        <path
                          d="M11.406 7.17904C11.406 7.17904 11.6506 6.9808 11.6771 6.95956C11.6903 6.95248 11.6969 6.93833 11.7167 6.93833C11.7696 7.07284 11.7432 7.2286 11.7035 7.36312C11.558 7.88704 10.9828 8.14191 10.5265 7.88704C10.5133 8.12775 10.4406 8.36139 10.2885 8.55255C10.0637 8.82867 9.72646 8.91363 9.40907 8.78619C9.38262 8.77911 9.27683 8.70831 9.26361 8.72247C9.26361 9.36674 8.66851 9.88358 8.09325 9.56498C8.13953 9.45878 8.22549 9.36674 8.25855 9.25346C8.27178 9.2393 8.3908 9.29594 8.43047 9.29594C8.87349 9.33134 9.09169 8.62335 8.8272 8.29059C8.54949 7.92952 8.24533 7.58968 7.96761 7.23568C7.91472 7.16488 7.78247 7.02328 7.77586 6.94541C7.76264 6.80381 7.88827 6.61973 8.02712 6.73301C8.45031 7.22152 8.84704 7.75252 9.27683 8.23395C9.37601 8.34723 9.48181 8.45343 9.63389 8.48175C10.1364 8.55255 10.3546 7.84456 10.0769 7.46224L8.91316 6.08165C8.8272 5.91173 9.0454 5.6427 9.19087 5.8197C9.62728 6.32945 10.024 6.87461 10.467 7.37728C10.6257 7.55428 10.7447 7.66756 10.996 7.63924C11.1282 7.62508 11.3002 7.48348 11.3597 7.35604C11.3795 7.31356 11.3927 7.22152 11.3993 7.20736L11.406 7.17904Z"
                          fill="white" />
                        <path
                          d="M5.34945 9.1061C5.17753 8.92202 5.14447 8.61758 5.23704 8.38394C5.28994 8.24943 5.37589 8.17155 5.46847 8.07243C5.78585 7.74675 6.1363 7.44939 6.45368 7.11664C7.04217 6.62812 7.56453 7.53435 7.1149 8.04411C6.78429 8.41934 6.34127 8.74502 6.00405 9.12734C5.81891 9.29726 5.52797 9.29725 5.35606 9.1061H5.34945Z"
                          fill="white" />
                        <path
                          d="M5.47494 6.23755C5.91135 6.17383 6.14278 6.6411 6.02376 7.04466C5.98408 7.1721 5.91796 7.25706 5.832 7.3491C5.60719 7.58274 5.32948 7.85177 5.09144 8.07125C4.98564 8.17037 4.89307 8.26241 4.74099 8.27657C4.2583 8.31905 4.05332 7.71725 4.27814 7.32078C4.31781 7.24998 4.38393 7.17918 4.44344 7.12254C4.66826 6.8889 4.94597 6.61986 5.18401 6.40039C5.26335 6.32959 5.36254 6.24463 5.46833 6.23047L5.47494 6.23755Z"
                          fill="white" />
                        <path
                          d="M7.41206 8.25585C7.90136 8.18505 8.12617 8.77268 7.91458 9.18332C7.84846 9.31784 7.45173 9.75679 7.33271 9.86299C6.81035 10.3303 6.21525 9.50899 6.70455 8.9072C6.81035 8.77976 7.14096 8.39745 7.25998 8.31957C7.29965 8.29125 7.36577 8.26293 7.41206 8.25585Z"
                          fill="white" />
                        <path
                          d="M3.63007 6.13838C4.05987 6.07466 4.32435 6.57026 4.17889 6.97382C4.11276 7.15789 3.90779 7.34905 3.74909 7.44817C3.18706 7.79509 2.7242 6.89594 3.22673 6.4145C3.3193 6.32246 3.51105 6.1667 3.63669 6.14546L3.63007 6.13838Z"
                          fill="white" />
                      </svg>
                    </i>
                    Become a Partner </a>
                </div>
              </div>
              <div className="header_link">
                <ul>

                  <li>
                    <NavLink to="/" end className={navClass}>
                      Home
                    </NavLink>
                  </li>

                  {/* Download Notes */}
                  <li
                    className={`hasDropdown_li ${activeDropdown === "download" || isDownloadActive
                      ? "open"
                      : ""
                      }`}
                  >
                    <a
                      href="#"
                      className={`menuLink hasDropdown ${isDownloadActive ? "active" : ""
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
                    className={`hasDropdown_li ${activeDropdown === "quiz" || isQuizActive
                      ? "open"
                      : ""
                      }`}
                  >
                    <a
                      href="#"
                      className={`menuLink hasDropdown ${isQuizActive ? "active" : ""
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
                    className={`hasDropdown_li ${activeDropdown === "help" || isHelpActive
                      ? "open"
                      : ""
                      }`}
                  >
                    <a
                      href="#"
                      className={`menuLink hasDropdown ${isHelpActive ? "active" : ""
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
              className={`mob_menuBtn hc_cricle hamburger-lines ${mobileMenuOpen ? "active" : ""
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
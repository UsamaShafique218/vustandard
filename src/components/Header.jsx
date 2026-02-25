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
                    <Link className="menuLink" to="/finalterm-files">
                      Download Notes
                    </Link>
                  </li>
                  <li>
                    <Link className="menuLink" to="/solved-mcqs">
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



              {/* <!-- mobile footer menu --> */}
            <div className="mobileFooter">
                <div className="mobileFooter_inner">
                    <ul>
                        <li>
                            <a className="active" href="index.html">
                                <i className="hf_svg_stroke">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.87868 3.51458L4.18329 7.95255C3.2323 8.69221 2.46094 10.2666 2.46094 11.4607V19.2905C2.46094 21.7419 4.45802 23.7496 6.90947 23.7496H19.1456C21.597 23.7496 23.5941 21.7419 23.5941 19.3011V11.6086C23.5941 10.33 22.7382 8.69221 21.6921 7.96312L15.162 3.38778C13.6827 2.35226 11.3052 2.40509 9.87868 3.51458Z"
                                            stroke="white" strokeWidth="1.58499" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <path d="M13.0276 19.5234V16.3535" stroke="white" strokeWidth="1.58499"
                                            strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </i>
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="booking_ride_search_mobile.html">
                                <i className="hf_svg_fill">
                                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.63191 2.97168C7.08882 3.10134 6.20706 3.49397 5.26556 4.78828C4.6725 5.60302 4.30131 6.55773 4.04389 7.53822C3.62718 7.4071 3.67483 7.00415 3.15572 7.01667C2.90755 7.02256 1.37442 7.5036 1.10989 7.62809C0.747935 7.799 0.0290121 8.92461 0.0759448 9.32314C0.147055 9.92499 0.892289 9.97435 1.34313 10.0429C1.38295 10.213 1.31184 10.1637 1.25282 10.2108C0.646959 10.6992 0.15701 10.9379 0.0624338 11.8462C0.211054 13.7674 -0.134541 16.0046 0.0624338 17.8875C0.0837669 18.0916 0.191854 18.4326 0.287853 18.6117C0.381718 18.787 0.745091 19.0986 0.762868 19.1509C1.00464 19.875 0.28572 21.4795 1.66952 21.6739C2.3152 21.7645 4.13064 21.7557 4.79197 21.6806C5.13685 21.6415 5.75195 21.3137 5.75195 20.9071V19.4706L10.81 19.464C11.7088 19.3336 11.3654 18.1446 10.8164 18.1446H7.45859C7.80988 17.721 8.13698 17.2702 8.70871 17.1929L9.64665 17.1538C10.1978 16.9748 10.1018 15.9346 9.46674 15.9332C8.70373 15.8838 8.65182 15.8875 8.23725 15.9678C7.13291 16.1829 6.45239 17.5472 5.57204 18.1424C4.38095 18.0223 2.88266 18.3081 1.72997 18.1476C1.61477 18.1314 1.34242 17.9789 1.34242 17.886V16.4496H3.29794C3.80282 16.4496 3.80282 15.1972 3.29794 15.1972H1.34242V11.8455C1.34242 11.6598 3.07537 10.5106 3.33563 10.227C4.23233 9.25169 2.41333 8.86936 1.76908 8.86126C1.74774 8.84579 1.80534 8.76991 1.83947 8.75076C1.93547 8.69551 2.91395 8.40748 2.99786 8.43105C3.31359 8.51945 3.74523 9.61781 4.29348 9.52499C5.64244 9.55151 5.98377 9.60233 7.12011 9.52646C7.64135 9.49184 7.97699 9.00049 7.68188 8.49882C7.63566 8.42 7.45433 8.20637 7.33202 8.199H5.18307C5.55711 6.53858 6.48936 4.44574 8.34889 4.29619L8.73929 4.13192C9.30035 4.00153 9.72487 2.87813 8.63262 2.96947L8.63191 2.97168ZM2.05352 19.4721H4.54237V20.3561H2.05352V19.4721Z"
                                            fill="#fff" />
                                        <path
                                            d="M8.90334 8.63343C8.9012 9.81871 9.10387 11.0033 9.45515 12.1583C9.11524 11.0003 8.90974 9.80766 8.90334 8.63343Z"
                                            fill="#fff" />
                                        <path
                                            d="M4.36536 12.2519C4.17052 12.2379 3.86617 12.1952 3.67204 12.1598C3.3172 12.0965 2.78245 11.8254 2.46103 11.8983C2.05428 11.9896 1.86655 12.5539 2.09339 12.9119C2.24272 13.1477 3.0356 13.3539 3.31933 13.4099C3.99061 13.5425 5.75912 13.6096 6.42257 13.5005C7.03554 13.4003 7.00781 12.4066 6.41191 12.2681C5.88498 12.1458 4.96055 12.2954 4.36536 12.2519Z"
                                            fill="#fff" />
                                        <path
                                            d="M22.0899 3.15328C20.5469 1.35068 18.4854 0.535935 16.4531 0.556561C14.42 0.535198 12.3592 1.34994 10.8162 3.15254C9.43307 4.76803 8.89334 6.67524 8.90472 8.63253C8.91112 9.8075 9.11662 10.9994 9.45653 12.1574C9.8007 13.2889 10.2878 14.3925 10.8645 15.4378C11.7548 17.0518 12.8584 18.5295 13.982 19.7656C14.2102 20.0198 15.5556 21.2029 15.9908 21.4784C15.993 21.4798 15.9951 21.4813 15.9972 21.4828C16.1757 21.5955 16.2995 21.6647 16.436 21.6721C16.4417 21.6721 16.4474 21.6721 16.4523 21.6721C16.458 21.6721 16.4637 21.6721 16.4687 21.6721C16.6052 21.6647 16.729 21.5955 16.9074 21.4828C16.9096 21.4813 16.9117 21.4798 16.9138 21.4784C17.349 21.2029 18.6952 20.0198 18.9227 19.7656C20.0455 18.5288 21.1854 17.0658 22.0757 15.4518C22.171 15.2993 22.2293 15.1969 22.2407 15.174C22.7228 14.2223 23.1402 13.2035 23.4482 12.1567C23.7994 11.0016 24.0021 9.81634 24 8.6318C24.0106 6.67524 23.4716 4.76803 22.0885 3.1518L22.0899 3.15328ZM20.0192 16.2717C19.6658 16.7866 19.2967 17.2676 18.9248 17.7037C18.6262 18.0536 17.1229 19.6257 16.9707 19.7686C16.921 19.8157 16.7339 19.9785 16.5882 20.0912C16.5391 20.148 16.5078 20.187 16.4957 20.2039C16.4879 20.2054 16.473 20.1988 16.4523 20.187C16.4324 20.1988 16.4168 20.2054 16.409 20.2039C16.3976 20.187 16.3656 20.1487 16.3165 20.0912C16.1707 19.9785 15.9844 19.8157 15.9339 19.7686C15.7818 19.6257 14.2785 18.0536 13.9798 17.7037C13.6079 17.2676 13.2389 16.7866 12.8855 16.2717C10.4905 12.7814 8.80018 7.70656 11.6353 4.18828C12.8869 2.63541 14.6668 1.85602 16.4516 1.85381C18.2358 1.85529 20.0164 2.63467 21.2679 4.18828C24.1031 7.70656 22.4128 12.7814 20.0178 16.2717H20.0192Z"
                                            fill="#fff" />
                                        <path
                                            d="M19.5793 7.77355C18.9109 7.8649 19.0616 8.69732 18.9073 9.21666C18.6207 10.1832 17.7646 10.964 16.7811 11.0657C13.5228 11.4009 12.6795 6.57648 16.097 5.78973C16.3964 5.72123 16.636 5.86193 16.9006 5.59084C17.1338 5.35216 17.1544 4.94258 16.9461 4.68696C16.6531 4.326 15.5431 4.57646 15.1406 4.726C12.3325 5.77132 11.7849 9.63877 14.1287 11.5474C16.1589 13.2012 19.3069 12.248 20.0771 9.69181C20.2463 9.13048 20.5258 7.6439 19.5793 7.77355Z"
                                            fill="#fff" />
                                    </svg>
                                </i>
                                <span>Book ride</span>
                            </a>
                        </li> 
                        <li>
                            <a target="_blank"
                                href="https://wa.me/+971585603086?text=Hello! Sending Message from website">
                                <i className="hf_svg_stroke">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.9998 9.00016C16.9998 12.8702 13.6398 16.0002 9.49976 16.0002L8.56976 17.1202L8.01976 17.7802C7.54976 18.3402 6.64975 18.2201 6.33975 17.5501L4.99976 14.6001C3.17976 13.3201 1.99976 11.2902 1.99976 9.00016C1.99976 5.13016 5.35976 2.00016 9.49976 2.00016C12.5198 2.00016 15.1298 3.67016 16.2998 6.07016C16.7498 6.96016 16.9998 7.95016 16.9998 9.00016Z"
                                            stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <path
                                            d="M22.0005 12.8598C22.0005 15.1498 20.8205 17.1799 19.0005 18.4599L17.6606 21.4098C17.3506 22.0798 16.4505 22.2099 15.9805 21.6399L14.5005 19.8598C12.0805 19.8598 9.92056 18.7898 8.57056 17.1198L9.50055 15.9998C13.6405 15.9998 17.0005 12.8698 17.0005 8.99984C17.0005 7.94984 16.7506 6.95984 16.3006 6.06984C19.5706 6.81984 22.0005 9.57982 22.0005 12.8598Z"
                                            stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <path d="M7.00024 9H12.0002" stroke="white" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </i>
                                <span>live chat</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

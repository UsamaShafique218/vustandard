import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import TopNavMob from "./TopNavMob";
import MobileFooter from "./MobileFooter";

import logo from "../assets/images/logo.png"; 


function HeaderLatest() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);

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

    // Close Help dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".hasDropdown_li")) {
                setHelpDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Handle body class for mobile menu
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

    // Close mobile menu on link click
    const handleMenuLinkClick = () => {
        setMobileMenuOpen(false);
        setHelpDropdownOpen(false);
    };

    // Toggle Help dropdown
    const toggleHelpDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setHelpDropdownOpen(prev => !prev);
    };

    return (
        <header
            className={`header ${sticky ? "sticky" : ""}`}
            ref={headerRef}
            style={{ paddingBottom: sticky ? headerRef.current?.offsetHeight : 0 }}
        >
            {/* Top Navigation */}
            <div className="topNav topNavWeb" ref={topNavRef}>
                <div className="autoContent">
                    <div className="topNavInner">
                        <AnnouncementBar />
                    </div>
                </div>
            </div>

            <TopNavMob />

            <div className="header_main">
                <div className="autoContent">
                    <div className="header_mainInner">
                        <div className="header_left">
                            <Link to="/" className="header_logo" onClick={handleMenuLinkClick}>
                                <img src={logo} alt="#" /> 
                            </Link>
                        </div>

                        <div className="header_right">
                            <div className="header_link">
                                <ul>
                                    <li>
                                        <Link className="menuLink" to="/" onClick={handleMenuLinkClick}>
                                            Home
                                        </Link>
                                    </li>

                                    {/* Help Dropdown */}
                                    <li className={`hasDropdown_li ${helpDropdownOpen ? "open" : ""}`}>
                                        <Link
                                            className="menuLink hasDropdown"
                                            to="#"
                                            onClick={toggleHelpDropdown}
                                        >
                                            Help
                                        </Link>

                                        <div className="dropdownMenu">
                                            <div className="dropdownMenu_inner">
                                                <div className="autoContent">
                                                    <div className="dropdownMenuList">
                                                        <ul>
                                                            <li>
                                                                <Link className="menuLink" to="/rides" onClick={handleMenuLinkClick}>
                                                                    About Us
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link className="menuLink" to="/faqs" onClick={handleMenuLinkClick}>
                                                                    FAQs
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link className="menuLink" to="/support" onClick={handleMenuLinkClick}>
                                                                    Support
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link className="menuLink" to="/contact-us" onClick={handleMenuLinkClick}>
                                                                    Contact Us
                                                                </Link>
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
                                        <Link className="menuLink" to="/download-notes" onClick={handleMenuLinkClick}>
                                            Download Notes
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="menuLink" to="/solved-mcqs" onClick={handleMenuLinkClick}>
                                            Solved Mcq's
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hamburger */}
                <div
                    className={`mob_menuBtn hc_cricle hamburger-lines ${mobileMenuOpen ? "active" : ""}`}
                    onClick={() => setMobileMenuOpen(prev => !prev)}
                >
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
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

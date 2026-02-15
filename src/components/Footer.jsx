import React from "react";
import logo from "../assets/images/logo.png"; 

function Footer() {
  return (
    <footer className="footer">
      <div className="autoContent">

        <div className="footer_top">

          {/* About Section */}
          <div className="footer_about">
            <div className="footer_logo">
              <a href="/">Vu Standard</a> 
              
            </div>

            <p className="footer_text">
              VU Standard is committed to delivering quality education,
              empowering students with knowledge, skills, and innovation
              for a brighter future.
            </p>

            <a href="tel:+923150250218" className="footer_phone">
              +92 315 0250218
            </a>

            <div className="footer_social">
              <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          {/* Links Section */}
          <div className="footer_links">

            <div className="footer_col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li> 
                <li><a href="#">Results</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Reviews</a></li>
              </ul>
            </div>

            <div className="footer_col">
              <h4>Admissions</h4>
              <ul>
                <li><a href="#">Apply Online</a></li>
                <li><a href="#">Fee Structure</a></li>
                <li><a href="#">Scholarships</a></li>
                <li><a href="#">Entry Test</a></li>
              </ul>
            </div>

            <div className="footer_col">
              <h4>Campus Life</h4>
              <ul>
                <li><a href="#">Student Portal</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">Clubs & Societies</a></li>
                <li><a href="#">Library</a></li>
              </ul>
            </div>

            <div className="footer_col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer_bottom">
          <p>© {new Date().getFullYear()} VU Standard. All Rights Reserved.</p>

          <div className="footer_bottom_links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
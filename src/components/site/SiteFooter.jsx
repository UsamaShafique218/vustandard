import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Users, Megaphone } from "lucide-react";
import { useSite } from "../../lib/site";
import { whatsappLink } from "../../data/site";
import { Brand } from "./SiteHeader";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "./BrandIcons";

export default function SiteFooter() {
  const { settings: s } = useSite();
  const socials = [
    { href: whatsappLink(s.whatsappNumber), label: "WhatsApp", Icon: WhatsAppIcon },
    { href: s.youtube, label: "YouTube", Icon: YouTubeIcon },
    { href: s.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: s.instagram, label: "Instagram", Icon: InstagramIcon },
  ].filter((x) => x.href);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Brand />
            <p>
              VU Standard is committed to delivering quality education support to Virtual University students:
              LMS handling, assignments, quizzes, GDBs, final projects and free study resources.
            </p>
            <div className="socials">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5>Study resources</h5>
            <ul className="footer-links">
              <li><Link to="/quizzes">Practice quizzes</Link></li>
              <li><Link to="/solutions">Assignment solutions</Link></li>
              <li><Link to="/notes?term=midterm">Midterm notes</Link></li>
              <li><Link to="/notes?term=final">Final term notes</Link></li>
              <li><Link to="/subjects">All VU subjects</Link></li>
              <li><Link to="/projects">CS519 / CS619 projects</Link></li>
            </ul>
          </div>

          <div>
            <h5>VU Standard</h5>
            <ul className="footer-links">
              <li><Link to="/about-us">About us</Link></li>
              <li><Link to="/lms-handled">LMS handled</Link></li>
              <li><Link to="/student-results">Student results</Link></li>
              <li><Link to="/cisco-courses">Cisco courses</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <ul className="footer-contact">
              <li><Phone /><a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></li>
              <li><Mail /><a href={`mailto:${s.email}`}>{s.email}</a></li>
              <li><MapPin /><span>{s.location}</span></li>
              {s.whatsappGroup && (
                <li><Users /><a href={s.whatsappGroup} target="_blank" rel="noreferrer">Join our WhatsApp group</a></li>
              )}
              {s.whatsappChannel && (
                <li><Megaphone /><a href={s.whatsappChannel} target="_blank" rel="noreferrer">Follow our WhatsApp channel</a></li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VU Standard. All rights reserved.</span>
          <span>Not affiliated with the Virtual University of Pakistan.</span>
        </div>
      </div>
    </footer>
  );
}

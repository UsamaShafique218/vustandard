import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown, Menu, X, Moon, Sun, Home, ListChecks, FileText, BookOpen, Clapperboard, Users,
  Award, Info, HelpCircle, LifeBuoy, Mail, GraduationCap, FileCode2,
} from "lucide-react";
import logo from "../../assets/optimized/logo-128.png";
import { useTheme, useWhatsApp } from "../../lib/site";
import { WhatsAppIcon } from "./BrandIcons";

const primary = [
  { to: "/quizzes", label: "Quizzes", icon: ListChecks },
  { to: "/solutions", label: "Solutions", icon: FileCode2 },
  { to: "/notes", label: "Notes", icon: FileText },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/projects", label: "Projects", icon: Clapperboard },
  { to: "/lms-handled", label: "LMS Handled", icon: Users },
];

const more = [
  { to: "/student-results", label: "Student results", hint: "Marks our students received", icon: Award },
  { to: "/about-us", label: "About us", hint: "Who we are and how we work", icon: Info },
  { to: "/faqs", label: "FAQs", hint: "Answers to common questions", icon: HelpCircle },
  { to: "/support", label: "Support", hint: "Get help quickly", icon: LifeBuoy },
  { to: "/cisco-courses", label: "Cisco Courses", hint: "Completed course certificates", icon: GraduationCap },
  { to: "/contact-us", label: "Contact us", hint: "Send us a message", icon: Mail },
];

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="VU Standard home">
      <img src={logo} alt="" width="40" height="40" />
      <span>
        <span className="brand-name">VU <span>Standard</span></span>
        <span className="brand-sub">Virtual University support</span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const wa = useWhatsApp();
  const { pathname } = useLocation();
  const moreRef = useRef(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setMoreOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  useEffect(() => {
    if (!moreOpen) return;
    const close = (e) => {
      if (e.type === "keydown" ? e.key === "Escape" : !moreRef.current?.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [moreOpen]);

  const moreActive = more.some((m) => pathname.startsWith(m.to));

  return (
    <header className="site-header">
      <div className="container header-row">
        <Brand />

        <nav className="main-nav" aria-label="Main">
          {primary.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link">
              {item.label}
            </NavLink>
          ))}
          <div className="nav-more" ref={moreRef} data-open={moreOpen}>
            <button
              type="button"
              className={`nav-link ${moreActive ? "active" : ""}`}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={() => setMoreOpen((o) => !o)}
            >
              More <ChevronDown />
            </button>
            {moreOpen && (
              <div className="nav-menu">
                {more.map(({ to, label, hint, icon: Icon }) => (
                  <NavLink key={to} to={to}>
                    <Icon />
                    <span>
                      {label}
                      <small>{hint}</small>
                    </span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn-wa" href={wa} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> Book on WhatsApp
          </a>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          <div className="mobile-nav-group">
            <h6>Study</h6>
            <NavLink to="/" end className="m-link"><Home /> Home</NavLink>
            {primary.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className="m-link"><Icon /> {label}</NavLink>
            ))}
          </div>
          <div className="mobile-nav-group">
            <h6>VU Standard</h6>
            {more.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className="m-link"><Icon /> {label}</NavLink>
            ))}
          </div>
          <a className="btn btn-wa btn-lg btn-block" href={wa} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> Book on WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

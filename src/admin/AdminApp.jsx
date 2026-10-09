import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  AlertCircle, BookOpen, Clapperboard, ExternalLink, Eye, EyeOff, FileCode2, FileText, Inbox, LayoutDashboard, ListChecks, Star, Trophy, Users,
  LogIn, LogOut, Moon, ServerCrash, Settings, Sun,
} from "lucide-react";
import logo from "../assets/optimized/logo-128.png";
import { api } from "../lib/api";
import { useTheme } from "../lib/site";
import { LmsHandledAdmin, MessagesAdmin, NotesAdmin, Overview, ProjectsAdmin, QuizzesAdmin, SettingsAdmin, SolutionsAdmin, StudentResultsAdmin, StudentReviewsAdmin, SubjectsAdmin } from "./sections";
import "../styles/admin.css";

const nav = [
  { to: "/admin", end: true, label: "Overview", icon: LayoutDashboard, text: "Activity across the site at a glance." },
  { to: "/admin/projects", label: "Projects", icon: Clapperboard, stat: "projects", text: "CS519 and CS619 student project videos shown on the Projects page." },
  { to: "/admin/lms-handled", label: "LMS Handled", icon: Users, stat: "lmsHandled", text: "Student records shown on the LMS Handled page." },
  { to: "/admin/student-results", label: "Student Results", icon: Trophy, stat: "results", text: "Result cards and screenshots shown on the Student Results page." },
  { to: "/admin/student-reviews", label: "Student Reviews", icon: Star, stat: "testimonials", text: "Student testimonials shown on the website." },
  { to: "/admin/solutions", label: "Solutions", icon: FileCode2, stat: "solutions", text: "Assignment solutions with source code, e.g. CS201, CS301 and CS304." },
  { to: "/admin/quizzes", label: "Quizzes", icon: ListChecks, stat: "quizzes", text: "Practice quizzes students attempt and download as PDF." },
  { to: "/admin/notes", label: "Notes", icon: FileText, stat: "notes", text: "Midterm and final term files." },
  { to: "/admin/subjects", label: "Subjects", icon: BookOpen, stat: "subjects", text: "The VU course catalogue, grouped by department." },
  { to: "/admin/messages", label: "Messages", icon: Inbox, stat: "unread", badge: true, text: "Messages sent from the Contact page." },
  { to: "/admin/settings", label: "Settings", icon: Settings, text: "Contact details, links and the advertisement printed on quiz PDFs." },
];

const safeNext = (next) => (next && next.startsWith("/admin") && !next.startsWith("/admin/login") ? next : "/admin");

function AdminBrand() {
  return (
    <Link to="/admin" className="a-brand">
      <img src={logo} alt="" width="34" height="34" />
      <span>VU Standard <small>Admin</small></span>
    </Link>
  );
}

function ThemeButton({ className = "" }) {
  const [theme, toggle] = useTheme();
  return (
    <button type="button" className={`icon-btn ${className}`} onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}

function OfflineScreen({ onRetry }) {
  return (
    <div className="a-login">
      <div className="a-login-card card">
        <span className="a-offline-icon"><ServerCrash /></span>
        <h1>Can't reach the server</h1>
        <p className="muted">The admin panel needs the API. Start MongoDB, then run the server and try again:</p>
        <pre className="a-code">cd server{"\n"}npm run seed   # first time only{"\n"}npm run dev</pre>
        <button type="button" className="btn btn-primary btn-block" onClick={onRetry}>Try again</button>
        <Link to="/" className="btn btn-ghost btn-block">Back to website</Link>
      </div>
    </div>
  );
}

function AdminShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useState({ status: "loading", user: null });
  const [stats, setStats] = useState(null);

  const check = useCallback(() => {
    api("/auth/me")
      .then(({ user }) => setAuth({ status: "ready", user }))
      .catch((err) => {
        if (err.status === 0 || err.status >= 500) setAuth({ status: "offline", user: null });
        else navigate(`/admin/login?next=${encodeURIComponent(location.pathname)}`, { replace: true });
      });
    // Only re-check on mount / retry, not on every navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshStats = useCallback(() => {
    api("/stats").then(setStats).catch(() => {});
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  useEffect(() => {
    if (auth.status === "ready") refreshStats();
  }, [auth.status, refreshStats]);

  const current = [...nav].reverse().find((n) => (n.end ? location.pathname === n.to || location.pathname === `${n.to}/` : location.pathname.startsWith(n.to))) || nav[0];

  useEffect(() => {
    document.title = `${current.label} · VU Standard Admin`;
  }, [current.label]);

  const logout = async () => {
    await api("/auth/logout", { method: "POST" }).catch(() => {});
    navigate("/admin/login", { replace: true });
  };

  if (auth.status === "offline") return <OfflineScreen onRetry={() => { setAuth({ status: "loading", user: null }); check(); }} />;
  if (auth.status === "loading") {
    return (
      <div className="a-loading" role="status">
        <span className="spinner" /> Loading admin panel…
      </div>
    );
  }

  return (
    <div className="a-layout">
      <aside className="a-sidebar">
        <div className="a-sidebar-top">
          <AdminBrand />
          <ThemeButton className="a-theme-mobile" />
        </div>
        <nav className="a-nav" aria-label="Admin">
          {nav.map(({ to, end, label, icon: Icon, stat, badge }) => (
            <NavLink key={to} to={to} end={end} className="a-nav-link">
              <Icon />
              <span>{label}</span>
              {stats && stat && (badge ? stats[stat] > 0 : true) && (
                <span className={`a-nav-count ${badge ? "is-badge" : ""}`}>{stats[stat]}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="a-sidebar-foot">
          <a href="/" target="_blank" rel="noreferrer" className="a-nav-link"><ExternalLink /><span>View website</span></a>
          <div className="a-user">
            <span className="a-avatar" aria-hidden="true">{auth.user.name?.[0] || "A"}</span>
            <span className="a-user-meta">
              <strong>{auth.user.name}</strong>
              <small>{auth.user.email}</small>
            </span>
            <button type="button" className="icon-btn" onClick={logout} aria-label="Log out" title="Log out"><LogOut /></button>
          </div>
        </div>
      </aside>

      <main className="a-main" id="main">
        <header className="a-head">
          <div>
            <h1>{current.label}</h1>
            <p className="muted">{current.text}</p>
          </div>
          <div className="a-head-actions">
            <ThemeButton className="a-theme-desktop" />
            <button type="button" className="btn btn-secondary btn-sm a-logout-mobile" onClick={logout}><LogOut /> Log out</button>
          </div>
        </header>
        <Outlet context={{ user: auth.user, stats, refreshStats }} />
      </main>
    </div>
  );
}

function AdminLogin() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Sign in · VU Standard Admin";
    api("/auth/me").then(() => navigate(next, { replace: true })).catch(() => {});
  }, [navigate, next]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) return setError("Enter your email and password.");
    setBusy(true);
    setError("");
    try {
      await api("/auth/login", { method: "POST", body: { email: form.email.trim(), password: form.password } });
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.status === 0 ? "Can't reach the server. Make sure the API is running (cd server && npm run dev)." : err.message);
      setBusy(false);
    }
  };

  return (
    <div className="a-login">
      <form className="a-login-card card" onSubmit={submit} noValidate>
        <AdminBrand />
        <h1>Sign in</h1>
        <p className="muted">Manage projects, quizzes, notes and site settings.</p>

        {error && <div className="alert alert-danger" role="alert"><AlertCircle /><span>{error}</span></div>}

        <div className="field">
          <label className="label" htmlFor="login-email">Email</label>
          <input id="login-email" className="input" type="email" autoComplete="username" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoFocus />
        </div>
        <div className="field">
          <label className="label" htmlFor="login-password">Password</label>
          <div className="a-password">
            <input id="login-password" className="input" type={show ? "text" : "password"} autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="button" className="icon-btn" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show}>
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={busy}>
          {busy ? <span className="spinner" /> : <LogIn />} {busy ? "Signing in…" : "Sign in"}
        </button>

        {import.meta.env.DEV && (
          <p className="a-dev-hint">
            Demo admin: <code>admin@vustandard.com</code> / <code>Admin@123</code>
          </p>
        )}
        <Link to="/" className="a-back">← Back to website</Link>
      </form>
    </div>
  );
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminShell />}>
        <Route index element={<Overview />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="lms-handled" element={<LmsHandledAdmin />} />
        <Route path="student-results" element={<StudentResultsAdmin />} />
        <Route path="student-reviews" element={<StudentReviewsAdmin />} />
        <Route path="solutions" element={<SolutionsAdmin />} />
        <Route path="quizzes" element={<QuizzesAdmin />} />
        <Route path="notes" element={<NotesAdmin />} />
        <Route path="subjects" element={<SubjectsAdmin />} />
        <Route path="messages" element={<MessagesAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}

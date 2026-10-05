import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider } from './lib/SiteProvider';
import SiteLayout from './components/site/SiteLayout';
import Home from './pages/Home';
import Quizzes from './pages/Quizzes';
import QuizAttempt from './pages/QuizAttempt';
import Notes from './pages/Notes';
import Subjects from './pages/Subjects';
import Projects from './pages/Projects';
import Solutions, { SolutionDetail } from './pages/Solutions';
import LmsHandled from './pages/LmsHandled';
import StudentResults from './pages/StudentResults';
import CiscoCourses from './pages/CiscoCourses';
import AboutUs from './pages/AboutUs';
import Faqs from './pages/Faqs';
import Support from './pages/Support';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

const AdminApp = lazy(() => import('./admin/AdminApp'));

const SITE_URL = 'https://vustandard.vercel.app';

// Per-page title + description: what Google shows in search results for each route.
const seo = {
  '': [
    'VU Standard | Virtual University (VU) Assignments, Quizzes, CS619 & CS519 Projects',
    'Virtual University of Pakistan student help: VU assignment solutions, quiz solutions, GDBs, solved MCQs, midterm & final term files, CS519 and CS619 final year projects, and full LMS handling.',
  ],
  '/quizzes': [
    'VU Quiz Solutions & Solved MCQs | Practice Quizzes | VU Standard',
    'Free Virtual University practice quizzes and solved MCQs for CS, MGT, ENG, MTH and more. Prepare for VU quizzes, midterm and final term papers.',
  ],
  '/solved-mcqs': [
    'VU Solved MCQs | Midterm & Final Term | VU Standard',
    'Solved MCQs for Virtual University subjects, useful for VU quizzes, midterm and final term exam preparation.',
  ],
  '/notes': [
    'VU Midterm & Final Term Notes and Past Papers | VU Standard',
    'Virtual University midterm and final term notes, handouts and past paper files for VU subjects, free to download.',
  ],
  '/midterm-files': [
    'VU Midterm Files, Past Papers & Notes | VU Standard',
    'Download Virtual University midterm files, solved past papers and short notes for every VU subject.',
  ],
  '/finalterm-files': [
    'VU Final Term Files, Past Papers & Notes | VU Standard',
    'Download Virtual University final term files, solved past papers and notes for VU subjects.',
  ],
  '/subjects': [
    'Virtual University Subjects by Department | VU Standard',
    'Full list of Virtual University of Pakistan (VU) subjects by department, with quizzes, notes and assignment help for each.',
  ],
  '/projects': [
    'CS619 & CS519 Final Year Projects | VU Project Help | VU Standard',
    'Virtual University CS619 and CS519 final year projects: project ideas, proposals, SRS, design documents, prototype and complete project help for BSCS and MCS students.',
  ],
  '/solutions': [
    'VU Assignment Solutions & GDB Solutions | VU Standard',
    'Latest Virtual University assignment solutions and GDB solutions for current semester subjects, with step-by-step answers.',
  ],
  '/lms-handled': [
    'VU LMS Handling Service | Assignments, Quizzes & GDBs | VU Standard',
    'Complete Virtual University LMS handling: assignments, quizzes and GDBs submitted on time for the whole semester.',
  ],
  '/student-results': [
    'VU Student Results | VU Standard',
    'Results achieved by Virtual University students who used VU Standard for LMS handling, assignments and quizzes.',
  ],
  '/cisco-courses': [
    'Cisco Courses for VU Students | VU Standard',
    'Cisco networking course help for Virtual University students.',
  ],
  '/about-us': [
    'About VU Standard | Virtual University Student Support',
    'VU Standard helps Virtual University of Pakistan students with assignments, quizzes, GDBs, CS519/CS619 projects and LMS handling.',
  ],
  '/faqs': [
    'VU Information & FAQs | Virtual University Help | VU Standard',
    'Answers to common Virtual University (VU) questions: LMS, assignments, quizzes, GDBs, exams, final year projects and our services.',
  ],
  '/support': [
    'Support | VU Standard',
    'Get support from VU Standard for Virtual University assignments, quizzes, projects and LMS handling.',
  ],
  '/contact-us': [
    'Contact VU Standard | WhatsApp for VU Assignments & Projects',
    'Contact VU Standard on WhatsApp, phone or email for Virtual University assignment solutions, quiz help and CS619/CS519 projects.',
  ],
};

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function DocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    const path = pathname.replace(/\/$/, '');
    const url = SITE_URL + (path || '/');
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    setMeta('property', 'og:url', url);
    // Quiz and solution detail pages set their own title.
    if (pathname.startsWith('/quiz/') || pathname.startsWith('/solutions/')) return;
    const [title, description] = seo[path] || seo[''];
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <DocumentTitle />
        <Routes>
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div className="a-loading" role="status" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', gap: 12 }}><span className="spinner" /> Loading admin panel…</div>}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/solved-mcqs" element={<Quizzes />} />
            <Route path="/quiz/:code" element={<QuizAttempt />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/midterm-files" element={<Notes defaultTerm="midterm" />} />
            <Route path="/finalterm-files" element={<Notes defaultTerm="final" />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:id" element={<SolutionDetail />} />
            <Route path="/lms-handled" element={<LmsHandled />} />
            <Route path="/student-results" element={<StudentResults />} />
            <Route path="/cisco-courses" element={<CiscoCourses />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SiteProvider>
    </BrowserRouter>
  );
}

export default App;

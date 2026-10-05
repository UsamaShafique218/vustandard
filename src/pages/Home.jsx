import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, Clock, FileDown, ListChecks, Timer, Clapperboard, Phone, Plus, Quote, Star,
} from "lucide-react";
import { useSite, useWhatsApp } from "../lib/site";
import { useApiData } from "../lib/api";
import { WhatsAppIcon } from "../components/site/BrandIcons";
import { Initials, Lightbox, YouTubeEmbed } from "../components/site/ui";
import { lmsHandled, results, services, team, testimonials, whyChoose } from "../data/showcase";
import { projectCourses } from "../data/projects";
import quizzes from "../data/quizzes";
import subjects from "../data/subjects";
import faqs from "../data/faqs";
import staticSolutions from "../data/solutions";
import Community from "../components/site/Community";
import { SolutionCard } from "./Solutions";
import chooseImg from "../assets/optimized/choose_sec_img.webp";

const rotating = ["quizzes", "assignments", "GDBs", "final projects"];

function Hero() {
  const wa = useWhatsApp("Hi VU Standard! I'd like to book LMS support for this semester.");
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % rotating.length), 2400);
    return () => clearInterval(t);
  }, []);

  const tasks = [
    ["CS101", "Assignment 1", "Submitted", "success"],
    ["MGT101", "Quiz 2", "10 / 10", "success"],
    ["ENG101", "GDB", "Posted", "success"],
    ["CS201", "Assignment 2", "Due Friday", "warning"],
  ];

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Virtual University of Pakistan · Student support</span>
          <h1>
            Professional VU LMS support for{" "}
            <span className="hero-rotate" key={i}>{rotating[i]}</span>
          </h1>
          <p className="lead">
            Assignments, quizzes, GDBs and full LMS handling for VU students, delivered accurately and before
            the deadline. Plus free practice quizzes, notes and CS519 / CS619 project guidance.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href={wa} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Book on WhatsApp
            </a>
            <Link className="btn btn-secondary btn-lg" to="/quizzes">
              Practice free quizzes <ArrowRight />
            </Link>
          </div>
          <ul className="hero-points">
            <li><CheckCircle2 /> 100% on-time submissions</li>
            <li><CheckCircle2 /> 24/7 WhatsApp support</li>
            <li><CheckCircle2 /> 15% off full LMS handling</li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="tracker card">
            <div className="tracker-head">
              <div>
                <span className="muted">This week on your LMS</span>
                <strong>Fall semester · Week 6</strong>
              </div>
              <span className="badge badge-primary">Handled by VU Standard</span>
            </div>
            <ul className="tracker-list">
              {tasks.map(([code, task, status, tone]) => (
                <li key={code + task}>
                  <span className="tracker-code">{code}</span>
                  <span className="tracker-task">{task}</span>
                  <span className={`badge badge-${tone}`}>
                    {tone === "success" ? <CheckCircle2 /> : <Clock />} {status}
                  </span>
                </li>
              ))}
            </ul>
            <div className="tracker-progress">
              <div><span>Semester activities completed</span><strong>72%</strong></div>
              <div className="bar"><span style={{ width: "72%" }} /></div>
            </div>
          </div>
          <div className="hero-offer">
            <span className="hero-offer-pct">15%</span>
            <span>off full LMS<br />handling</span>
          </div>
        </div>
      </div>

      <div className="container">
        <dl className="stats">
          <div><dt>Happy students</dt><dd>2.5k+</dd></div>
          <div><dt>LMS accounts handled</dt><dd>{lmsHandled.length}</dd></div>
          <div><dt>VU subjects listed</dt><dd>{subjects.length}+</dd></div>
          <div><dt>Free practice quizzes</dt><dd>{quizzes.length}</dd></div>
        </dl>
      </div>
    </section>
  );
}

function Services() {
  const { settings } = useSite();
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Our services</span>
            <h2>Everything your VU semester needs, in one place</h2>
            <p>Tell us your subjects on WhatsApp and we'll take care of the rest, from the first assignment to the final GDB.</p>
          </div>
        </div>
        <div className="services-grid">
          {services.map((s, idx) => (
            <article key={s.key} className={`service card ${idx === 0 ? "service-featured" : idx === services.length - 1 ? "service-wide" : ""}`}>
              <div className="service-img"><img src={s.img} alt="" loading="lazy" /></div>
              <div className="service-body">
                {idx === 0 && <span className="badge badge-accent">15% off this semester</span>}
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a
                  className="service-link"
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Hi VU Standard! I'd like to book: ${s.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book now <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuizCta() {
  const popular = ["CS101", "CS201", "CS304", "MGT101", "ENG101", "PAK301"]
    .map((c) => quizzes.find((q) => q.code === c))
    .filter(Boolean);
  return (
    <section className="section ink-section">
      <div className="container quiz-cta">
        <div>
          <span className="eyebrow">Free practice</span>
          <h2>Attempt a quiz, then download your result as a PDF</h2>
          <p className="lead">
            Timed MCQ practice built from the most repeated VU quiz questions. Your PDF includes every question
            with the correct answer, ready for revision before the exam.
          </p>
          <ol className="steps">
            <li><ListChecks /><div><strong>Pick a subject</strong><span>CS, MGT, MTH, ENG, ECO, STA and more</span></div></li>
            <li><Timer /><div><strong>Attempt against the clock</strong><span>One minute per question, just like the LMS</span></div></li>
            <li><FileDown /><div><strong>Download your PDF</strong><span>Score, answer review and correct options</span></div></li>
          </ol>
          <Link to="/quizzes" className="btn btn-light btn-lg">Browse all quizzes <ArrowRight /></Link>
        </div>
        <ul className="quiz-pick">
          {popular.map((q) => (
            <li key={q.code}>
              <Link to={`/quiz/${q.code}`}>
                <span className="code-tag">{q.code}</span>
                <span className="quiz-pick-title">{q.title}</span>
                <span className="quiz-pick-meta">{q.questions.length} MCQs</span>
                <ArrowRight className="quiz-pick-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SolutionsPreview() {
  const { data } = useApiData("/solutions", staticSolutions);
  const latest = [...(data || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  if (!latest.length) return null;
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Assignment solutions</span>
            <h2>Solved assignments with complete source code</h2>
            <p>CS201, CS301, CS304 and more: study the logic, copy the code or download the file in one click.</p>
          </div>
          <Link to="/solutions" className="btn btn-secondary">All solutions <ArrowRight /></Link>
        </div>
        <div className="quiz-grid">
          {latest.map((s) => <SolutionCard key={s._id} s={s} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  const { data } = useApiData("/projects", []);
  const latest = (data || []).slice(0, 3);
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Final projects</span>
            <h2>CS519 &amp; CS619 projects, guided from proposal to viva</h2>
            <p>Watch demos of projects our students built, then start yours with a team that knows every VU deliverable.</p>
          </div>
          <Link to="/projects" className="btn btn-secondary">View projects <ArrowRight /></Link>
        </div>

        {latest.length > 0 ? (
          <div className="video-grid">
            {latest.map((p) => (
              <article key={p._id} className="video-card card">
                <YouTubeEmbed videoId={p.videoId} title={p.title} />
                <div className="video-body">
                  <span className="badge badge-primary">{p.course}</span>
                  <h3>{p.title}</h3>
                  {p.studentName && <p className="muted">{p.studentName}</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="course-pair">
            {projectCourses.map((c) => (
              <Link key={c.code} to={`/projects?course=${c.code}`} className="course-panel card card-link">
                <div className="course-panel-top">
                  <span className="course-code">{c.code}</span>
                  <Clapperboard />
                </div>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
                <ol className="deliverables">
                  {c.deliverables.map((d) => <li key={d}>{d}</li>)}
                </ol>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function LmsCard({ item }) {
  return (
    <article className="lms-card card">
      <img src={item.image} alt="" loading="lazy" />
      <div>
        <h3>{item.name.toLowerCase()}</h3>
        <p>{item.program}</p>
        <div className="lms-meta">
          <span className="badge">{item.semester}</span>
          <span className={`badge ${item.type.startsWith("Full") ? "badge-primary" : ""}`}>{item.type}</span>
        </div>
      </div>
    </article>
  );
}

function LmsPreview() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Total LMS handled</span>
            <h2>Students who trusted us with their LMS</h2>
            <p>We've handled Virtual University LMS accounts across programs with 100% timely submission and professional support.</p>
          </div>
          <Link to="/lms-handled" className="btn btn-secondary">See all {lmsHandled.length} <ArrowRight /></Link>
        </div>
        <div className="lms-grid">
          {lmsHandled.slice(0, 8).map((item) => <LmsCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section section-alt">
      <div className="container why">
        <div className="why-media">
          <img src={chooseImg} alt="A VU student studying with VU Standard support" loading="lazy" />
        </div>
        <div>
          <span className="eyebrow">Why VU Standard</span>
          <h2>Support you can rely on, every week of the semester</h2>
          <p className="lead">
            Expert educational support for Virtual University students: accurate work, timely submission and a clear
            understanding of concepts, so you save time, reduce stress and get better results.
          </p>
          <ul className="why-list">
            {whyChoose.map((w, i) => (
              <li key={w.title}>
                <span className="why-num">0{i + 1}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ResultsStrip() {
  const [open, setOpen] = useState(null);
  const items = results.slice(0, 4).flatMap((r) => r.gallery.map((src) => ({ src, title: r.title, caption: r.desc })));
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Student results</span>
            <h2>Real marks from real LMS accounts</h2>
            <p>Screenshots of assignment results our students received this year.</p>
          </div>
          <Link to="/student-results" className="btn btn-secondary">All results <ArrowRight /></Link>
        </div>
        <div className="results-grid">
          {results.slice(0, 4).map((r) => {
            const start = items.findIndex((it) => it.src === r.gallery[0]);
            return (
              <button key={r.title} type="button" className="result-tile card" onClick={() => setOpen(start)}>
                <img src={r.gallery[0]} alt={`${r.title} result`} loading="lazy" />
                <span className="result-label"><strong>{r.title}</strong> {r.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}

export function Testimonials({ limit }) {
  const [all, setAll] = useState(false);
  const list = all || !limit ? testimonials : testimonials.slice(0, limit);
  return (
    <>
      <div className="reviews">
        {list.map((r) => (
          <figure key={r.name} className="review card">
            <Quote className="review-quote" />
            <div className="review-stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, i) => <Star key={i} fill="currentColor" />)}
            </div>
            <blockquote>{r.text}</blockquote>
            <figcaption>
              {r.image ? <img src={r.image} alt="" className="avatar" /> : <Initials name={r.name} />}
              <span>
                <strong>{r.name.toLowerCase()}</strong>
                {r.degree && <small>{r.degree}</small>}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      {limit && testimonials.length > limit && (
        <div className="center-row">
          <button type="button" className="btn btn-secondary" onClick={() => setAll((a) => !a)}>
            {all ? "Show fewer reviews" : `Read all ${testimonials.length} reviews`}
          </button>
        </div>
      )}
    </>
  );
}

export function Team() {
  return (
    <div className="team-grid">
      {team.map((m) => (
        <article key={m.name} className="team-card">
          <img src={m.image} alt={m.name} loading="lazy" />
          <h3>{m.name}</h3>
          <span className="team-role">{m.role}</span>
          <p>{m.bio}</p>
        </article>
      ))}
    </div>
  );
}

export function ContactCta() {
  const { settings } = useSite();
  const wa = useWhatsApp();
  return (
    <div className="cta-card">
      <span className="eyebrow">Get started</span>
      <h2>Ready to hand over your LMS?</h2>
      <p>Send your subjects on WhatsApp and get a quote within minutes. 15% off on full LMS handling this semester.</p>
      <div className="cta-actions">
        <a className="btn btn-wa btn-lg" href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp us</a>
        <a className="btn btn-outline-light btn-lg" href={`tel:${settings.phone.replace(/\s/g, "")}`}><Phone /> {settings.phone}</a>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <QuizCta />
      <SolutionsPreview />
      <ProjectsPreview />
      <LmsPreview />
      <WhyChoose />
      <ResultsStrip />

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Student reviews</span>
              <h2>What VU students say about us</h2>
            </div>
          </div>
          <Testimonials limit={6} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our team</span>
              <h2>The people behind VU Standard</h2>
            </div>
          </div>
          <Team />
          <Community />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container faq-cta">
          <div>
            <span className="eyebrow">FAQs</span>
            <h2>Common questions</h2>
            <div className="accordion" style={{ marginTop: 24 }}>
              {faqs.slice(0, 4).map((f) => (
                <details key={f.q}>
                  <summary>{f.q}<Plus /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <Link to="/faqs" className="btn btn-ghost" style={{ marginTop: 16, paddingLeft: 0 }}>
              View all FAQs <ArrowRight />
            </Link>
          </div>
          <ContactCta />
        </div>
      </section>
    </>
  );
}

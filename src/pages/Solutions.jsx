import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  AlertTriangle, ArrowLeft, ArrowRight, Code2, Copy, Download, FileCode2, FileText, ListChecks, SearchX,
} from "lucide-react";
import { useApiData } from "../lib/api";
import { useWhatsApp } from "../lib/site";
import { EmptyState, PageHero, SearchInput } from "../components/site/ui";
import { WhatsAppIcon } from "../components/site/BrandIcons";
import CodeBlock from "../components/site/CodeBlock";
import Community from "../components/site/Community";
import staticSolutions, { languageOf } from "../data/solutions";
import subjects, { departments } from "../data/subjects";

const subjectOf = Object.fromEntries(subjects.map((s) => [s.code, s]));
const deptOf = (code) => subjectOf[code]?.department || code.replace(/\d.*$/, "");
const lineCount = (s) => s.lines ?? s.code?.trimEnd().split("\n").length ?? 0;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);

export function SolutionCard({ s }) {
  return (
    <Link to={`/solutions/${s._id}`} className="quiz-card card card-link">
      <div className="quiz-card-top">
        <span className="code-tag">{s.subject}</span>
        <span className="badge"><Code2 /> {languageOf(s.language).label}</span>
      </div>
      <div className="sol-card-body">
        <h3>{s.title}</h3>
        {subjectOf[s.subject] && <p className="muted">{subjectOf[s.subject].title}</p>}
      </div>
      <div className="quiz-card-foot">
        <span className="muted">{[s.semester, `${lineCount(s)} lines`].filter(Boolean).join(" · ")}</span>
        <span className="quiz-start">View code <ArrowRight size={16} /></span>
      </div>
    </Link>
  );
}

export default function Solutions() {
  const [params, setParams] = useSearchParams();
  const { data, loading } = useApiData("/solutions", staticSolutions);
  const [query, setQuery] = useState(params.get("q") || "");
  const dept = params.get("dept") || "ALL";
  const wa = useWhatsApp("Hi VU Standard! I need the solution of my assignment:");

  const list = useMemo(() => data || [], [data]);
  const deptCounts = useMemo(
    () => list.reduce((acc, s) => ({ ...acc, [deptOf(s.subject)]: (acc[deptOf(s.subject)] || 0) + 1 }), {}),
    [list]
  );
  const q = query.trim().toLowerCase();
  const filtered = list.filter(
    (s) =>
      (dept === "ALL" || deptOf(s.subject) === dept) &&
      `${s.subject} ${s.title} ${subjectOf[s.subject]?.title || ""} ${languageOf(s.language).label}`.toLowerCase().includes(q)
  );
  const setDept = (d) => setParams(d === "ALL" ? {} : { dept: d }, { replace: true });

  return (
    <>
      <PageHero crumb="Assignment solutions" eyebrow="Free assignment help" title="VU assignment solutions with complete code">
        Solved CS201, CS301, CS304 and other Virtual University assignments with clean, commented source code you can
        study, copy and download.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <ul className="how-strip">
            <li><FileCode2 /> <span><strong>Full source code</strong> for every solution</span></li>
            <li><Copy /> <span><strong>Copy or download</strong> in one click</span></li>
            <li><WhatsAppIcon /> <span><strong>Customised solution</strong> on WhatsApp</span></li>
          </ul>

          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter by department">
              <button type="button" className="chip" aria-pressed={dept === "ALL"} onClick={() => setDept("ALL")}>
                All <span className="count">{list.length}</span>
              </button>
              {departments
                .filter((d) => deptCounts[d.code])
                .map((d) => (
                  <button key={d.code} type="button" className="chip" aria-pressed={dept === d.code} onClick={() => setDept(d.code)}>
                    {d.code} <span className="count">{deptCounts[d.code]}</span>
                  </button>
                ))}
            </div>
            <SearchInput value={query} onChange={setQuery} placeholder="Search code or topic, e.g. CS304" label="Search solutions" />
          </div>

          {loading ? (
            <div className="quiz-grid">
              {Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton" style={{ height: 172 }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title={q ? "No solution found" : "Solutions are on the way"}
              actions={<a className="btn btn-wa" href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon /> Request a solution</a>}
            >
              {q ? `We haven't uploaded a solution for “${query}” yet.` : "We're uploading this semester's solutions."} Send
              us your assignment file on WhatsApp and we'll help you with it.
            </EmptyState>
          ) : (
            <div className="quiz-grid">
              {filtered.map((s) => <SolutionCard key={s._id} s={s} />)}
            </div>
          )}

          <Community
            title="Get new solutions on WhatsApp"
            text="New assignment solutions, quiz files and deadline reminders are shared in our group and channel first."
          />
        </div>
      </section>
    </>
  );
}

export function SolutionDetail() {
  const { id = "" } = useParams();
  const fallback = useMemo(() => staticSolutions.find((s) => s._id === id) || null, [id]);
  const { data: s, loading, error } = useApiData(`/solutions/${encodeURIComponent(id)}`, fallback);
  const wa = useWhatsApp(s ? `Hi VU Standard! I need a customised solution for my ${s.subject} assignment: ${s.title}` : undefined);

  useEffect(() => {
    if (s) document.title = `${s.subject} ${s.title} · Assignment solution · VU Standard`;
  }, [s]);

  if (loading) {
    return (
      <div className="container section-sm">
        <div className="skeleton" style={{ height: 120, marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 420 }} />
      </div>
    );
  }

  if (error || !s) {
    return (
      <div className="container section">
        <EmptyState
          icon={SearchX}
          title="Solution not found"
          actions={<Link className="btn btn-primary" to="/solutions"><ArrowLeft /> All solutions</Link>}
        >
          This solution may have been removed or the link is incorrect.
        </EmptyState>
      </div>
    );
  }

  const lang = languageOf(s.language);
  const subject = subjectOf[s.subject];
  const filename = `${s.subject}_${slug(s.title) || "solution"}.${lang.ext}`;

  return (
    <>
      <section className="page-hero sol-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span>
            <Link to="/solutions">Assignment solutions</Link> <span aria-hidden="true">/</span>
            <span>{s.subject}</span>
          </nav>
          <div className="sol-tags">
            <span className="code-tag">{s.subject}</span>
            <span className="badge"><Code2 /> {lang.label}</span>
            {s.semester && <span className="badge badge-primary">{s.semester}</span>}
          </div>
          <h1>{s.title}</h1>
          {subject && <p className="lead">{subject.title}</p>}
        </div>
      </section>

      <section className="section-sm">
        <div className="container sol-layout">
          <div className="sol-main">
            {s.description && (
              <div className="sol-question card">
                <h2>Assignment question</h2>
                <p>{s.description}</p>
              </div>
            )}

            <h2 className="sol-h2">Solution code</h2>
            <CodeBlock code={s.code} language={s.language} label={lang.label} filename={filename} />

            <div className="alert alert-warning sol-note" role="note">
              <AlertTriangle />
              <span>
                Use this solution to understand the logic. Write it in your own words, change variable names and
                use your own VU ID before submitting, because VU checks every assignment for plagiarism.
              </span>
            </div>
          </div>

          <aside className="sol-aside">
            <div className="card sol-help">
              <h2>Need a customised solution?</h2>
              <p>Send us your assignment file and get a unique, plagiarism-free solution before the deadline.</p>
              <a className="btn btn-wa btn-block" href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon /> Get it on WhatsApp</a>
              {s.fileUrl && (
                <a className="btn btn-secondary btn-block" href={s.fileUrl} target="_blank" rel="noreferrer">
                  <Download /> Download solution file
                </a>
              )}
            </div>

            <div className="card sol-more">
              <h2>More for {s.subject}</h2>
              <Link to={`/quiz/${s.subject}`}><ListChecks /> Practice quiz <ArrowRight /></Link>
              <Link to={`/notes?term=midterm`}><FileText /> Midterm and final notes <ArrowRight /></Link>
              <Link to={`/solutions?dept=${deptOf(s.subject)}`}><FileCode2 /> Other {deptOf(s.subject)} solutions <ArrowRight /></Link>
            </div>

            <Community compact title="Join our WhatsApp community" />
          </aside>
        </div>
      </section>
    </>
  );
}

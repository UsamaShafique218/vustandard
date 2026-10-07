import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileDown, ListChecks, SearchX, Timer } from "lucide-react";
import { useApiData } from "../lib/api";
import { PageHero, SearchInput, EmptyState } from "../components/site/ui";
import staticQuizzes from "../data/quizzes";
import subjects, { departments } from "../data/subjects";

const deptOf = Object.fromEntries(subjects.map((s) => [s.code, s.department]));
const fallback = () =>
  staticQuizzes.map((q) => ({ code: q.code, title: q.title, term: q.term || "midterm", department: deptOf[q.code], questionCount: q.questions.length }));

export default function Quizzes() {
  const { data, loading } = useApiData("/quizzes", fallback);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("ALL");
  const [term, setTerm] = useState("midterm");

  const list = useMemo(() => data || [], [data]);
  const termQuizzes = list.filter((q) => (q.term || "midterm") === term);
  const deptCounts = useMemo(
    () => termQuizzes.reduce((acc, q) => ({ ...acc, [q.department]: (acc[q.department] || 0) + 1 }), {}),
    [termQuizzes]
  );
  const filtered = termQuizzes.filter((q) => {
    const text = `${q.code} ${q.title}`.toLowerCase();
    return (dept === "ALL" || q.department === dept) && text.includes(query.trim().toLowerCase());
  });

  return (
    <>
      <PageHero crumb="Quizzes" eyebrow="Free practice quizzes" title="Practice VU quizzes and download your result as a PDF">
        Timed MCQs built from the most repeated Virtual University quiz questions. Finish a quiz to get your score, an
        answer review and a printable PDF.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <ul className="how-strip">
            <li><ListChecks /> <span><strong>Choose a subject</strong> below</span></li>
            <li><Timer /> <span><strong>1 minute</strong> per question</span></li>
            <li><FileDown /> <span><strong>PDF result</strong> with correct answers</span></li>
          </ul>

          <div className="tabs quiz-term-switch" role="tablist" aria-label="Choose quiz term">
            {[["midterm", "Midterm"], ["final", "Final Term"]].map(([value, label]) => (
              <button key={value} type="button" role="tab" className="tab" aria-selected={term === value} onClick={() => { setTerm(value); setDept("ALL"); }}>
                {label} <span className="count">{list.filter((q) => (q.term || "midterm") === value).length}</span>
              </button>
            ))}
          </div>

          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter by department">
              <button type="button" className="chip" aria-pressed={dept === "ALL"} onClick={() => setDept("ALL")}>
                All <span className="count">{termQuizzes.length}</span>
              </button>
              {departments
                .filter((d) => deptCounts[d.code])
                .map((d) => (
                  <button key={d.code} type="button" className="chip" aria-pressed={dept === d.code} onClick={() => setDept(d.code)}>
                    {d.code} <span className="count">{deptCounts[d.code]}</span>
                  </button>
                ))}
            </div>
            <SearchInput value={query} onChange={setQuery} placeholder="Search code or subject, e.g. CS201" label="Search quizzes" />
          </div>

          {loading ? (
            <div className="quiz-grid">
              {Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton" style={{ height: 156 }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={SearchX} title="No quiz found" actions={<button className="btn btn-secondary" onClick={() => { setQuery(""); setDept("ALL"); }}>Clear filters</button>}>
              We don't have a practice quiz for “{query}” yet. Ask us on WhatsApp and we'll add it.
            </EmptyState>
          ) : (
            <div className="quiz-grid">
              {filtered.map((q) => (
                <Link key={`${q.code}-${q.term || "midterm"}`} to={`/quiz/${q.code}?term=${q.term || "midterm"}`} className="quiz-card card card-link">
                  <div className="quiz-card-top">
                    <span className="code-tag">{q.code}</span>
                    <span className="badge">{departments.find((d) => d.code === q.department)?.name || q.department}</span>
                  </div>
                  <h3>{q.title}</h3>
                  <div className="quiz-card-foot">
                    <span className="muted">{q.questionCount} MCQs · {q.questionCount} min</span>
                    <span className="quiz-start">Start <ArrowRight size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

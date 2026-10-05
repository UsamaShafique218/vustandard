import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, ListChecks, SearchX } from "lucide-react";
import { useApiData } from "../lib/api";
import { useWhatsApp } from "../lib/site";
import { PageHero, SearchInput, EmptyState } from "../components/site/ui";
import staticSubjects, { departments } from "../data/subjects";
import staticQuizzes from "../data/quizzes";
import staticNotes from "../data/notes";

export default function Subjects() {
  const { data: subjects, loading } = useApiData("/subjects", staticSubjects);
  const { data: quizzes } = useApiData("/quizzes", () => staticQuizzes.map((q) => ({ code: q.code })));
  const { data: notes } = useApiData("/notes", staticNotes);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("ALL");
  const wa = useWhatsApp("Hi VU Standard! I need help with my subject:");

  const quizSet = useMemo(() => new Set((quizzes || []).map((q) => q.code)), [quizzes]);
  const noteSet = useMemo(() => new Set((notes || []).map((n) => n.subject)), [notes]);
  const list = subjects || [];
  const counts = list.reduce((acc, s) => ({ ...acc, [s.department]: (acc[s.department] || 0) + 1 }), {});
  const q = query.trim().toLowerCase();
  const filtered = list.filter(
    (s) => (dept === "ALL" || s.department === dept) && `${s.code} ${s.title}`.toLowerCase().includes(q)
  );
  const groups = departments
    .map((d) => ({ ...d, items: filtered.filter((s) => s.department === d.code) }))
    .filter((g) => g.items.length);

  return (
    <>
      <PageHero crumb="Subjects" eyebrow="Course catalogue" title="Virtual University subjects by department">
        {list.length || "100"}+ VU courses across Computer Science, Management, Mathematics, English and more. We support
        assignments, quizzes and GDBs for every subject listed here.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter by department">
              <button type="button" className="chip" aria-pressed={dept === "ALL"} onClick={() => setDept("ALL")}>
                All <span className="count">{list.length}</span>
              </button>
              {departments
                .filter((d) => counts[d.code])
                .map((d) => (
                  <button key={d.code} type="button" className="chip" aria-pressed={dept === d.code} onClick={() => setDept(d.code)} title={d.name}>
                    {d.code} <span className="count">{counts[d.code]}</span>
                  </button>
                ))}
            </div>
            <SearchInput value={query} onChange={setQuery} placeholder="Search code or title, e.g. MTH101" label="Search subjects" />
          </div>

          {loading ? (
            <div className="subject-grid">
              {Array.from({ length: 9 }, (_, i) => <div key={i} className="skeleton" style={{ height: 76 }} />)}
            </div>
          ) : groups.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No subject found"
              actions={<a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">Ask on WhatsApp</a>}
            >
              We couldn't find “{query}”. Your subject may still be supported, so send us the course code.
            </EmptyState>
          ) : (
            groups.map((g) => (
              <section key={g.code} className="dept-group" aria-labelledby={`dept-${g.code}`}>
                <div className="dept-head">
                  <h2 id={`dept-${g.code}`}>{g.name}</h2>
                  <span className="muted">{g.items.length} subject{g.items.length > 1 ? "s" : ""}</span>
                </div>
                <div className="subject-grid">
                  {g.items.map((s) => (
                    <article key={s.code} className="subject-card card">
                      <span className="code-tag">{s.code}</span>
                      <div>
                        <h3>{s.title}</h3>
                        {(quizSet.has(s.code) || noteSet.has(s.code)) && (
                          <div className="subject-links">
                            {quizSet.has(s.code) && (
                              <Link to={`/quiz/${s.code}`} className="badge badge-primary"><ListChecks /> Practice quiz</Link>
                            )}
                            {noteSet.has(s.code) && (
                              <Link to="/notes" className="badge badge-success"><FileText /> Notes</Link>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </section>
    </>
  );
}

import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Download, ExternalLink, FileText, SearchX } from "lucide-react";
import { useApiData } from "../lib/api";
import { useWhatsApp } from "../lib/site";
import { PageHero, SearchInput, EmptyState } from "../components/site/ui";
import { WhatsAppIcon } from "../components/site/BrandIcons";
import staticNotes from "../data/notes";

const TERMS = [
  { key: "midterm", label: "Midterm files" },
  { key: "final", label: "Final term files" },
];

export default function Notes({ defaultTerm }) {
  const [params, setParams] = useSearchParams();
  const term = params.get("term") === "final" || (!params.get("term") && defaultTerm === "final") ? "final" : "midterm";
  const [query, setQuery] = useState("");
  const { data, loading } = useApiData("/notes", staticNotes);
  const wa = useWhatsApp("Hi VU Standard! I need notes for my subject:");

  const all = data || [];
  const counts = Object.fromEntries(TERMS.map((t) => [t.key, all.filter((n) => n.term === t.key).length]));
  const q = query.trim().toLowerCase();
  const list = all.filter((n) => n.term === term && `${n.subject} ${n.title} ${n.description}`.toLowerCase().includes(q));

  return (
    <>
      <PageHero crumb="Notes" eyebrow="Study files" title="Midterm and final term notes for VU subjects">
        Solved handouts, past paper MCQs and preparation files, free to open and download.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className="toolbar">
            <div className="tabs" role="tablist" aria-label="Exam term">
              {TERMS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  className="tab"
                  aria-selected={term === t.key}
                  onClick={() => setParams({ term: t.key }, { replace: true })}
                >
                  {t.label} <span className="count">{counts[t.key]}</span>
                </button>
              ))}
            </div>
            <SearchInput value={query} onChange={setQuery} placeholder="Search by subject code, e.g. CS101" label="Search notes" />
          </div>

          {loading ? (
            <div className="notes-grid">
              {[0, 1].map((i) => <div key={i} className="skeleton" style={{ height: 180 }} />)}
            </div>
          ) : list.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title={q ? "No notes match your search" : "No files uploaded yet"}
              actions={<a className="btn btn-wa" href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon /> Request notes</a>}
            >
              Tell us your subject on WhatsApp and we'll share the latest preparation file.
            </EmptyState>
          ) : (
            <div className="notes-grid">
              {list.map((n) => (
                <article key={n._id || `${n.subject}-${n.term}`} className="note-card card">
                  <div className="note-top">
                    <span className="note-icon"><FileText /></span>
                    <div>
                      <span className="code-tag">{n.subject}</span>
                      <h3>{n.title}</h3>
                    </div>
                  </div>
                  {n.description && <p>{n.description}</p>}
                  <div className="note-links">
                    {n.links.map((l, i) => {
                      const isPdf = l.url.toLowerCase().endsWith(".pdf");
                      return (
                        <a
                          key={l.url + l.label}
                          className={`btn btn-sm ${i === 0 ? "btn-primary" : "btn-secondary"}`}
                          href={encodeURI(l.url).replace(/%25/g, "%")}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {isPdf ? <Download /> : <ExternalLink />} {l.label}
                        </a>
                      );
                    })}
                    <Link className="btn btn-sm btn-ghost" to={`/quiz/${n.subject}`}>Practice quiz</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

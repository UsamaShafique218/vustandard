import { useState } from "react";
import { SearchX } from "lucide-react";
import { PageHero, SearchInput, EmptyState } from "../components/site/ui";
import { lmsHandled as fallbackLmsHandled } from "../data/showcase";
import { useApiData } from "../lib/api";
import { ContactCta, LmsCard } from "./Home";

export default function LmsHandled() {
  const { data } = useApiData("/lms-handled", fallbackLmsHandled);
  const lmsHandled = data || fallbackLmsHandled;
  const types = ["All", ...new Set(lmsHandled.map((l) => l.type))];
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = lmsHandled.filter(
    (l) => (type === "All" || l.type === type) && `${l.name} ${l.program}`.toLowerCase().includes(q)
  );

  return (
    <>
      <PageHero crumb="LMS Handled" eyebrow="Total LMS handled" title="VU students who trusted us with their LMS">
        Full and partial LMS handling across BSCS, BSIT, BBA, BS English, Sociology and more, with 100% timely
        submissions.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter by service">
              {types.map((t) => (
                <button key={t} type="button" className="chip" aria-pressed={type === t} onClick={() => setType(t)}>
                  {t}
                  <span className="count">{t === "All" ? lmsHandled.length : lmsHandled.filter((l) => l.type === t).length}</span>
                </button>
              ))}
            </div>
            <SearchInput value={query} onChange={setQuery} placeholder="Search by name or program" label="Search students" />
          </div>

          {list.length === 0 ? (
            <EmptyState icon={SearchX} title="No students match your search">Try a different name or program.</EmptyState>
          ) : (
            <div className="lms-grid">
              {list.map((item) => <LmsCard key={item._id || item.id} item={item} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container"><ContactCta /></div>
      </section>
    </>
  );
}

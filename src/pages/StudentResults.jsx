import { useState } from "react";
import { Images } from "lucide-react";
import { Lightbox, PageHero } from "../components/site/ui";
import { results } from "../data/showcase";
import { Testimonials } from "./Home";

const items = results.flatMap((r) => r.gallery.map((src) => ({ src, title: r.title, caption: r.desc })));

export default function StudentResults() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <PageHero crumb="Results" eyebrow="Academic success" title="Proven results from real student LMS accounts">
        Verified results achieved through our quizzes, assignments, GDB participation and full or partial LMS
        management. Select any result to view it full size.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className="results-grid">
            {results.map((r) => {
              const start = items.findIndex((it) => it.src === r.gallery[0]);
              return (
                <button key={r.title} type="button" className="result-tile card" onClick={() => setOpen(start)}>
                  <img src={r.gallery[0]} alt={`${r.title} result`} loading="lazy" />
                  {r.gallery.length > 1 && (
                    <span className="badge result-count"><Images /> {r.gallery.length}</span>
                  )}
                  <span className="result-label"><strong>{r.title}</strong> {r.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Student reviews</span>
              <h2>What our students say</h2>
            </div>
          </div>
          <Testimonials />
        </div>
      </section>

      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

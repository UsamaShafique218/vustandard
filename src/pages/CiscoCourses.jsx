import { useState } from "react";
import { Lightbox, PageHero } from "../components/site/ui";
import { ciscoCourses } from "../data/showcase";

export default function CiscoCourses() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <PageHero crumb="Cisco Courses" eyebrow="Cisco Networking Academy" title="Completed Cisco course certificates">
        {ciscoCourses.length} Cisco Networking Academy courses completed with our support. Select a certificate to view it
        full size.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className="cert-grid">
            {ciscoCourses.map((c, i) => (
              <button key={c.src} type="button" className="result-tile card" onClick={() => setOpen(i)}>
                <img src={c.src} alt={c.title} loading="lazy" />
                <span className="result-label"><strong>Course {i + 1}</strong> Certificate of completion</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {open !== null && <Lightbox items={ciscoCourses} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

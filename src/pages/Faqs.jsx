import { Plus } from "lucide-react";
import { PageHero } from "../components/site/ui";
import faqs from "../data/faqs";
import { ContactCta } from "./Home";

export default function Faqs() {
  return (
    <>
      <PageHero crumb="FAQs" eyebrow="Help centre" title="Frequently asked questions">
        Everything students usually ask before booking LMS support, quizzes or final project help.
      </PageHero>

      <section className="section-sm">
        <div className="container faq-layout">
          <div className="accordion">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}<Plus /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <ContactCta />
        </div>
      </section>
    </>
  );
}

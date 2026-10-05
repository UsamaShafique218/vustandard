import { Link } from "react-router-dom";
import { ChevronRight, HelpCircle, ListChecks, Mail, Phone } from "lucide-react";
import { useSite, useWhatsApp } from "../lib/site";
import { PageHero } from "../components/site/ui";
import { WhatsAppIcon } from "../components/site/BrandIcons";

export default function Support() {
  const { settings } = useSite();
  const wa = useWhatsApp("Hi VU Standard! I need help with:");

  const rows = [
    { icon: WhatsAppIcon, title: "Chat on WhatsApp", text: "Fastest reply, usually within minutes. Share your subjects and deadlines.", href: wa, external: true },
    { icon: Phone, title: `Call ${settings.phone}`, text: "Talk to us directly about LMS handling or your final project.", href: `tel:${settings.phone.replace(/\s/g, "")}` },
    { icon: HelpCircle, title: "Read the FAQs", text: "Pricing, privacy, timelines and how LMS handling works.", to: "/faqs" },
    { icon: ListChecks, title: "Practice a quiz", text: "Free timed MCQs with a downloadable PDF result.", to: "/quizzes" },
    { icon: Mail, title: "Send a message", text: "Prefer writing? Use the contact form and we'll get back to you.", to: "/contact-us" },
  ];

  return (
    <>
      <PageHero crumb="Support" eyebrow="Support" title="Have a question? We're here to help">
        Pick the quickest way to reach us. We support VU students 24/7 during the semester.
      </PageHero>

      <section className="section-sm">
        <div className="container support-grid">
          {rows.map(({ icon: Icon, title, text, href, to, external }) => {
            const body = (
              <>
                <span className="note-icon"><Icon /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <ChevronRight className="go" />
              </>
            );
            return to ? (
              <Link key={title} to={to} className="support-card card card-link">{body}</Link>
            ) : (
              <a key={title} href={href} className="support-card card card-link" {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
                {body}
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, GraduationCap, HeartHandshake } from "lucide-react";
import { useWhatsApp } from "../lib/site";
import { useApiData } from "../lib/api";
import { PageHero } from "../components/site/ui";
import { WhatsAppIcon } from "../components/site/BrandIcons";
import { lmsHandled } from "../data/showcase";
import subjects from "../data/subjects";
import { ContactCta, Team, Testimonials } from "./Home";

const values = [
  { icon: HeartHandshake, title: "Student-focused support", text: "We prioritise your learning needs, with guidance and assistance that help you succeed academically." },
  { icon: BadgeCheck, title: "Reliability and accuracy", text: "Assignments, quizzes and projects are handled carefully and delivered on time, so you can trust us with your work." },
  { icon: GraduationCap, title: "Expertise and excellence", text: "Technical knowledge combined with teaching experience means high-quality, professional support for every student." },
];

export default function AboutUs() {
  const wa = useWhatsApp();
  const { data: lmsData } = useApiData("/lms-handled", lmsHandled);
  return (
    <>
      <PageHero crumb="About" eyebrow="About us" title="Smart learning and development services for VU students" />

      <section className="section">
        <div className="container about-intro">
          <div>
            <span className="eyebrow">Your educational partner</span>
            <h2>More than academic assistance</h2>
            <p className="lead">
              At VU Standard, we're your trusted educational partner. From quizzes and assignments to full LMS and project
              handling, we ensure accuracy, professionalism and on-time delivery. With a BSCS degree and real-world
              development experience, we provide reliable, high-quality solutions for a smooth, stress-free academic
              experience.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon /> Talk to us</a>
              <Link className="btn btn-secondary btn-lg" to="/lms-handled">See our work <ArrowRight /></Link>
            </div>
          </div>
          <div className="about-stat">
            <strong>2.5k+</strong>
            <p>Happy students. Thank you for trusting us with your semester.</p>
            <dl>
              <div><dt>LMS accounts handled</dt><dd>{(lmsData || lmsHandled).length}+</dd></div>
              <div><dt>Subjects supported</dt><dd>{subjects.length}+</dd></div>
              <div><dt>Support availability</dt><dd>24/7</dd></div>
              <div><dt>On-time submissions</dt><dd>100%</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our values</span>
              <h2>How we support students</h2>
              <p>
                Every task we handle reflects our commitment to accuracy, professionalism and timely delivery, so students
                reach their goals with confidence.
              </p>
            </div>
          </div>
          <div className="values">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title} className="value card">
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
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
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Student reviews</span>
              <h2>What students say</h2>
            </div>
          </div>
          <Testimonials limit={3} />
        </div>
      </section>

      <section className="section-sm">
        <div className="container"><ContactCta /></div>
      </section>
    </>
  );
}

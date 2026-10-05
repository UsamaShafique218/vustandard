import { Link } from "react-router-dom";
import { ArrowLeft, ListChecks } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="big">404</span>
      <h1 style={{ fontSize: "var(--fs-3xl)" }}>This page doesn't exist</h1>
      <p>The link may be broken or the page may have moved. Head back home or try a free practice quiz.</p>
      <div className="hero-actions">
        <Link to="/" className="btn btn-primary"><ArrowLeft /> Back to home</Link>
        <Link to="/quizzes" className="btn btn-secondary"><ListChecks /> Practice quizzes</Link>
      </div>
    </section>
  );
}

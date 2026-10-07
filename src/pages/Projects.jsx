import { useSearchParams } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import { useApiData } from "../lib/api";
import { useWhatsApp } from "../lib/site";
import { PageHero, EmptyState, YouTubeEmbed } from "../components/site/ui";
import { WhatsAppIcon } from "../components/site/BrandIcons";
import staticProjects, { projectCourses } from "../data/projects";

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const course = projectCourses.find((c) => c.code === params.get("course")?.toUpperCase()) || projectCourses[0];
  const { data, loading } = useApiData("/projects", staticProjects);
  const wa = useWhatsApp(`Hi VU Standard! I need help with my ${course.code} project.`);

  const all = data || [];
  const list = all.filter((p) => p.course === course.code);

  return (
    <>
      <PageHero crumb="Projects" eyebrow="CS519 · CS619" title="Final projects built with VU Standard">
        Watch demo videos of real CS519 and CS619 projects, then get guidance for every deliverable, from the proposal to
        the final viva.
      </PageHero>

      <section className="section-sm">
        <div className="container">
          <div className="tabs-row">
            <div className="tabs" role="tablist" aria-label="Project course">
              {projectCourses.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  role="tab"
                  className="tab"
                  aria-selected={c.code === course.code}
                  onClick={() => setParams({ course: c.code }, { replace: true })}
                >
                  {c.code} · {c.title} <span className="count">{all.filter((p) => p.course === c.code).length}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="course-overview card">
            <div>
              <span className="eyebrow">{course.code}</span>
              <h2>{course.title}</h2>
              <p>{course.summary}</p>
              <div className="hero-actions">
                <a className="btn btn-wa" href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon /> Discuss your project</a>
              </div>
            </div>
            <div>
              <h3>What we help you deliver</h3>
              <ol className="deliverables">
                {course.deliverables.map((d) => <li key={d}>{d}</li>)}
              </ol>
            </div>
          </div>

          <div className="section-head" style={{ marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: "var(--fs-2xl)" }}>{course.code} project demos</h2>
            </div>
          </div>

          {loading ? (
            <div className="video-grid">
              {[0, 1, 2].map((i) => <div key={i} className="skeleton" style={{ aspectRatio: "16/12" }} />)}
            </div>
          ) : list.length === 0 ? (
            <EmptyState
              icon={Clapperboard}
              title={`${course.code} demo videos are coming soon`}
              actions={<a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">Ask about {course.code}</a>}
            >
              We're uploading our students' {course.code} project demos. Message us to see examples of previous projects.
            </EmptyState>
          ) : (
            <div className="video-grid">
              {list.map((p) => (
                <article key={p._id} className="video-card card">
                  {p.videoId ? <YouTubeEmbed videoId={p.videoId} title={p.title} /> : <div className="yt"><img src={p.imageUrl} alt={`${p.title} project screenshot`} loading="lazy" /></div>}
                  <div className="video-body">
                    <h3>{p.title}</h3>
                    <div className="video-meta">
                      {p.studentName && <span>{p.studentName}</span>}
                      {p.tech && <span className="badge">{p.tech}</span>}
                    </div>
                    {p.description && <p>{p.description}</p>}
                    {p.projectUrl && <a className="btn btn-secondary btn-sm" href={p.projectUrl} target="_blank" rel="noreferrer">View project</a>}
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

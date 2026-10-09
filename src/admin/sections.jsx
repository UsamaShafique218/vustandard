import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  BookOpen, Clapperboard, FileCode2, FileText, Inbox, ListChecks, Mail, MailOpen, Plus, Save, Trash2, Trophy, Users, X,
} from "lucide-react";
import { api } from "../lib/api";
import { useSite } from "../lib/site";
import { EmptyState } from "../components/site/ui";
import { WhatsAppIcon } from "../components/site/BrandIcons";
import { departments } from "../data/subjects";
import { projectCourses } from "../data/projects";
import { languageOf, solutionLanguages } from "../data/solutions";
import siteDefaults from "../data/site";
import { lmsImageFor } from "../data/showcase";
import { CrudSection, Field, Modal, SectionError } from "./kit";
import { useAdminList } from "./useAdminList";

const dateFmt = (d) => new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const deptName = (code) => departments.find((d) => d.code === code)?.name || code || "—";

/* ---------- Overview ---------- */
export function Overview() {
  const { stats, user } = useOutletContext();
  const cards = [
    { key: "projects", label: "Project videos", icon: Clapperboard, to: "/admin/projects" },
    { key: "lmsHandled", label: "LMS handled", icon: Users, to: "/admin/lms-handled" },
    { key: "solutions", label: "Assignment solutions", icon: FileCode2, to: "/admin/solutions" },
    { key: "quizzes", label: "Quizzes", icon: ListChecks, to: "/admin/quizzes" },
    { key: "notes", label: "Note files", icon: FileText, to: "/admin/notes" },
    { key: "subjects", label: "Subjects", icon: BookOpen, to: "/admin/subjects" },
    { key: "messages", label: "Messages", icon: Inbox, to: "/admin/messages", extra: stats?.unread ? `${stats.unread} unread` : null },
    { key: "attempts", label: "Quiz attempts", icon: Trophy },
  ];

  return (
    <>
      <p className="a-welcome">Welcome back, {user.name?.split(" ")[0] || "admin"}. Here's what's happening on VU Standard.</p>
      <div className="a-stats">
        {cards.map(({ key, label, icon: Icon, to, extra }) => {
          const body = (
            <>
              <span className="a-stat-icon"><Icon /></span>
              <span className="a-stat-label">{label}</span>
              <strong>{stats ? stats[key] : "–"}</strong>
              {extra && <span className="badge badge-primary">{extra}</span>}
            </>
          );
          return to ? (
            <Link key={key} to={to} className="a-stat card card-link">{body}</Link>
          ) : (
            <div key={key} className="a-stat card">{body}</div>
          );
        })}
      </div>

      <h2 className="a-h2">Recent quiz attempts</h2>
      {!stats ? (
        <div className="skeleton" style={{ height: 200 }} />
      ) : stats.recentAttempts.length === 0 ? (
        <EmptyState icon={Trophy} title="No attempts yet">When students finish a practice quiz, their scores show up here.</EmptyState>
      ) : (
        <div className="a-card">
          <table className="a-table">
            <thead><tr><th>Student</th><th>VU ID</th><th>Quiz</th><th>Score</th><th>When</th></tr></thead>
            <tbody>
              {stats.recentAttempts.map((a) => {
                const pct = Math.round((a.score / a.total) * 100);
                return (
                  <tr key={a._id}>
                    <td data-label="Student"><strong>{a.name || "Anonymous"}</strong></td>
                    <td data-label="VU ID">{a.vuId || "—"}</td>
                    <td data-label="Quiz"><span className="code-tag">{a.code}</span></td>
                    <td data-label="Score"><span className={`badge ${pct >= 50 ? "badge-success" : "badge-danger"}`}>{a.score}/{a.total} · {pct}%</span></td>
                    <td data-label="When" className="muted">{dateFmt(a.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ---------- Projects ---------- */
export function ProjectsAdmin() {
  return (
    <CrudSection
      path="/projects"
      singular="Project"
      emptyText="Add a CS519 or CS619 student project with a screenshot."
      searchText={(p) => `${p.title} ${p.studentName} ${p.course} ${p.tech}`}
      itemName={(p) => p.title}
      blank={{ course: "CS519", title: "", imageUrl: "", projectUrl: "", studentName: "", tech: "", description: "", order: 0 }}
      toForm={(p) => ({
        course: p.course, title: p.title, imageUrl: p.imageUrl || "", projectUrl: p.projectUrl || "", studentName: p.studentName || "",
        tech: p.tech || "", description: p.description || "", order: p.order || 0,
      })}
      toPayload={(f) => ({ ...f, order: Number(f.order) || 0 })}
      validate={(f) => (!f.title.trim() ? "Enter a project title." : !f.imageUrl ? "Upload a project screenshot." : f.projectUrl && !/^https?:\/\//i.test(f.projectUrl) ? "Project URL must start with http:// or https://." : null)}
      columns={[
        {
          key: "video", label: "Video", width: 120,
          render: (p) => <img className="a-thumb" src={p.imageUrl || (p.videoId ? `https://i.ytimg.com/vi/${p.videoId}/mqdefault.jpg` : "")} alt="" loading="lazy" />,
        },
        {
          key: "title", label: "Project",
          render: (p) => (
            <div>
              <strong>{p.title}</strong>
              <div className="muted a-sub">{[p.studentName, p.tech].filter(Boolean).join(" · ") || "—"}</div>
            </div>
          ),
        },
        { key: "course", label: "Course", render: (p) => <span className="badge badge-primary">{p.course}</span> },
        { key: "order", label: "Order" },
      ]}
      renderForm={(f, set) => {
        const uploadImage = (file) => {
          if (!file) return;
          if (!file.type.startsWith("image/")) return;
          if (file.size > 4 * 1024 * 1024) return alert("Choose an image smaller than 4 MB.");
          const reader = new FileReader();
          reader.onload = () => set({ imageUrl: reader.result });
          reader.readAsDataURL(file);
        };
        return (
          <>
            <div className="a-form-grid">
              <Field label="Course" id="p-course">
                <select id="p-course" className="select" value={f.course} onChange={(e) => set({ course: e.target.value })}>
                  {projectCourses.map((c) => <option key={c.code} value={c.code}>{c.code} · {c.title}</option>)}
                </select>
              </Field>
              <Field label="Display order" id="p-order" hint="Lower numbers show first.">
                <input id="p-order" className="input" type="number" value={f.order} onChange={(e) => set({ order: e.target.value })} />
              </Field>
            </div>
            <Field label="Project title" id="p-title">
              <input id="p-title" className="input" value={f.title} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Online Pharmacy Management System" />
            </Field>
            <Field label="Project screenshot" id="p-image" hint="Upload a JPG, PNG, or WebP image (up to 4 MB).">
              <input id="p-image" className="input" type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files?.[0])} />
            </Field>
            {f.imageUrl && <img className="a-preview" src={f.imageUrl} alt="Project screenshot preview" />}
            <Field label="Project URL" id="p-url" hint="Optional link to a live demo or source repository." optional>
              <input id="p-url" className="input" type="url" value={f.projectUrl} onChange={(e) => set({ projectUrl: e.target.value })} placeholder="https://…" />
            </Field>
            <div className="a-form-grid">
              <Field label="Student name" id="p-student" optional>
                <input id="p-student" className="input" value={f.studentName} onChange={(e) => set({ studentName: e.target.value })} />
              </Field>
              <Field label="Technology" id="p-tech" optional>
                <input id="p-tech" className="input" value={f.tech} onChange={(e) => set({ tech: e.target.value })} placeholder="e.g. PHP, MySQL" />
              </Field>
            </div>
            <Field label="Short description" id="p-desc" optional>
              <textarea id="p-desc" className="textarea" rows={3} value={f.description} onChange={(e) => set({ description: e.target.value })} />
            </Field>
          </>
        );
      }}
    />
  );
}

/* ---------- LMS handled portfolio ---------- */
const lmsTypes = ["Full LMS Handle", "Assignments + GDBs", "Assignments", "Assignments, Quizzes, GDBs"];

export function LmsHandledAdmin() {
  return (
    <CrudSection
      path="/lms-handled"
      singular="LMS record"
      emptyText="Add a student account handled by VU Standard."
      searchText={(x) => `${x.name} ${x.program} ${x.semester} ${x.type}`}
      itemName={(x) => x.name}
      blank={{ name: "", program: "", semester: "", type: lmsTypes[0], imageKey: "", imageUrl: "", order: 0 }}
      toForm={(x) => ({ name: x.name, program: x.program, semester: x.semester, type: x.type, imageKey: x.imageKey || "", imageUrl: x.imageUrl || "", order: x.order || 0 })}
      toPayload={(f) => ({ ...f, order: Number(f.order) || 0 })}
      validate={(f) => (!f.name.trim() ? "Enter the student's name." : !f.program.trim() ? "Enter the study program." : !f.semester.trim() ? "Enter the semester." : !f.imageUrl && !f.imageKey ? "Upload an image for this student card." : null)}
      columns={[
        { key: "image", label: "Image", width: 90, render: (x) => <img className="a-thumb" src={x.imageUrl || lmsImageFor(x.imageKey)} alt="" /> },
        { key: "name", label: "Student", render: (x) => <><strong>{x.name}</strong><div className="muted a-sub">{x.program}</div></> },
        { key: "semester", label: "Semester" },
        { key: "type", label: "Service", render: (x) => <span className="badge badge-primary">{x.type}</span> },
        { key: "order", label: "Order" },
      ]}
      renderForm={(f, set) => {
        const uploadImage = (file) => {
          if (!file) return;
          if (!file.type.startsWith("image/")) return alert("Choose an image file.");
          if (file.size > 2 * 1024 * 1024) return alert("Choose an image smaller than 2 MB.");
          const reader = new FileReader();
          reader.onload = () => set({ imageUrl: reader.result, imageKey: "" });
          reader.readAsDataURL(file);
        };
        return <>
          <div className="a-form-grid">
            <Field label="Student name" id="lms-name"><input id="lms-name" className="input" value={f.name} onChange={(e) => set({ name: e.target.value })} /></Field>
            <Field label="Study program" id="lms-program"><input id="lms-program" className="input" value={f.program} onChange={(e) => set({ program: e.target.value })} placeholder="BS Computer Science" /></Field>
          </div>
          <div className="a-form-grid">
            <Field label="Semester" id="lms-semester"><input id="lms-semester" className="input" value={f.semester} onChange={(e) => set({ semester: e.target.value })} placeholder="Semester 5" /></Field>
            <Field label="Service type" id="lms-type"><select id="lms-type" className="select" value={lmsTypes.includes(f.type) ? f.type : "custom"} onChange={(e) => set({ type: e.target.value === "custom" ? "" : e.target.value })}><option value="custom">Custom…</option>{lmsTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>{(!lmsTypes.includes(f.type)) && <input className="input" value={f.type} onChange={(e) => set({ type: e.target.value })} placeholder="Enter service type" style={{ marginTop: 8 }} />}</Field>
          </div>
          <div className="a-form-grid">
            <Field label="Card image" id="lms-image" hint="Upload an image up to 2 MB. Existing records keep their original program image unless you upload a replacement."><input id="lms-image" className="input" type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files?.[0])} /></Field>
            <Field label="Display order" id="lms-order"><input id="lms-order" className="input" type="number" value={f.order} onChange={(e) => set({ order: e.target.value })} /></Field>
          </div>
          {f.imageUrl && <img className="a-preview" src={f.imageUrl} alt="Student card preview" />}
        </>;
      }}
    />
  );
}

/* ---------- Assignment solutions ---------- */
// Tab inserts 4 spaces in the code editor instead of moving focus (Esc then Tab still leaves the field).
const codeKeyDown = (e, set) => {
  if (e.key !== "Tab" || e.shiftKey || e.ctrlKey || e.altKey) return;
  e.preventDefault();
  const el = e.target;
  const { selectionStart: a, selectionEnd: b, value } = el;
  const next = `${value.slice(0, a)}    ${value.slice(b)}`;
  set({ code: next });
  requestAnimationFrame(() => el.setSelectionRange(a + 4, a + 4));
};

export function SolutionsAdmin() {
  return (
    <CrudSection
      path="/solutions"
      listPath="/solutions/admin"
      singular="Solution"
      wide
      emptyText="Upload an assignment solution with its source code, e.g. CS201 Assignment 1 in C++."
      searchText={(s) => `${s.subject} ${s.title} ${s.semester} ${s.language}`}
      itemName={(s) => `${s.subject} ${s.title}`}
      blank={{ subject: "", title: "", semester: "", language: "cpp", description: "", code: "", fileUrl: "", published: true }}
      toForm={(s) => ({
        subject: s.subject, title: s.title, semester: s.semester || "", language: s.language || "cpp",
        description: s.description || "", code: s.code, fileUrl: s.fileUrl || "", published: s.published !== false,
      })}
      toPayload={(f) => ({ ...f, subject: f.subject.trim(), title: f.title.trim(), fileUrl: f.fileUrl.trim() })}
      validate={(f) =>
        !f.subject.trim() ? "Enter the subject code."
          : !f.title.trim() ? "Enter a title."
          : !f.code.trim() ? "Paste the solution code."
          : f.fileUrl.trim() && !/^https?:\/\//.test(f.fileUrl.trim()) ? "The file link must start with https://" : null
      }
      columns={[
        { key: "subject", label: "Subject", width: 110, render: (s) => <span className="code-tag">{s.subject}</span> },
        {
          key: "title", label: "Solution",
          render: (s) => (
            <div>
              <strong>{s.title}</strong>
              <div className="muted a-sub">{[s.semester, `${s.code.trimEnd().split("\n").length} lines`].filter(Boolean).join(" · ")}</div>
            </div>
          ),
        },
        { key: "language", label: "Language", render: (s) => <span className="badge">{languageOf(s.language).label}</span> },
        {
          key: "published", label: "Status",
          render: (s) => <span className={`badge ${s.published ? "badge-success" : ""}`}>{s.published ? "Published" : "Draft"}</span>,
        },
      ]}
      renderForm={(f, set) => (
        <>
          <div className="a-form-grid a-form-grid-3">
            <Field label="Subject code" id="sol-subject">
              <input id="sol-subject" className="input" value={f.subject} onChange={(e) => set({ subject: e.target.value.toUpperCase() })} placeholder="CS201" maxLength={12} />
            </Field>
            <Field label="Language" id="sol-lang">
              <select id="sol-lang" className="select" value={f.language} onChange={(e) => set({ language: e.target.value })}>
                {solutionLanguages.map((l) => <option key={l.key} value={l.key}>{l.label}</option>)}
              </select>
            </Field>
            <Field label="Semester" id="sol-sem" optional>
              <input id="sol-sem" className="input" value={f.semester} onChange={(e) => set({ semester: e.target.value })} placeholder="Fall 2026" maxLength={40} />
            </Field>
          </div>
          <Field label="Title" id="sol-title">
            <input id="sol-title" className="input" value={f.title} onChange={(e) => set({ title: e.target.value })} placeholder="Assignment 1 solution: bank account system using classes" maxLength={160} />
          </Field>
          <Field label="Assignment question" id="sol-desc" optional hint="The task statement students should read before the code. Line breaks are kept.">
            <textarea id="sol-desc" className="textarea" rows={4} value={f.description} onChange={(e) => set({ description: e.target.value })} />
          </Field>
          <Field label="Solution code" id="sol-code" hint="Paste the complete program. Tab inserts 4 spaces.">
            <textarea
              id="sol-code"
              className="textarea a-code-input"
              rows={16}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              value={f.code}
              onChange={(e) => set({ code: e.target.value })}
              onKeyDown={(e) => codeKeyDown(e, set)}
              placeholder={"#include <iostream>\nusing namespace std;\n\nint main() {\n    ...\n}"}
            />
          </Field>
          <Field label="Solution file link" id="sol-file" optional hint="Google Drive link to the .cpp, .docx or .zip file, shown as a download button.">
            <input id="sol-file" className="input" value={f.fileUrl} onChange={(e) => set({ fileUrl: e.target.value })} placeholder="https://drive.google.com/…" />
          </Field>
          <label className="checkbox" style={{ marginTop: 16 }}>
            <input type="checkbox" checked={f.published} onChange={(e) => set({ published: e.target.checked })} />
            <span>Published (visible to students)</span>
          </label>
        </>
      )}
    />
  );
}

/* ---------- Subjects ---------- */
export function SubjectsAdmin() {
  return (
    <CrudSection
      path="/subjects"
      singular="Subject"
      emptyText="Run the seed script or add VU subjects one by one."
      searchText={(s) => `${s.code} ${s.title} ${s.department}`}
      itemName={(s) => `${s.code} ${s.title}`}
      blank={{ code: "", title: "", department: "CS" }}
      toForm={(s) => ({ code: s.code, title: s.title, department: s.department })}
      validate={(f) => (!f.code.trim() ? "Enter the course code." : !f.title.trim() ? "Enter the course title." : null)}
      columns={[
        { key: "code", label: "Code", width: 110, render: (s) => <span className="code-tag">{s.code}</span> },
        { key: "title", label: "Title" },
        { key: "department", label: "Department", render: (s) => deptName(s.department) },
      ]}
      renderForm={(f, set) => (
        <>
          <div className="a-form-grid">
            <Field label="Course code" id="s-code">
              <input id="s-code" className="input" value={f.code} onChange={(e) => set({ code: e.target.value.toUpperCase() })} placeholder="CS101" maxLength={12} />
            </Field>
            <Field label="Department" id="s-dept">
              <select id="s-dept" className="select" value={f.department} onChange={(e) => set({ department: e.target.value })}>
                {departments.map((d) => <option key={d.code} value={d.code}>{d.code} · {d.name}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Course title" id="s-title">
            <input id="s-title" className="input" value={f.title} onChange={(e) => set({ title: e.target.value })} placeholder="Introduction to Computing" />
          </Field>
        </>
      )}
    />
  );
}

/* ---------- Notes ---------- */
export function NotesAdmin() {
  return (
    <CrudSection
      path="/notes"
      singular="Note"
      emptyText="Add midterm or final term files with Google Drive or PDF links."
      searchText={(n) => `${n.subject} ${n.title} ${n.term}`}
      itemName={(n) => n.title}
      blank={{ subject: "", term: "midterm", title: "", description: "", links: [{ label: "VU Standard File", url: "" }] }}
      toForm={(n) => ({
        subject: n.subject, term: n.term, title: n.title, description: n.description || "",
        links: n.links?.length ? n.links.map((l) => ({ label: l.label, url: l.url })) : [{ label: "", url: "" }],
      })}
      toPayload={(f) => ({ ...f, links: f.links.filter((l) => l.url.trim()).map((l) => ({ label: l.label.trim() || "Open file", url: l.url.trim() })) })}
      validate={(f) =>
        !f.subject.trim() ? "Enter the subject code."
          : !f.title.trim() ? "Enter a title."
          : !f.links.some((l) => l.url.trim()) ? "Add at least one file link."
          : f.links.some((l) => l.url.trim() && !/^(https?:\/\/|\/)/.test(l.url.trim())) ? "Links must start with https:// or /." : null
      }
      columns={[
        { key: "subject", label: "Subject", width: 110, render: (n) => <span className="code-tag">{n.subject}</span> },
        { key: "title", label: "Title", render: (n) => <strong>{n.title}</strong> },
        { key: "term", label: "Term", render: (n) => <span className={`badge ${n.term === "final" ? "badge-accent" : "badge-primary"}`}>{n.term === "final" ? "Final term" : "Midterm"}</span> },
        { key: "links", label: "Files", render: (n) => `${n.links.length} link${n.links.length === 1 ? "" : "s"}` },
      ]}
      renderForm={(f, set) => {
        const setLink = (i, patch) => set((cur) => ({ ...cur, links: cur.links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) }));
        return (
          <>
            <div className="a-form-grid">
              <Field label="Subject code" id="n-subject">
                <input id="n-subject" className="input" value={f.subject} onChange={(e) => set({ subject: e.target.value.toUpperCase() })} placeholder="CS101" maxLength={12} />
              </Field>
              <Field label="Term" id="n-term">
                <select id="n-term" className="select" value={f.term} onChange={(e) => set({ term: e.target.value })}>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final term</option>
                </select>
              </Field>
            </div>
            <Field label="Title" id="n-title">
              <input id="n-title" className="input" value={f.title} onChange={(e) => set({ title: e.target.value })} placeholder="CS101 Midterm Notes" />
            </Field>
            <Field label="Description" id="n-desc" optional>
              <textarea id="n-desc" className="textarea" rows={2} value={f.description} onChange={(e) => set({ description: e.target.value })} />
            </Field>
            <fieldset className="a-repeater">
              <legend className="label">File links</legend>
              {f.links.map((l, i) => (
                <div key={i} className="a-link-row">
                  <input className="input" aria-label={`Link ${i + 1} label`} value={l.label} onChange={(e) => setLink(i, { label: e.target.value })} placeholder="Button label" />
                  <input className="input" aria-label={`Link ${i + 1} URL`} value={l.url} onChange={(e) => setLink(i, { url: e.target.value })} placeholder="https://drive.google.com/…" />
                  <button type="button" className="btn btn-ghost btn-icon" aria-label={`Remove link ${i + 1}`} disabled={f.links.length === 1} onClick={() => set((cur) => ({ ...cur, links: cur.links.filter((_, idx) => idx !== i) }))}>
                    <X />
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => set((cur) => ({ ...cur, links: [...cur.links, { label: "", url: "" }] }))}>
                <Plus /> Add link
              </button>
            </fieldset>
          </>
        );
      }}
    />
  );
}

/* ---------- Quizzes ---------- */
const blankQuestion = () => ({ question: "", options: ["", "", "", ""], answer: 0 });

export function QuizzesAdmin() {
  return (
    <CrudSection
      path="/quizzes"
      listPath="/quizzes/admin"
      singular="Quiz"
      wide
      emptyText="Create a practice quiz with multiple-choice questions."
      searchText={(q) => `${q.code} ${q.title} ${q.department}`}
      itemName={(q) => `${q.code} ${q.title}`}
      blank={{ code: "", title: "", department: "CS", term: "midterm", published: true, questions: [blankQuestion()] }}
      toForm={(q) => ({
        code: q.code, title: q.title, department: q.department || "CS", term: q.term || "midterm", published: q.published !== false,
        questions: q.questions.map((x) => ({ question: x.question, options: [...x.options], answer: x.answer })),
      })}
      toPayload={(f) => ({
        ...f,
        questions: f.questions.map((x) => {
          const kept = x.options.map((o, i) => ({ o: o.trim(), i })).filter((o) => o.o);
          return { question: x.question.trim(), options: kept.map((o) => o.o), answer: kept.findIndex((o) => o.i === x.answer) };
        }),
      })}
      validate={(f) => {
        if (!f.code.trim()) return "Enter the quiz code.";
        if (!f.title.trim()) return "Enter the quiz title.";
        if (!f.questions.length) return "Add at least one question.";
        for (let i = 0; i < f.questions.length; i++) {
          const x = f.questions[i];
          if (!x.question.trim()) return `Question ${i + 1} has no text.`;
          if (x.options.filter((o) => o.trim()).length < 2) return `Question ${i + 1} needs at least 2 options.`;
          if (!x.options[x.answer]?.trim()) return `Mark a correct option for question ${i + 1}.`;
        }
        return null;
      }}
      columns={[
        { key: "code", label: "Code", width: 110, render: (q) => <span className="code-tag">{q.code}</span> },
        { key: "title", label: "Title", render: (q) => <strong>{q.title}</strong> },
        { key: "department", label: "Department", render: (q) => deptName(q.department) },
        { key: "term", label: "Term", render: (q) => <span className={`badge ${q.term === "final" ? "badge-accent" : "badge-primary"}`}>{q.term === "final" ? "Final term" : "Midterm"}</span> },
        { key: "questions", label: "Questions", render: (q) => q.questions.length },
        {
          key: "published", label: "Status",
          render: (q) => <span className={`badge ${q.published ? "badge-success" : ""}`}>{q.published ? "Published" : "Draft"}</span>,
        },
      ]}
      renderForm={(f, set) => {
        const setQ = (qi, patch) =>
          set((cur) => ({ ...cur, questions: cur.questions.map((x, i) => (i === qi ? { ...x, ...(typeof patch === "function" ? patch(x) : patch) } : x)) }));
        return (
          <>
            <div className="a-form-grid a-form-grid-3">
              <Field label="Quiz code" id="q-code">
                <input id="q-code" className="input" value={f.code} onChange={(e) => set({ code: e.target.value.toUpperCase() })} placeholder="CS101" maxLength={12} />
              </Field>
              <Field label="Title" id="q-title">
                <input id="q-title" className="input" value={f.title} onChange={(e) => set({ title: e.target.value })} placeholder="Introduction to Computing" />
              </Field>
              <Field label="Department" id="q-dept">
                <select id="q-dept" className="select" value={f.department} onChange={(e) => set({ department: e.target.value })}>
                  {departments.map((d) => <option key={d.code} value={d.code}>{d.code} · {d.name}</option>)}
                </select>
              </Field>
              <Field label="Term" id="q-term">
                <select id="q-term" className="select" value={f.term} onChange={(e) => set({ term: e.target.value })}>
                  <option value="midterm">Midterm</option>
                  <option value="final">Final term</option>
                </select>
              </Field>
            </div>
            <label className="checkbox" style={{ marginTop: 16 }}>
              <input type="checkbox" checked={f.published} onChange={(e) => set({ published: e.target.checked })} />
              <span>Published (visible to students)</span>
            </label>

            <div className="a-q-head">
              <h3>Questions <span className="muted">({f.questions.length})</span></h3>
              <span className="help">Select the radio button next to the correct option.</span>
            </div>
            <ol className="a-questions">
              {f.questions.map((x, qi) => (
                <li key={qi} className="a-question">
                  <div className="a-question-top">
                    <strong>Question {qi + 1}</strong>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm danger-hover"
                      disabled={f.questions.length === 1}
                      onClick={() => set((cur) => ({ ...cur, questions: cur.questions.filter((_, i) => i !== qi) }))}
                    >
                      <Trash2 /> Remove
                    </button>
                  </div>
                  <textarea className="textarea" rows={2} aria-label={`Question ${qi + 1} text`} value={x.question} onChange={(e) => setQ(qi, { question: e.target.value })} placeholder="Type the question" />
                  <div className="a-options">
                    {x.options.map((o, oi) => (
                      <div key={oi} className={`a-option ${x.answer === oi ? "correct" : ""}`}>
                        <input type="radio" name={`ans-${qi}`} checked={x.answer === oi} onChange={() => setQ(qi, { answer: oi })} aria-label={`Mark option ${String.fromCharCode(65 + oi)} as correct`} />
                        <span className="option-key">{String.fromCharCode(65 + oi)}</span>
                        <input className="input" value={o} aria-label={`Option ${String.fromCharCode(65 + oi)}`} onChange={(e) => setQ(qi, (cur) => ({ options: cur.options.map((v, i) => (i === oi ? e.target.value : v)) }))} placeholder={`Option ${String.fromCharCode(65 + oi)}`} />
                        <button
                          type="button"
                          className="btn btn-ghost btn-icon btn-sm"
                          aria-label={`Remove option ${String.fromCharCode(65 + oi)}`}
                          disabled={x.options.length <= 2}
                          onClick={() => setQ(qi, (cur) => ({
                            options: cur.options.filter((_, i) => i !== oi),
                            answer: cur.answer === oi ? 0 : cur.answer > oi ? cur.answer - 1 : cur.answer,
                          }))}
                        >
                          <X />
                        </button>
                      </div>
                    ))}
                  </div>
                  {x.options.length < 6 && (
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setQ(qi, (cur) => ({ options: [...cur.options, ""] }))}>
                      <Plus /> Add option
                    </button>
                  )}
                </li>
              ))}
            </ol>
            <button type="button" className="btn btn-secondary" onClick={() => set((cur) => ({ ...cur, questions: [...cur.questions, blankQuestion()] }))}>
              <Plus /> Add question
            </button>
          </>
        );
      }}
    />
  );
}

/* ---------- Messages ---------- */
const waNumber = (phone = "") => {
  const d = phone.replace(/\D/g, "");
  if (!d) return null;
  return d.startsWith("0") ? `92${d.slice(1)}` : d;
};

export function MessagesAdmin() {
  const { items, loading, error, reload } = useAdminList("/messages");
  const { toast } = useSite();
  const { refreshStats } = useOutletContext();
  const [filter, setFilter] = useState("all");
  const [busy, setBusy] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const act = async (id, req, done) => {
    setBusy(id);
    try {
      await api(`/messages/${id}`, req);
      if (done) toast(done);
      await reload();
      refreshStats();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setBusy(null);
    }
  };

  const unread = items.filter((m) => !m.read).length;
  const list = filter === "unread" ? items.filter((m) => !m.read) : items;

  return (
    <>
      <div className="a-toolbar">
        <div className="tabs" role="tablist" aria-label="Filter messages">
          <button type="button" role="tab" className="tab" aria-selected={filter === "all"} onClick={() => setFilter("all")}>
            All <span className="count">{items.length}</span>
          </button>
          <button type="button" role="tab" className="tab" aria-selected={filter === "unread"} onClick={() => setFilter("unread")}>
            Unread <span className="count">{unread}</span>
          </button>
        </div>
      </div>

      {error ? (
        <SectionError error={error} onRetry={reload} />
      ) : loading ? (
        <div className="skeleton" style={{ height: 240 }} />
      ) : list.length === 0 ? (
        <EmptyState icon={Inbox} title={filter === "unread" ? "You're all caught up" : "No messages yet"}>
          Messages sent from the Contact page appear here.
        </EmptyState>
      ) : (
        <ul className="a-messages">
          {list.map((m) => {
            const wa = waNumber(m.phone);
            return (
              <li key={m._id} className={`a-message card ${m.read ? "" : "unread"}`}>
                <div className="a-message-head">
                  <div>
                    <strong>{m.name}</strong>
                    {!m.read && <span className="badge badge-primary">New</span>}
                    <div className="muted a-sub">{[m.email, m.phone].filter(Boolean).join(" · ")}</div>
                  </div>
                  <span className="muted a-sub">{dateFmt(m.createdAt)}</span>
                </div>
                {m.subject && <p className="a-message-subject">{m.subject}</p>}
                <p className="a-message-body">{m.message}</p>
                <div className="a-message-actions">
                  {wa && <a className="btn btn-sm btn-wa" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> Reply on WhatsApp</a>}
                  {m.email && <a className="btn btn-sm btn-secondary" href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject || "Your message to VU Standard"}`)}`}><Mail /> Email</a>}
                  <button type="button" className="btn btn-sm btn-ghost" disabled={busy === m._id} onClick={() => act(m._id, { method: "PATCH", body: { read: !m.read } })}>
                    {m.read ? <Mail /> : <MailOpen />} Mark as {m.read ? "unread" : "read"}
                  </button>
                  <button type="button" className="btn btn-sm btn-ghost danger-hover" disabled={busy === m._id} onClick={() => setDeleting(m)}>
                    <Trash2 /> Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {deleting && (
        <Modal
          title="Delete message?"
          onClose={() => setDeleting(null)}
          footer={
            <>
              <button type="button" className="btn btn-secondary" onClick={() => setDeleting(null)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => { act(deleting._id, { method: "DELETE" }, "Message deleted"); setDeleting(null); }}>
                <Trash2 /> Delete
              </button>
            </>
          }
        >
          <p className="muted">The message from {deleting.name} will be permanently deleted.</p>
        </Modal>
      )}
    </>
  );
}

/* ---------- Settings ---------- */
const settingGroups = [
  {
    title: "Brand",
    text: "Shown in the header, footer and on every quiz PDF.",
    fields: [
      ["brandName", "Brand name"],
      ["tagline", "Tagline"],
      ["ownerName", "Owner / contact name"],
    ],
  },
  {
    title: "Contact details",
    text: "Used for WhatsApp buttons, the contact page and the PDF advertisement.",
    fields: [
      ["phone", "Phone (display)", "+92 315 0250218"],
      ["whatsappNumber", "WhatsApp number (digits, with country code)", "923150250218"],
      ["email", "Email"],
      ["location", "Location"],
      ["website", "Website address (printed on quiz PDFs)", "https://vustandard.vercel.app"],
    ],
  },
  {
    title: "Groups, channel and social links",
    text: "Leave a link empty to hide it from the site and the PDF.",
    fields: [
      ["whatsappGroup", "WhatsApp group link", "https://chat.whatsapp.com/…"],
      ["whatsappChannel", "WhatsApp channel link", "https://whatsapp.com/channel/…"],
      ["youtube", "YouTube channel"],
      ["facebook", "Facebook"],
      ["instagram", "Instagram"],
    ],
  },
  {
    title: "Promotion",
    text: "The announcement bar at the top of the site and the message printed on quiz PDFs.",
    fields: [
      ["announcement", "Announcement bar", "", true],
      ["pdfMessage", "PDF advertisement message", "", true],
    ],
  },
];

export function SettingsAdmin() {
  const { setSettings, toast } = useSite();
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("/settings").then(setForm).catch(setError);
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (!/^\d{10,15}$/.test(form.whatsappNumber)) return toast("WhatsApp number must be 10–15 digits, e.g. 923150250218", "error");
    setSaving(true);
    try {
      const saved = await api("/settings", { method: "PUT", body: form });
      setForm(saved);
      setSettings(saved);
      toast("Settings saved");
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (error) return <SectionError error={error} />;
  if (!form) return <div className="skeleton" style={{ height: 400 }} />;

  return (
    <form className="a-settings" onSubmit={save} noValidate>
      {settingGroups.map((g) => (
        <section key={g.title} className="a-card a-settings-group">
          <div>
            <h2>{g.title}</h2>
            <p className="muted">{g.text}</p>
          </div>
          <div>
            {g.fields.map(([key, label, placeholder, multiline]) => (
              <Field key={key} label={label} id={`set-${key}`}>
                {multiline ? (
                  <textarea id={`set-${key}`} className="textarea" rows={3} maxLength={500} value={form[key] ?? ""} placeholder={placeholder || siteDefaults[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                ) : (
                  <input id={`set-${key}`} className="input" maxLength={500} value={form[key] ?? ""} placeholder={placeholder || siteDefaults[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                )}
              </Field>
            ))}
          </div>
        </section>
      ))}
      <div className="a-save-bar">
        <span className="muted">Changes apply to the website and new PDFs immediately.</span>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? <span className="spinner" /> : <Save />} Save settings
        </button>
      </div>
    </form>
  );
}

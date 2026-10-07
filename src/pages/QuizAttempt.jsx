import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Clock, FileDown, ListChecks, RotateCcw, SearchX, Send, Timer, XCircle,
} from "lucide-react";
import { api, useApiData } from "../lib/api";
import { useSite } from "../lib/site";
import { EmptyState } from "../components/site/ui";
import Community from "../components/site/Community";
import { YouTubeIcon } from "../components/site/BrandIcons";
import staticQuizzes from "../data/quizzes";

const SECONDS_PER_QUESTION = 60;
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const STUDENT_KEY = "vus-student";

function Intro({ quiz, onStart }) {
  const { settings } = useSite();
  const saved = JSON.parse(localStorage.getItem(STUDENT_KEY) || "{}");
  const [name, setName] = useState(saved.name || "");
  const [vuId, setVuId] = useState(saved.vuId || "");
  const [subscribed, setSubscribed] = useState(false);
  const [touched, setTouched] = useState(false);
  const total = quiz.questions.length;

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!name.trim() || !subscribed) return;
    localStorage.setItem(STUDENT_KEY, JSON.stringify({ name: name.trim(), vuId: vuId.trim() }));
    onStart({ name: name.trim(), vuId: vuId.trim().toUpperCase() });
  };

  return (
    <div className="quiz-intro">
      <div>
        <span className="eyebrow">Practice quiz</span>
        <h1>{quiz.code}: {quiz.title}</h1>
        <ul className="intro-facts">
          <li><ListChecks /> {total} multiple-choice questions</li>
          <li><Timer /> {total} minutes total ({SECONDS_PER_QUESTION}s per question)</li>
          <li><FileDown /> Download your result as a PDF at the end</li>
        </ul>
        <p className="muted">
          The quiz submits automatically when the timer ends. You can move between questions and change answers
          before submitting.
        </p>
      </div>

      <form className="card card-pad intro-form" onSubmit={submit} noValidate>
        <h2>Before you start</h2>
        <div className="field">
          <label className="label" htmlFor="st-name">Your name</label>
          <input
            id="st-name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ayesha Khan"
            autoComplete="name"
            maxLength={80}
            aria-invalid={touched && !name.trim()}
          />
          {touched && !name.trim() ? (
            <span className="field-error">Enter your name. It's printed on your PDF result.</span>
          ) : (
            <span className="help">Printed on your PDF result.</span>
          )}
        </div>
        <div className="field">
          <label className="label" htmlFor="st-id">VU student ID <span className="opt">(optional)</span></label>
          <input
            id="st-id"
            className="input"
            value={vuId}
            onChange={(e) => setVuId(e.target.value)}
            placeholder="e.g. BC230412345"
            maxLength={20}
          />
        </div>

        <div className="subscribe-gate">
          <div className="subscribe-head">
            <YouTubeIcon />
            <div>
              <strong>Subscribe to VU Standard on YouTube</strong>
              <span>Free lectures, assignment solutions and exam preparation.</span>
            </div>
          </div>
          <a className="btn btn-secondary btn-sm" href={`${settings.youtube}?sub_confirmation=1`} target="_blank" rel="noreferrer">
            Open channel and subscribe
          </a>
          <label className="checkbox">
            <input type="checkbox" checked={subscribed} onChange={(e) => setSubscribed(e.target.checked)} />
            <span>I have subscribed to the VU Standard YouTube channel</span>
          </label>
          {touched && !subscribed && <span className="field-error">Please confirm you've subscribed to start the quiz.</span>}
        </div>

        <button className="btn btn-primary btn-lg btn-block" type="submit">
          Start quiz <ArrowRight />
        </button>
      </form>
    </div>
  );
}

function Attempt({ quiz, onFinish }) {
  const total = quiz.questions.length;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => Array(total).fill(null));
  const [left, setLeft] = useState(total * SECONDS_PER_QUESTION);
  const [confirming, setConfirming] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const finish = useCallback(
    () => onFinish(answersRef.current, Math.min(Math.round((Date.now() - startedAt) / 1000), total * SECONDS_PER_QUESTION)),
    [onFinish, total, startedAt]
  );

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (left <= 0) finish();
  }, [left, finish]);

  useEffect(() => {
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const q = quiz.questions[current];
  const answered = answers.filter((a) => a !== null).length;
  const choose = (i) => setAnswers((a) => a.map((v, idx) => (idx === current ? i : v)));
  const low = left <= 60;

  const submit = () => (answered < total && !confirming ? setConfirming(true) : finish());

  return (
    <div className="attempt">
      <div className="attempt-bar">
        <div>
          <span className="code-tag">{quiz.code}</span>
          <span className="attempt-title">{quiz.title}</span>
        </div>
        <div className={`timer ${low ? "timer-low" : ""}`} role="timer" aria-label={`Time left ${fmt(Math.max(left, 0))}`}>
          <Clock /> {fmt(Math.max(left, 0))}
        </div>
      </div>
      <div className="progress" aria-hidden="true"><span style={{ width: `${(answered / total) * 100}%` }} /></div>

      <div className="attempt-grid">
        <div className="card question-card">
          <p className="q-count">Question {current + 1} of {total}</p>
          <h2 className="q-text">{q.question}</h2>
          <fieldset className="options">
            <legend className="sr-only">Choose one answer</legend>
            {q.options.map((opt, i) => (
              <label key={i} className={`option ${answers[current] === i ? "selected" : ""}`}>
                <input
                  type="radio"
                  name={`q-${current}`}
                  checked={answers[current] === i}
                  onChange={() => choose(i)}
                />
                <span className="option-key">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </label>
            ))}
          </fieldset>

          <div className="q-actions">
            <button type="button" className="btn btn-secondary" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
              <ArrowLeft /> Previous
            </button>
            {current < total - 1 ? (
              <button type="button" className="btn btn-primary" onClick={() => setCurrent((c) => c + 1)}>
                Next <ArrowRight />
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={submit}>
                Submit quiz <Send />
              </button>
            )}
          </div>
        </div>

        <aside className="card card-pad navigator">
          <div className="nav-head">
            <strong>Questions</strong>
            <span className="muted">{answered}/{total} answered</span>
          </div>
          <div className="nav-grid">
            {quiz.questions.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`nav-cell ${answers[i] !== null ? "done" : ""} ${i === current ? "current" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Question ${i + 1}${answers[i] !== null ? ", answered" : ""}`}
                aria-current={i === current ? "step" : undefined}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {confirming && answered < total ? (
            <div className="alert alert-info" style={{ marginTop: 16 }}>
              <div>
                You have {total - answered} unanswered question{total - answered > 1 ? "s" : ""}. Submit anyway?
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button type="button" className="btn btn-primary btn-sm" onClick={finish}>Yes, submit</button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirming(false)}>Keep going</button>
                </div>
              </div>
            </div>
          ) : (
            <button type="button" className="btn btn-secondary btn-block" style={{ marginTop: 16 }} onClick={submit}>
              Submit quiz
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}

function Result({ quiz, answers, student, durationSec, onRetake }) {
  const { settings, toast } = useSite();
  const [busy, setBusy] = useState(false);
  const total = quiz.questions.length;
  const score = answers.reduce((n, a, i) => n + (a === quiz.questions[i].answer ? 1 : 0), 0);
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 50;

  const download = async () => {
    setBusy(true);
    try {
      const { downloadQuizPdf } = await import("../lib/pdf");
      await downloadQuizPdf({ quiz, answers, student, score, durationSec, settings });
      toast("Your PDF result has been downloaded");
    } catch (err) {
      console.error(err);
      toast("Couldn't create the PDF. Please try again.", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="result">
      <div className="card result-card">
        <div className={`score-ring ${passed ? "pass" : "fail"}`} style={{ "--p": pct }}>
          <span><strong>{pct}%</strong><small>{score}/{total}</small></span>
        </div>
        <div className="result-copy">
          <span className={`badge ${passed ? "badge-success" : "badge-danger"}`}>{passed ? "Passed" : "Needs more practice"}</span>
          <h1>{passed ? `Well done, ${student.name.split(" ")[0]}!` : `Keep practising, ${student.name.split(" ")[0]}`}</h1>
          <p className="lead">
            You answered {score} of {total} questions correctly in {Math.floor(durationSec / 60)}m {durationSec % 60}s.
            Download your result with the full answer review for revision.
          </p>
          <div className="result-actions">
            <button type="button" className="btn btn-primary btn-lg" onClick={download} disabled={busy}>
              {busy ? <span className="spinner" /> : <FileDown />} {busy ? "Preparing PDF…" : "Download PDF result"}
            </button>
            <button type="button" className="btn btn-secondary btn-lg" onClick={onRetake}><RotateCcw /> Retake</button>
            <Link to="/quizzes" className="btn btn-ghost btn-lg">More quizzes</Link>
          </div>
        </div>
      </div>

      <Community
        title="Get more quizzes and files on WhatsApp"
        text="New practice quizzes, solved assignments and exam updates are shared in our group and channel."
      />

      <h2 className="review-title">Answer review</h2>
      <ol className="review-list">
        {quiz.questions.map((q, i) => {
          const a = answers[i];
          const ok = a === q.answer;
          return (
            <li key={i} className="card review-item">
              <div className="review-q">
                {ok ? <CheckCircle2 className="ok" /> : <XCircle className="bad" />}
                <p><span className="muted">Q{i + 1}.</span> {q.question}</p>
              </div>
              <ul>
                {q.options.map((o, oi) => (
                  <li key={oi} className={oi === q.answer ? "is-answer" : oi === a ? "is-wrong" : ""}>
                    <span className="option-key">{String.fromCharCode(65 + oi)}</span> {o}
                    {oi === q.answer && <span className="tag">Correct answer</span>}
                    {oi === a && oi !== q.answer && <span className="tag">Your answer</span>}
                  </li>
                ))}
              </ul>
              {a === null && <p className="muted skipped">Not answered</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function QuizAttempt() {
  const { code = "" } = useParams();
  const upper = code.toUpperCase();
  const term = new URLSearchParams(window.location.search).get("term") === "final" ? "final" : "midterm";
  const fallback = useMemo(() => term === "midterm" ? staticQuizzes.find((q) => q.code === upper) || null : null, [upper, term]);
  const { data: loaded, loading, error } = useApiData(`/quizzes/${encodeURIComponent(upper)}?term=${term}`, fallback);
  const [stage, setStage] = useState("intro");
  const [student, setStudent] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [quiz, setQuiz] = useState(null);

  // Shuffle question order once per attempt.
  const prepare = useCallback((source) => ({
    ...source,
    questions: [...source.questions].sort(() => Math.random() - 0.5),
  }), []);

  useEffect(() => {
    if (loaded) document.title = `${loaded.code} practice quiz · VU Standard`;
  }, [loaded]);

  const onFinish = useCallback(
    (answers, durationSec) => {
      setOutcome({ answers, durationSec });
      setStage("result");
      window.scrollTo({ top: 0 });
      const score = answers.reduce((n, a, i) => n + (a === quiz.questions[i].answer ? 1 : 0), 0);
      api("/attempts", {
        method: "POST",
        body: { name: student?.name, vuId: student?.vuId, code: quiz.code, score, total: quiz.questions.length },
      }).catch(() => {});
    },
    [quiz, student]
  );

  if (loading) {
    return (
      <div className="container section-sm">
        <div className="skeleton" style={{ height: 40, width: "40%" }} />
        <div className="skeleton" style={{ height: 320, marginTop: 24 }} />
      </div>
    );
  }

  if (!loaded || (error && !fallback)) {
    return (
      <div className="container section">
        <EmptyState
          icon={SearchX}
          title="Quiz not found"
          actions={<Link className="btn btn-primary" to="/quizzes">Browse quizzes</Link>}
        >
          There's no practice quiz for “{upper}” yet. Pick another subject from the list.
        </EmptyState>
      </div>
    );
  }

  return (
    <section className="quiz-page">
      <div className="container">
        {stage !== "attempt" && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/quizzes">Quizzes</Link> / <span>{loaded.code}</span>
          </nav>
        )}
        {stage === "intro" && (
          <Intro
            quiz={loaded}
            onStart={(s) => {
              setStudent(s);
              setQuiz(prepare(loaded));
              setStage("attempt");
              window.scrollTo({ top: 0 });
            }}
          />
        )}
        {stage === "attempt" && quiz && <Attempt key={quiz.questions[0].question} quiz={quiz} onFinish={onFinish} />}
        {stage === "result" && outcome && (
          <Result
            quiz={quiz}
            answers={outcome.answers}
            durationSec={outcome.durationSec}
            student={student}
            onRetake={() => {
              setQuiz(prepare(loaded));
              setOutcome(null);
              setStage("attempt");
              window.scrollTo({ top: 0 });
            }}
          />
        )}
      </div>
    </section>
  );
}

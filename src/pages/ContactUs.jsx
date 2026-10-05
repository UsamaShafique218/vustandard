import { useState } from "react";
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone, Send, Users, Megaphone } from "lucide-react";
import { api } from "../lib/api";
import { useSite, useWhatsApp } from "../lib/site";
import { PageHero } from "../components/site/ui";
import { WhatsAppIcon } from "../components/site/BrandIcons";

const empty = { name: "", email: "", phone: "", subject: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactUs() {
  const { settings } = useSite();
  const wa = useWhatsApp();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name.";
    if (!form.email.trim() && !form.phone.trim()) e.email = "Add an email or phone number so we can reply.";
    else if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) e.message = "Write at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ state: "sending", message: "" });
    try {
      await api("/messages", { method: "POST", body: form });
      setForm(empty);
      setStatus({ state: "sent", message: "Thanks! Your message has been sent. We'll reply soon." });
    } catch (err) {
      setStatus({
        state: "error",
        message: err.status === 0 ? "We couldn't send your message right now. Please message us on WhatsApp instead." : err.message,
      });
    }
  };

  return (
    <>
      <PageHero crumb="Contact" eyebrow="Contact us" title="Ask us anything">
        Questions about LMS handling, assignments or your final project? Send a message and we'll get back to you.
      </PageHero>

      <section className="section-sm">
        <div className="container contact-grid">
          <form className="contact-form card" onSubmit={submit} noValidate>
            <h2>Send a message</h2>
            <p>We usually reply within a few hours.</p>

            {status.state === "sent" && <div className="alert alert-success" role="status"><CheckCircle2 /> {status.message}</div>}
            {status.state === "error" && (
              <div className="alert alert-danger" role="alert">
                <AlertCircle />
                <span>{status.message} <a href={wa} target="_blank" rel="noreferrer">Open WhatsApp</a></span>
              </div>
            )}

            <div className="form-row" style={{ marginTop: status.state === "sent" || status.state === "error" ? 16 : 0 }}>
              <div className="field">
                <label className="label" htmlFor="c-name">Name</label>
                <input id="c-name" className="input" value={form.name} onChange={set("name")} autoComplete="name" maxLength={80} aria-invalid={!!errors.name} />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="field">
                <label className="label" htmlFor="c-phone">Phone / WhatsApp <span className="opt">(optional)</span></label>
                <input id="c-phone" className="input" value={form.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" placeholder="03xx xxxxxxx" maxLength={30} />
              </div>
            </div>
            <div className="form-row" style={{ marginTop: 16 }}>
              <div className="field">
                <label className="label" htmlFor="c-email">Email</label>
                <input id="c-email" className="input" type="email" value={form.email} onChange={set("email")} autoComplete="email" maxLength={120} aria-invalid={!!errors.email} />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
              <div className="field">
                <label className="label" htmlFor="c-subject">Subject <span className="opt">(optional)</span></label>
                <input id="c-subject" className="input" value={form.subject} onChange={set("subject")} placeholder="e.g. CS619 project" maxLength={120} />
              </div>
            </div>
            <div className="field" style={{ marginTop: 16 }}>
              <label className="label" htmlFor="c-message">Message</label>
              <textarea id="c-message" className="textarea" value={form.message} onChange={set("message")} maxLength={2000} rows={5} aria-invalid={!!errors.message} placeholder="Tell us your subjects, deadlines or what you need help with." />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <div className="form-foot">
              <span className="help">We never share your details.</span>
              <button className="btn btn-primary btn-lg" type="submit" disabled={status.state === "sending"}>
                {status.state === "sending" ? <span className="spinner" /> : <Send />}
                {status.state === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>
          </form>

          <aside className="contact-side">
            <div className="card contact-list">
              <h3>Contact details</h3>
              <ul>
                <li><Phone /><div><small>Phone</small><a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a></div></li>
                <li><WhatsAppIcon /><div><small>WhatsApp</small><a href={wa} target="_blank" rel="noreferrer">Chat with {settings.ownerName.split(" ")[0]}</a></div></li>
                {settings.whatsappGroup && (
                  <li><Users /><div><small>WhatsApp group</small><a href={settings.whatsappGroup} target="_blank" rel="noreferrer">Join the student group</a></div></li>
                )}
                {settings.whatsappChannel && (
                  <li><Megaphone /><div><small>WhatsApp channel</small><a href={settings.whatsappChannel} target="_blank" rel="noreferrer">Follow for updates</a></div></li>
                )}
                <li><Mail /><div><small>Email</small><a href={`mailto:${settings.email}`}>{settings.email}</a></div></li>
                <li><MapPin /><div><small>Location</small><span>{settings.location}</span></div></li>
              </ul>
            </div>
            <a className="btn btn-wa btn-lg btn-block" href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon /> Message on WhatsApp</a>
          </aside>
        </div>
      </section>
    </>
  );
}

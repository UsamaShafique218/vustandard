import { ArrowUpRight, Megaphone, Users } from "lucide-react";
import { useSite } from "../../lib/site";

/** WhatsApp group + channel links. Hidden when neither link is set in Admin → Settings. */
export default function Community({ title = "Join the VU Standard community", text, compact = false }) {
  const { settings: s } = useSite();
  const links = [
    s.whatsappGroup && {
      href: s.whatsappGroup,
      Icon: Users,
      label: "Join our WhatsApp group",
      hint: "Quiz files, notes and assignment updates, shared every week",
    },
    s.whatsappChannel && {
      href: s.whatsappChannel,
      Icon: Megaphone,
      label: "Follow our WhatsApp channel",
      hint: "Deadlines, announcements and free resources",
    },
  ].filter(Boolean);
  if (!links.length) return null;

  return (
    <aside className={`community ${compact ? "community-compact" : ""}`} aria-label="WhatsApp community">
      <div className="community-copy">
        <h2>{title}</h2>
        <p>{text || "Get new solutions, quiz files and semester deadlines on WhatsApp, free for every VU student."}</p>
      </div>
      <div className="community-links">
        {links.map(({ href, Icon, label, hint }) => (
          <a key={label} className="community-link" href={href} target="_blank" rel="noreferrer">
            <span className="community-icon"><Icon /></span>
            <span>
              <strong>{label}</strong>
              <small>{hint}</small>
            </span>
            <ArrowUpRight className="community-arrow" />
          </a>
        ))}
      </div>
    </aside>
  );
}

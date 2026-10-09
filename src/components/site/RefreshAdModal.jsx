import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { YouTubeIcon } from "./BrandIcons";
import ownerPhoto from "../../assets/images/user_img1.jpeg";

const CHANNEL_URL = "https://www.youtube.com/@vu_standard";

export default function RefreshAdModal() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="refresh-ad-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <section className="refresh-ad" role="dialog" aria-modal="true" aria-labelledby="refresh-ad-title">
        <button className="refresh-ad-close" type="button" onClick={() => setOpen(false)} aria-label="Close advertisement">
          <X />
        </button>
        <div className="refresh-ad-photo">
          <img src={ownerPhoto} alt="VU Standard Academy" />
          <span className="refresh-ad-brand">VU <strong>STANDARD</strong></span>
          <span className="refresh-ad-results">Results<br /><strong>85% to 100%</strong></span>
        </div>
        <div className="refresh-ad-copy">
          <span className="eyebrow">Professional VU Standard Academy</span>
          <h2 id="refresh-ad-title">Your VU semester, handled with care.</h2>
          <p>Assignments, quizzes, GDBs, LMS handling, online classes, lectures and important notes.</p>
          <p className="refresh-ad-request">Please subscribe to our YouTube channel for free lectures, study help and updates.</p>
          <a className="btn btn-primary refresh-ad-cta" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            <YouTubeIcon /> Subscribe to our channel
          </a>
          <span className="refresh-ad-handle">@vu_standard</span>
        </div>
      </section>
    </div>
  );
}

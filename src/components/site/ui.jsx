import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, X, Search } from "lucide-react";

export function PageHero({ eyebrow, title, children, crumb, actions }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumb && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span>{crumb}</span>
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {children && <p className="lead">{children}</p>}
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
    </section>
  );
}

export function SearchInput({ value, onChange, placeholder, label = "Search" }) {
  return (
    <label className="search">
      <span className="sr-only">{label}</span>
      <Search />
      <input
        className="input"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function EmptyState({ icon: Icon, title, children, actions }) {
  return (
    <div className="empty">
      {Icon && <div className="empty-icon"><Icon size={22} /></div>}
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {actions && <div className="actions">{actions}</div>}
    </div>
  );
}

export function Initials({ name, className = "" }) {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return <span className={`avatar ${className}`} aria-hidden="true">{letters}</span>;
}

/** YouTube player that only loads the iframe after the visitor presses play. */
export function YouTubeEmbed({ videoId, title }) {
  const [playing, setPlaying] = useState(false);
  if (!videoId) return null;
  return (
    <div className="yt">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt-poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="yt-play"><Play fill="currentColor" /></span>
        </button>
      )}
    </div>
  );
}

/** Full-screen image viewer with keyboard navigation. */
export function Lightbox({ items, index, onClose, onIndex }) {
  const count = items.length;
  const go = useCallback((d) => onIndex((index + d + count) % count), [index, count, onIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  const item = items[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="lightbox-bar">
        <p>
          <strong style={{ color: "#fff" }}>{item.title}</strong>
          {item.caption ? ` · ${item.caption}` : ""} · {index + 1} / {count}
        </p>
        <button type="button" className="lightbox-nav" style={{ position: "static", translate: "none" }} onClick={onClose} aria-label="Close" autoFocus>
          <X />
        </button>
      </div>
      <div className="lightbox-stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img src={item.src} alt={item.title} />
        {count > 1 && (
          <>
            <button type="button" className="lightbox-nav prev" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft /></button>
            <button type="button" className="lightbox-nav next" onClick={() => go(1)} aria-label="Next image"><ChevronRight /></button>
          </>
        )}
      </div>
      {count > 1 ? (
        <div className="lightbox-thumbs">
          {items.map((it, i) => (
            <button key={i} type="button" aria-current={i === index} onClick={() => onIndex(i)} aria-label={`Show image ${i + 1}`}>
              <img src={it.src} alt="" />
            </button>
          ))}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

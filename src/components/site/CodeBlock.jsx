import { useMemo, useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { highlightLines } from "../../lib/highlight";
import { useSite } from "../../lib/site";

export default function CodeBlock({ code, language, label, filename }) {
  const { toast } = useSite();
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => highlightLines(code, language), [code, language]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Couldn't copy. Select the code and press Ctrl+C.", "error");
    }
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([code], { type: "text/plain;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: filename });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <figure className="code-block">
      <figcaption className="code-bar">
        <span className="code-file">
          <span className="code-dots" aria-hidden="true"><i /><i /><i /></span>
          {filename}
        </span>
        <span className="code-meta">{label} · {lines.length} lines</span>
        <span className="code-actions">
          <button type="button" className="code-btn" onClick={copy} aria-live="polite">
            {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}
          </button>
          <button type="button" className="code-btn" onClick={download}>
            <Download /> <span>Download</span>
          </button>
        </span>
      </figcaption>
      <pre className="code-body" tabIndex={0} aria-label={`${label} source code`}>
        <code>
          {lines.map((tokens, i) => (
            <span key={i} className="code-line">
              {tokens.map(([type, text], j) => (type ? <span key={j} className={`t-${type}`}>{text}</span> : text))}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

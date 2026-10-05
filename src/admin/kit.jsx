import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AlertCircle, Pencil, Plus, SearchX, Trash2, X } from "lucide-react";
import { api } from "../lib/api";
import { useSite } from "../lib/site";
import { EmptyState, SearchInput } from "../components/site/ui";
import { useAdminList } from "./useAdminList";

export function Modal({ title, onClose, onSubmit, children, footer, wide }) {
  const panel = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.querySelector("input:not([type=radio]):not([type=checkbox]), select, textarea, button.btn-danger")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const Tag = onSubmit ? "form" : "div";
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <Tag
        ref={panel}
        className={`modal ${wide ? "modal-wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onSubmit={onSubmit ? (e) => { e.preventDefault(); onSubmit(); } : undefined}
        noValidate
      >
        <header className="modal-head">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close"><X /></button>
        </header>
        <div className="modal-body">{children}</div>
        {footer && <footer className="modal-foot">{footer}</footer>}
      </Tag>
    </div>
  );
}

export function Field({ label, id, hint, optional, children }) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label} {optional && <span className="opt">(optional)</span>}</label>
      {children}
      {hint && <span className="help">{hint}</span>}
    </div>
  );
}

export function SectionError({ error, onRetry }) {
  return (
    <div className="alert alert-danger" role="alert">
      <AlertCircle />
      <span>
        {error.message}{" "}
        {onRetry && <button type="button" className="link-btn" onClick={onRetry}>Try again</button>}
      </span>
    </div>
  );
}

/**
 * Searchable table with add / edit / delete for one API collection.
 */
export function CrudSection({
  path,
  listPath,
  singular,
  columns,
  blank,
  toForm = (item) => item,
  toPayload = (form) => form,
  validate = () => null,
  renderForm,
  searchText,
  itemName,
  wide,
  emptyText,
}) {
  const { items, loading, error, reload } = useAdminList(listPath || path);
  const { toast } = useSite();
  const { refreshStats } = useOutletContext() || {};
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleting, setDeleting] = useState(null);

  const open = (item) => {
    setFormError("");
    setEditing({ id: item?._id || null, form: item ? toForm(item) : structuredClone(blank) });
  };
  const setForm = (patch) =>
    setEditing((e) => ({ ...e, form: typeof patch === "function" ? patch(e.form) : { ...e.form, ...patch } }));

  const save = async () => {
    const msg = validate(editing.form);
    if (msg) return setFormError(msg);
    setSaving(true);
    setFormError("");
    try {
      await api(editing.id ? `${path}/${editing.id}` : path, {
        method: editing.id ? "PUT" : "POST",
        body: toPayload(editing.form),
      });
      toast(`${singular} ${editing.id ? "updated" : "added"}`);
      setEditing(null);
      reload();
      refreshStats?.();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    setSaving(true);
    try {
      await api(`${path}/${deleting._id}`, { method: "DELETE" });
      toast(`${singular} deleted`);
      setDeleting(null);
      reload();
      refreshStats?.();
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const q = query.trim().toLowerCase();
  const filtered = q ? items.filter((it) => searchText(it).toLowerCase().includes(q)) : items;

  return (
    <>
      <div className="a-toolbar">
        <SearchInput value={query} onChange={setQuery} placeholder={`Search ${singular.toLowerCase()}s`} label={`Search ${singular.toLowerCase()}s`} />
        <span className="muted a-count">{loading ? "Loading…" : `${filtered.length} of ${items.length}`}</span>
        <button type="button" className="btn btn-primary" onClick={() => open(null)}><Plus /> Add {singular.toLowerCase()}</button>
      </div>

      {error ? (
        <SectionError error={error} onRetry={reload} />
      ) : loading ? (
        <div className="a-card">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: 44, margin: 12 }} />)}</div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={q ? "Nothing matches your search" : `No ${singular.toLowerCase()}s yet`}
          actions={!q && <button type="button" className="btn btn-primary" onClick={() => open(null)}><Plus /> Add {singular.toLowerCase()}</button>}
        >
          {q ? "Try a different search term." : emptyText}
        </EmptyState>
      ) : (
        <div className="a-card">
          <table className="a-table">
            <thead>
              <tr>
                {columns.map((c) => <th key={c.key} style={c.width ? { width: c.width } : undefined}>{c.label}</th>)}
                <th className="row-actions"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id}>
                  {columns.map((c) => (
                    <td key={c.key} data-label={c.label}>{c.render ? c.render(item) : item[c.key]}</td>
                  ))}
                  <td className="row-actions">
                    <button type="button" className="btn btn-ghost btn-sm btn-icon" onClick={() => open(item)} aria-label={`Edit ${itemName(item)}`} title="Edit">
                      <Pencil />
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm btn-icon danger-hover" onClick={() => setDeleting(item)} aria-label={`Delete ${itemName(item)}`} title="Delete">
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal
          title={editing.id ? `Edit ${singular.toLowerCase()}` : `Add ${singular.toLowerCase()}`}
          onClose={() => setEditing(null)}
          onSubmit={save}
          wide={wide}
          footer={
            <>
              {formError && <p className="field-error modal-error" role="alert">{formError}</p>}
              <button type="button" className="btn btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving && <span className="spinner" />} {editing.id ? "Save changes" : `Add ${singular.toLowerCase()}`}
              </button>
            </>
          }
        >
          {renderForm(editing.form, setForm)}
        </Modal>
      )}

      {deleting && (
        <Modal
          title={`Delete ${singular.toLowerCase()}?`}
          onClose={() => setDeleting(null)}
          footer={
            <>
              <button type="button" className="btn btn-secondary" onClick={() => setDeleting(null)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={remove} disabled={saving}>
                {saving ? <span className="spinner" /> : <Trash2 />} Delete
              </button>
            </>
          }
        >
          <p className="muted">“{itemName(deleting)}” will be removed from the website. This can't be undone.</p>
        </Modal>
      )}
    </>
  );
}

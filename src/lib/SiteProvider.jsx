import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import siteDefaults from "../data/site";
import { api } from "./api";
import { SiteContext } from "./site";

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(siteDefaults);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    api("/settings")
      .then((data) => setSettings({ ...siteDefaults, ...data }))
      .catch(() => {});
  }, []);

  const toast = useCallback((message, type = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);

  const value = useMemo(() => ({ settings, setSettings, toast }), [settings, toast]);

  return (
    <SiteContext.Provider value={value}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.type === "error" ? <AlertCircle /> : <CheckCircle2 />}
            {t.message}
          </div>
        ))}
      </div>
    </SiteContext.Provider>
  );
}

import { createContext, useContext, useState } from "react";
import siteDefaults, { whatsappLink } from "../data/site";

// Provider lives in SiteProvider.jsx; this file only holds the context and hooks.
export const SiteContext = createContext({ settings: siteDefaults, setSettings: () => {}, toast: () => {} });

export const useSite = () => useContext(SiteContext);

export function useWhatsApp(text) {
  const { settings } = useSite();
  return whatsappLink(settings.whatsappNumber, text);
}

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("vus-theme", next);
    setTheme(next);
  };
  return [theme, toggle];
}

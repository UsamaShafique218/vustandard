import { useCallback, useEffect, useState } from "react";

const BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function api(path, { method = "GET", body, signal } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      signal,
      credentials: "include",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new ApiError("Can't reach the server. Check your connection and try again.", 0);
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;
  if (!res.ok || !isJson) {
    throw new ApiError(data?.message || "The server is not available right now.", isJson ? res.status : 0);
  }
  return data;
}

/**
 * Public data loader. If the API is unreachable (e.g. static hosting without
 * the backend) it falls back to the bundled data so the site keeps working.
 */
export function useApiData(path, fallback) {
  const [state, setState] = useState({ data: null, loading: true, error: null, offline: false });

  const load = useCallback(
    (signal) => {
      setState((s) => ({ ...s, loading: true, error: null }));
      return api(path, { signal })
        .then((data) => setState({ data, loading: false, error: null, offline: false }))
        .catch((err) => {
          if (err.name === "AbortError") return;
          if (fallback !== undefined && (err.status === 0 || err.status >= 500)) {
            setState({ data: typeof fallback === "function" ? fallback() : fallback, loading: false, error: null, offline: true });
          } else {
            setState({ data: null, loading: false, error: err, offline: false });
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path]
  );

  useEffect(() => {
    if (!path) return;
    const ctrl = new AbortController();
    load(ctrl.signal);
    return () => ctrl.abort();
  }, [path, load]);

  return { ...state, reload: () => load() };
}

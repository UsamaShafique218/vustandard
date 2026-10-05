import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";

export function useAdminList(path) {
  const [state, setState] = useState({ items: [], loading: true, error: null });
  const load = useCallback(
    () =>
      api(path)
        .then((items) => setState({ items, loading: false, error: null }))
        .catch((error) => setState({ items: [], loading: false, error })),
    [path]
  );
  useEffect(() => {
    load();
  }, [load]);
  return { ...state, reload: load };
}

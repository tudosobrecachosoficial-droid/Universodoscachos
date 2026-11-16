import { useCallback, useEffect, useState } from "react";

type QueryState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
};

/* Small in-memory cache: going back to a page shows what was already loaded
   and refreshes it quietly instead of starting from an empty screen. */
const FRESH_MS = 60_000;
const KEEP_MS = 5 * 60_000;
const cache = new Map<string, { data: unknown; at: number }>();

function readCache<T>(key: string) {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() - entry.at > KEEP_MS) {
    cache.delete(key);
    return undefined;
  }
  return entry as { data: T; at: number };
}

export function clearSupabaseCache() {
  cache.clear();
}

/**
 * Runs `load` and keeps its state. Pass a `cacheKey` that identifies the query
 * (including its parameters, e.g. `post:${slug}`) to reuse results between pages.
 */
export function useSupabaseData<T>(load: () => Promise<T>, cacheKey?: string): QueryState<T> {
  const [data, setData] = useState<T | null>(() =>
    cacheKey ? (readCache<T>(cacheKey)?.data ?? null) : null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(() => !(cacheKey && readCache<T>(cacheKey)));
  const [attempt, setAttempt] = useState(0);

  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    let active = true;
    const cached = cacheKey && attempt === 0 ? readCache<T>(cacheKey) : undefined;

    if (cached) {
      setData(cached.data);
      setError(null);
      setLoading(false);
      if (Date.now() - cached.at < FRESH_MS) {
        return () => {
          active = false;
        };
      }
    } else {
      setLoading(true);
      setError(null);
      if (cacheKey) setData(null);
    }

    load()
      .then((result) => {
        if (!active) return;
        if (cacheKey) cache.set(cacheKey, { data: result, at: Date.now() });
        setData(result);
      })
      .catch((cause: unknown) => {
        if (!active || cached) return;
        const message = cause instanceof Error ? cause.message : "Não foi possível carregar os dados.";
        setError(message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [attempt, load, cacheKey]);

  return { data, error, loading, reload };
}

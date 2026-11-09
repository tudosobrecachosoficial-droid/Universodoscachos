import { useCallback, useEffect, useState } from "react";

type QueryState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  reload: () => void;
};

export function useSupabaseData<T>(load: () => Promise<T>): QueryState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    load()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((cause: unknown) => {
        if (!active) return;
        const message = cause instanceof Error ? cause.message : "Não foi possível carregar os dados.";
        setError(message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [attempt, load]);

  return { data, error, loading, reload };
}

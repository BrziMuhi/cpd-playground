
import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [result, setResult] = useState<{
    url: string | null;
    data: T | null;
    error: string | null;
  }>({
    url: null,
    data: null,
    error: null
  });

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Failed to load data');
        }

        const json: T = (await res.json()) as T;

        if (!ignore) {
          setResult({
            url,
            data: json,
            error: null
          });
        }

      } catch (e) {
        if (!ignore) {
          setResult({
            url,
            data: null,
            error: e instanceof Error
              ? e.message
              : 'Unknown error'
          });
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };

  }, [url]);

  const loading = result.url !== url;

  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading
  };
}

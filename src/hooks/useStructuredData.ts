import { useEffect } from "react";

export type StructuredData = Record<string, unknown> | null;

const ATTRIBUTE = "data-structured-id";

/**
 * Injects one JSON-LD block into <head> for the page currently being read and
 * removes it on unmount, so a single-page navigation never leaves stale markup.
 */
export function useStructuredData(id: string, data: StructuredData) {
  const serialized = data ? JSON.stringify(data) : "";

  useEffect(() => {
    const selector = `script[${ATTRIBUTE}="${id}"]`;
    document.head.querySelectorAll(selector).forEach((node) => node.remove());

    if (!serialized) return undefined;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(ATTRIBUTE, id);
    script.textContent = serialized;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [id, serialized]);
}
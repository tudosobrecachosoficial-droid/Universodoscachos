import { useEffect } from "react";

type Meta = {
  title: string;
  description: string;
  path?: string;
};

/**
 * Keeps the document title and description aligned with the page being read.
 */
export function usePageMeta({ title, description, path }: Meta) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attribute: string, name: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${path ?? window.location.pathname}`;
  }, [title, description, path]);
}
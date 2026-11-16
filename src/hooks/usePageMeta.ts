import { useEffect } from "react";
import { absoluteUrl, getSiteOrigin } from "@/utils/site";

type Meta = {
  title: string;
  description: string;
  path?: string;
  /** Social sharing image (absolute URL or a path on this site). */
  image?: string;
  type?: "website" | "article";
  /** Keeps the page out of search results (missing pages, for example). */
  noindex?: boolean;
};

const DEFAULT_IMAGE = "/og-default.jpg";

/**
 * Keeps the document title, description, canonical link, Open Graph and
 * Twitter tags aligned with the page being read.
 */
export function usePageMeta({ title, description, path, image, type = "website", noindex = false }: Meta) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attribute: "name" | "property", key: string, content: string) => {
      const selector = `meta[${attribute}="${key}"]`;
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const url = `${getSiteOrigin()}${path ?? window.location.pathname}`;
    const picture = absoluteUrl(image || DEFAULT_IMAGE);

    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");

    setMeta("property", "og:type", type);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", picture);
    setMeta("property", "og:site_name", "Universo dos Cachos");
    setMeta("property", "og:locale", "pt_BR");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", picture);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image, type, noindex]);
}

/**
 * Public address of the site. VITE_SITE_URL wins (needed for canonical links,
 * Open Graph images and the sitemap); the current origin is the fallback.
 */
const configured = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim().replace(/\/+$/, "");

export const getSiteOrigin = () => configured || window.location.origin;

export const absoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) return value;
  return `${getSiteOrigin()}${value.startsWith("/") ? "" : "/"}${value}`;
};

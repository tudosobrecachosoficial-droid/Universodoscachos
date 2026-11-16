import type { ConsentChoice } from "@/lib/consent";

const rawGtm = import.meta.env.VITE_GTM_ID as string | undefined;
/** Set VITE_GTM_ID to an empty value to switch Tag Manager off. */
const GTM_ID = rawGtm === undefined ? "GTM-PXGZP4SG" : rawGtm.trim();

const rawAds = (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined)?.trim();
export const ADSENSE_CLIENT = rawAds && /^ca-pub-\d+$/.test(rawAds) ? rawAds : undefined;

let gtmLoaded = false;
let adsenseLoaded = false;

export const hasLoadedTrackers = () => gtmLoaded || adsenseLoaded;

function loadGtm() {
  if (gtmLoaded || !GTM_ID) return;
  gtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
}

/** Returns false when ads are not configured. */
export function loadAdsense(): boolean {
  if (!ADSENSE_CLIENT) return false;
  if (adsenseLoaded) return true;
  adsenseLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(script);
  return true;
}

/**
 * Third-party scripts only run after the visitor accepts them. Withdrawing the
 * consent reloads the page, because scripts that already ran cannot be unloaded.
 */
export function applyConsent(choice: ConsentChoice) {
  if (choice === "all") {
    loadGtm();
    loadAdsense();
    return;
  }
  if (hasLoadedTrackers()) window.location.reload();
}

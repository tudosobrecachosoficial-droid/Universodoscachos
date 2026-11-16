import { useEffect, useRef } from "react";
import { useConsent } from "@/hooks/useConsent";
import { ADSENSE_CLIENT, loadAdsense } from "@/lib/tracking";

type Props = {
  /** Ad unit id from AdSense. Nothing is rendered without it. */
  slot?: string;
  minHeight?: number;
  className?: string;
};

/**
 * One ad unit. It stays out of the page until ads are configured and the
 * visitor has accepted them, and reserves its height to avoid layout shift.
 * Render it with a key (for example the article slug) so it remounts on navigation.
 */
export default function AdSlot({ slot, minHeight = 280, className }: Props) {
  const consent = useConsent();
  const pushed = useRef(false);
  const enabled = Boolean(ADSENSE_CLIENT && slot && consent === "all");

  useEffect(() => {
    if (!enabled || pushed.current) return;
    if (!loadAdsense()) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // The ad script rejected the unit; the page keeps working without it.
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <aside
      className={className ? `ad-slot ${className}` : "ad-slot"}
      aria-label="Publicidade"
      style={{ minHeight }}
    >
      <span className="ad-slot-label">Publicidade</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

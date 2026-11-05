import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * When a visitor arrives from another page with a #hash, wait for layout,
 * then scroll to that section inside the film chapter.
 */
export function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = hash.replace("#", "");
    let tries = 0;
    const tick = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      tries += 1;
      if (tries < 20) window.setTimeout(tick, 120);
    };
    window.setTimeout(tick, 80);
  }, [hash]);
}
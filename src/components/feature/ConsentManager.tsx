import { useEffect } from "react";
import { CONSENT_CHANGE_EVENT, getConsent, type ConsentChoice } from "@/lib/consent";
import { applyConsent } from "@/lib/tracking";

/** Starts (or stops) analytics and ads according to the visitor's cookie choice. */
export default function ConsentManager() {
  useEffect(() => {
    const saved = getConsent();
    if (saved) applyConsent(saved);

    const onChange = (event: Event) => {
      const choice = (event as CustomEvent<ConsentChoice>).detail;
      if (choice) applyConsent(choice);
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  return null;
}

import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, getConsent, type ConsentChoice } from "@/lib/consent";

export function useConsent(): ConsentChoice | null {
  const [choice, setChoice] = useState<ConsentChoice | null>(() => getConsent());

  useEffect(() => {
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentChoice>).detail;
      setChoice(detail ?? getConsent());
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  return choice;
}

export type ConsentChoice = "all" | "essential";

const STORAGE_KEY = "udc-cookie-choice";

export const CONSENT_CHANGE_EVENT = "udc-consent-change";
export const CONSENT_OPEN_EVENT = "udc-consent-open";

let memoryChoice: ConsentChoice | null = null;

const isChoice = (value: unknown): value is ConsentChoice =>
  value === "all" || value === "essential";

/** Visitor's cookie choice, or null while they have not decided yet. */
export function getConsent(): ConsentChoice | null {
  if (memoryChoice) return memoryChoice;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return isChoice(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  memoryChoice = choice;
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice still holds for this visit.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}

/** Reopens the cookie notice so the visitor can change their mind. */
export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

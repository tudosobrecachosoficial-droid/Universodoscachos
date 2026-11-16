import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONSENT_OPEN_EVENT, getConsent, setConsent, type ConsentChoice } from "@/lib/consent";

/**
 * Cookie notice. Analytics and advertising scripts only load after the visitor
 * chooses "Aceitar"; the choice can be reopened from the footer at any time.
 */
export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="cookie" role="region" aria-label="Aviso de cookies">
      <p className="cookie-copy">
        <strong>Cookies, com transparência.</strong> Usamos o essencial para o portal funcionar e,
        só se você aceitar, cookies de medição e de publicidade, inclusive de parceiros como o
        Google, para entender a leitura e exibir anúncios. Você pode mudar de ideia quando quiser,
        pelo rodapé. Saiba mais na{" "}
        <Link to="/politica-de-privacidade#cookies">política de privacidade</Link>.
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn is-ghost" onClick={() => choose("essential")}>
          Só o essencial
        </button>
        <button type="button" className="cookie-btn" onClick={() => choose("all")}>
          Aceitar
        </button>
      </div>
    </aside>
  );
}

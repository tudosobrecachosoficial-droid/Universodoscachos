import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "udc-cookie-choice";

type Choice = "all" | "essential";

/**
 * Cookie notice shown once. The choice is remembered locally — the only
 * piece of visitor data this site stores in the browser by itself.
 */
export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== "all" && saved !== "essential") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (choice: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage blocked: the notice still closes for this visit.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="cookie" role="region" aria-label="Aviso de cookies">
      <p className="cookie-copy">
        <strong>Cookies, com transparência.</strong> Usamos apenas o essencial para o portal
        funcionar e, se você autorizar, medições anônimas de leitura. Nada de perfil de navegação
        vendido por aí. Saiba mais na{" "}
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
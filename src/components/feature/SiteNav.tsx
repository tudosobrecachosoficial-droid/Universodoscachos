import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LINKS = [
  { label: "Início", to: "/" },
  { label: "Tipos de cachos", to: "/tipos-de-cachos" },
  { label: "Quiz", to: "/quiz" },
  { label: "Produtos", to: "/produtos" },
  { label: "Cuidados", to: "/cuidados" },
  { label: "Rotinas", to: "/rotinas" },
  { label: "Cachos infantis", to: "/cachos-infantis" },
  { label: "Blog", to: "/blog" },
  { label: "Glossário", to: "/glossario" },
];

type Props = {
  solid?: boolean;
};

export default function SiteNav({ solid = false }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  return (
    <>
      <header className={solid ? "nav is-solid" : "nav"}>
        <Link className="nav-logo" to="/" onClick={() => setOpen(false)}>
          Universo <em>dos</em> Cachos
        </Link>

        <nav className="nav-links" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <Link key={link.label} to={link.to}>
              {link.label}
            </Link>
          ))}
          <Link className="nav-cta" to="/#contato">
            Contato
          </Link>
        </nav>

        <button
          type="button"
          className="nav-burger"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <i className={open ? "ri-close-line" : "ri-menu-line"} aria-hidden="true" />
        </button>
      </header>

      {open ? (
        <nav className="nav-mobile" aria-label="Menu">
          {LINKS.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/#contato" onClick={() => setOpen(false)}>
            Contato
          </Link>
        </nav>
      ) : null}
    </>
  );
}
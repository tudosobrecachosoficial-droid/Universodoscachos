import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

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
  // solid prop é usado para futuras customizações
  void solid;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu mobile ao mudar de rota
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`nav ${scrolled ? "is-solid" : ""}`}>
        <Link className="nav-logo" to="/" onClick={() => setOpen(false)}>
          <img src={logo} alt="Unicachos - Universo dos Cachos" />
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
          <button
            className="nav-mobile-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <i className="ri-close-line" aria-hidden="true" />
          </button>
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
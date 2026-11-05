import type { ReactNode } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SiteNav from "@/components/feature/SiteNav";
import SiteFooter from "@/components/feature/SiteFooter";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

type Props = {
  crumb: string;
  stamp: string;
  title: ReactNode;
  subtitle: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  callout: string;
  asideLink: { label: string; to: string };
};

const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function LegalDoc({
  crumb,
  stamp,
  title,
  subtitle,
  updated,
  intro,
  sections,
  callout,
  asideLink,
}: Props) {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 140);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="page">
      <SiteNav solid />
      <main>
        <header className="article-head">
          <div className="wrap">
            <nav className="crumbs" aria-label="Você está aqui">
              <Link to="/">Início</Link>
              <span>/</span>
              <span>{crumb}</span>
            </nav>
            <p className="stamp">{stamp}</p>
            <h1>{title}</h1>
            <p className="article-sub">{subtitle}</p>
            <div className="article-meta">
              <span>Última atualização · {updated}</span>
              <span className="dot">·</span>
              <span>Universo dos Cachos</span>
            </div>
          </div>
        </header>

        <div className="wrap">
          <div className="read-grid">
            <div className="prose-udc">
              <p className="prose-lead">{intro}</p>

              {sections.map((section) => (
                <section key={section.heading} id={slugifyHeading(section.heading)}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 44)}>{paragraph}</p>
                  ))}
                  {section.list && section.list.length > 0 ? (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <p className="legal-callout">{callout}</p>
              <p className="legal-note">
                Este documento é uma versão editorial inicial e pode ser revisado. Ele não
                substitui orientação jurídica profissional. Se algo aqui não estiver claro,
                escreva para a gente antes de tomar qualquer decisão.
              </p>
            </div>

            <aside className="toc" aria-label="Nesta página">
              <p>Nesta página</p>
              {sections.map((section) => (
                <a key={section.heading} href={`#${slugifyHeading(section.heading)}`}>
                  {section.heading}
                </a>
              ))}
              <Link className="toc-cta" to={asideLink.to}>
                {asideLink.label}
              </Link>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
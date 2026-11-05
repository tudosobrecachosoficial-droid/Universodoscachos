import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <p className="footer-mark">
            Universo <em>dos</em> Cachos
          </p>
          <p className="footer-slogan">
            Seu universo de cuidados, descobertas e amor pelos cachos. Para cabelos ondulados,
            cacheados e crespos, de todas as idades.
          </p>
          <div className="socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram do Universo dos Cachos">
              <i className="ri-instagram-line" aria-hidden="true" />
            </a>
            <a href="https://br.pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest do Universo dos Cachos">
              <i className="ri-pinterest-line" aria-hidden="true" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube do Universo dos Cachos">
              <i className="ri-youtube-line" aria-hidden="true" />
            </a>
            <Link to="/#contato" aria-label="Falar com o Universo dos Cachos">
              <i className="ri-mail-line" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div>
          <h4>
            <Link to="/blog">Conteúdo</Link>
          </h4>
          <ul>
            <li>
              <Link to="/tipos-de-cachos">Tipos de cachos</Link>
            </li>
            <li>
              <Link to="/quiz">Quiz de curvatura</Link>
            </li>
            <li>
              <Link to="/glossario">Glossário de termos</Link>
            </li>
            <li>
              <Link to="/blog">Blog e artigos</Link>
            </li>
            <li>
              <Link to="/cuidados">Cuidados</Link>
            </li>
            <li>
              <Link to="/rotinas">Rotinas e cronograma</Link>
            </li>
            <li>
              <Link to="/cachos-infantis">Cachos infantis</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>
            <Link to="/produtos">Prateleira</Link>
          </h4>
          <ul>
            <li>
              <Link to="/produtos">Catálogo completo</Link>
            </li>
            <li>
              <Link to="/produtos/cremes-de-pentear">Cremes de pentear</Link>
            </li>
            <li>
              <Link to="/produtos/mascaras">Máscaras e tratamentos</Link>
            </li>
            <li>
              <Link to="/produtos/infantil">Produtos infantis</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>
            <Link to="/#contato">Portal</Link>
          </h4>
          <ul>
            <li>
              <Link to="/#historia">Sobre o portal</Link>
            </li>
            <li>
              <Link to="/sobre-a-redacao">Sobre a redação</Link>
            </li>
            <li>
              <Link to="/#contato">Fale com a gente</Link>
            </li>
            <li>
              <Link to="/politica-de-privacidade">Política de privacidade</Link>
            </li>
            <li>
              <Link to="/transparencia">Transparência de afiliados</Link>
            </li>
            <li>
              <Link to="/mapa-do-site">Índice do site</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Universo dos Cachos. Todos os direitos reservados.</p>
        <p className="footer-line">
          Conteúdo editorial, sem indicação médica. Cachos são <em>únicos</em> — e o seu também.
        </p>
      </div>

      <div className="footer-bottom" style={{ paddingTop: 6 }}>
        <p>Este site contém links de afiliados. Preços e disponibilidade são conferidos na loja.</p>
        <p className="footer-line">
          <Link to="/politica-de-privacidade#cookies" style={{ color: "inherit", textDecoration: "underline" }}>
            Cookies e privacidade
          </Link>
          {" · "}
          <Link to="/transparencia" style={{ color: "inherit", textDecoration: "underline" }}>
            Como ganhamos com indicações
          </Link>
        </p>
      </div>
    </footer>
  );
}
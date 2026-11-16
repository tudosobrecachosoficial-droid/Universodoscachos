import { Component, type ErrorInfo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

type Props = { children: ReactNode };
type State = { failed: boolean };

/* A rendering error used to leave a blank page. This keeps the visitor oriented
   and logs the cause to the console so it can be found and fixed. */
class Boundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Erro ao exibir a página:", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <main className="wrap" style={{ paddingTop: 160, paddingBottom: 120 }} role="alert">
        <div className="empty">
          <i className="ri-error-warning-line" aria-hidden="true" />
          <h1>Não foi possível exibir esta página</h1>
          <p>
            Algo deu errado ao montar o conteúdo. Tente recarregar ou volte para o início; o
            restante do site continua funcionando.
          </p>
          <button type="button" className="section-link" onClick={() => window.location.reload()}>
            Recarregar a página
          </button>
          <a className="section-link" href="/">
            Voltar ao início
          </a>
        </div>
      </main>
    );
  }
}

/** Resets automatically when the visitor navigates to another page. */
export default function ErrorBoundary({ children }: Props) {
  const location = useLocation();
  return <Boundary key={location.pathname}>{children}</Boundary>;
}

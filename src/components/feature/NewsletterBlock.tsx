import { useState, type FormEvent } from "react";
import { leadsService } from "@/services";

type Status = "idle" | "sending" | "success" | "error";

export default function NewsletterBlock() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const honey = String(data.get("company_alt") ?? "").trim();

    if (honey) {
      setStatus("success");
      setFeedback("Pronto. Você vai receber as próximas cartas do universo.");
      form.reset();
      return;
    }

    const email = String(data.get("email") ?? "").trim();

    setStatus("sending");
    setFeedback("");

    try {
      await leadsService.subscribe(email);
      setStatus("success");
      setFeedback("Inscrição registrada. Você pode sair da lista quando quiser.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Não conseguimos registrar agora. Verifique o e-mail e tente novamente em instantes.");
    }
  };

  return (
    <section className="news" aria-labelledby="news-title">
      <div className="wrap news-inner">
        <div>
          <p className="stamp">Newsletter</p>
          <h2 id="news-title" className="news-title">
            Receba dicas para cuidar
            <br />
            melhor dos seus <em className="accent">cachos</em>.
          </h2>
          <p className="news-sub">
            Uma carta por semana, com uma ideia prática de cada vez. Sem exageros, sem promessa de
            milagre. Você pode se descadastrar a qualquer momento.
          </p>
        </div>

        <form className="news-form" id="form-newsletter-udc" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="news-email">Seu e-mail</label>
            <input
              id="news-email"
              name="email"
              type="email"
              placeholder="voce@email.com"
              autoComplete="email"
              required
            />
          </div>

          <input
            className="hp-field"
            type="text"
            name="company_alt"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            readOnly
          />

          <button className="btn-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Quero receber"}
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </button>

          <p className="news-legal">
            Ao se inscrever, você concorda com o uso do seu e-mail apenas para o envio da newsletter,
            conforme a LGPD.
          </p>

          {status === "success" ? <p className="form-status">{feedback}</p> : null}
          {status === "error" ? <p className="form-status is-error">{feedback}</p> : null}
        </form>
      </div>
    </section>
  );
}
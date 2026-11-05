import { useState, type FormEvent } from "react";

const SUBMIT_ADDR = "https://readdy.ai/api/form/dbm7405umrrn79g3ib80";

type NewsResponse = {
  code?: string;
  message?: string;
  meta?: { message?: string; detail?: string };
};

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

    const body = new URLSearchParams();
    data.forEach((value, key) => {
      if (key === "company_alt") return;
      body.append(key, String(value));
    });

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch(SUBMIT_ADDR, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      const responseText = await response.text();
      let parsed: NewsResponse | null = null;
      try {
        parsed = JSON.parse(responseText) as NewsResponse;
      } catch {
        parsed = null;
      }
      const serverMessage =
        parsed?.meta?.message || parsed?.meta?.detail || parsed?.message || responseText;
      const succeeded = response.ok && parsed?.code === "OK";

      if (succeeded) {
        setStatus("success");
        setFeedback("Inscrição confirmada. Você pode sair da lista quando quiser.");
        form.reset();
      } else {
        const readable =
          typeof serverMessage === "string" && serverMessage.trim() && serverMessage.length <= 180
            ? serverMessage
            : "Não conseguimos registrar agora. Tente novamente em instantes.";
        setStatus("error");
        setFeedback(readable);
      }
    } catch {
      setStatus("error");
      setFeedback("Não conseguimos registrar agora. Verifique sua conexão e tente novamente.");
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

        <form className="news-form" id="form-newsletter-udc" data-readdy-form onSubmit={handleSubmit}>
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
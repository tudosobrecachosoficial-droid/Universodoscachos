import { useState, type FormEvent } from "react";
import Panel from "@/pages/home/components/Panel";
import { leadsService } from "@/services";

const MAX_MESSAGE = 500;

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPanel() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const honey = String(data.get("website_alt") ?? "").trim();

    if (honey) {
      setStatus("success");
      setFeedback("Mensagem enviada. Obrigada por escrever para a gente.");
      form.reset();
      setMessageLength(0);
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      await leadsService.sendContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        curlType: String(data.get("tipo_de_cacho") ?? ""),
        message: String(data.get("message") ?? "").slice(0, MAX_MESSAGE),
      });
      setStatus("success");
      setFeedback("Recebemos sua mensagem. Respondemos com calma, em até dois dias.");
      form.reset();
      setMessageLength(0);
    } catch {
      setStatus("error");
      setFeedback("Não conseguimos enviar agora. Verifique os campos e tente novamente em instantes.");
    }
  };

  return (
    <Panel
      id="contato"
      side="left"
      image="https://readdy.ai/api/search-image?query=Quiet%20warm%20interior%20corner%20with%20a%20simple%20wooden%20chair%2C%20a%20folded%20linen%20towel%20and%20dried%20flowers%2C%20soft%20afternoon%20light%20through%20a%20window%2C%20subject%20small%20in%20the%20right%20third%20of%20the%20frame%2C%20left%20half%20empty%20smooth%20rose%20plaster%20wall%2C%20warm%20muted%20brown%20and%20beige%20palette%2C%20calm%20minimalist%20editorial%20photography%2C%20no%20text&width=2400&height=1350&seq=udc-contact-2404&orientation=landscape"
      alt="Canto de uma sala de tons quentes, com cadeira de madeira, toalha de linho e flores secas."
    >
      <div className="panel-copy" data-parallax="-0.08">
        <p className="stamp" data-reveal>
          05 — Contato
        </p>
        <h2 data-reveal>
          Vamos falar
          <br />
          do seu <em className="accent">cabelo</em>.
        </h2>
        <p className="sub" data-reveal>
          Conte o seu tipo de cacho e a rotina que você já usa. A gente responde de pessoa para pessoa.
        </p>

        <form className="form-card" id="form-contato-udc" onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field" data-reveal>
              <label htmlFor="contact-name">Seu nome</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Como podemos te chamar"
                autoComplete="name"
                required
              />
            </div>
            <div className="field" data-reveal>
              <label htmlFor="contact-email">E-mail</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="voce@email.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="field" data-reveal>
            <label htmlFor="contact-type">Seu tipo de cacho</label>
            <select id="contact-type" name="tipo_de_cacho" defaultValue="">
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="Ondulado">Ondulado (2A, 2B, 2C)</option>
              <option value="Cacheado">Cacheado (3A, 3B, 3C)</option>
              <option value="Crespo">Crespo (4A, 4B, 4C)</option>
              <option value="Misto">Misto</option>
              <option value="Ainda não sei">Ainda não sei</option>
            </select>
          </div>

          <div className="field" data-reveal>
            <label htmlFor="contact-message">Sua mensagem</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Conte um pouco da sua rotina, das dúvidas e do que você procura."
              maxLength={MAX_MESSAGE}
              onChange={(event) => setMessageLength(event.currentTarget.value.length)}
              required
            />
            <span className="counter">
              {messageLength}/{MAX_MESSAGE}
            </span>
          </div>

          <input
            className="hp-field"
            type="text"
            name="website_alt"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            readOnly
          />

          <button className="btn-primary" type="submit" disabled={status === "sending"} data-reveal>
            {status === "sending" ? "Enviando..." : "Enviar mensagem"}
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </button>

          {status === "success" ? <p className="form-status">{feedback}</p> : null}
          {status === "error" ? <p className="form-status is-error">{feedback}</p> : null}
        </form>
      </div>
    </Panel>
  );
}
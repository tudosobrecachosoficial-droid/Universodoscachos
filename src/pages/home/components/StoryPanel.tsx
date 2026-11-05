import Panel from "@/pages/home/components/Panel";

export default function StoryPanel() {
  return (
    <Panel
      id="historia"
      side="left"
      image="https://readdy.ai/api/search-image?query=Editorial%20beauty%20photograph%20of%20a%20Black%20woman%20with%20voluminous%20natural%20curly%20hair%20seated%20near%20a%20tall%20window%20in%20a%20warm%20plaster%20room%2C%20main%20subject%20placed%20in%20the%20right%20third%20of%20the%20frame%2C%20the%20left%20half%20calm%20and%20empty%20with%20soft%20sunlit%20rose%20plaster%20wall%2C%20warm%20brown%20and%20nude%20tones%2C%20soft%20diffused%20window%20light%2C%20shallow%20depth%20of%20field%2C%20cinematic%2C%20intimate%2C%20no%20text&width=2400&height=1350&seq=udc-story-2401&orientation=landscape"
      alt="Mulher de cachos volumosos sentada perto de uma janela, em uma sala de paredes claras e luz quente."
    >
      <div className="panel-copy" data-parallax="-0.08">
        <p className="stamp" data-reveal>
          02 — A história
        </p>
        <h2 data-reveal>
          Nasceu de uma
          <br />
          conversa entre <em className="accent">amigas</em>.
        </h2>
        <p className="sub" data-reveal>
          Um portal feito por quem vive o cabelo natural todos os dias — sem fórmulas mágicas, sem
          promessas que não se sustentam no espelho.
        </p>
        <div className="pull" data-reveal>
          <p>
            Reunimos o que aprendemos em anos de testes: o que funciona para ondulados, o que alivia
            crespos, o que realmente define sem pesar.
          </p>
        </div>
      </div>
    </Panel>
  );
}
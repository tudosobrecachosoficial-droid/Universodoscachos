export const VIDEO_URL =
  "https://storage.helloreaddy.io/project_files/b5e22659-71be-4067-9c58-b8251d087645/2ea64034-a649-43e7-8da6-db0d9160c832_scrub.mp4";

export const VIDEO_COVER =
  "https://v3b.fal.media/files/b/0ab13e58/RgXfM-1cNlNT9uHn8itk0_S1c9ugwg.jpg";

export type BeatMotion = "rise" | "drift" | "zoom" | "track";

export type Beat = {
  id: string;
  from: number;
  to: number;
  pos: "left" | "right" | "bottom" | "center" | "top";
  depth?: "soft" | "busy";
  tone: "light" | "dark";
  motion: BeatMotion;
  stamp: string;
  headline: string;
  sub?: string;
  points?: string[];
  chips?: string[];
  cta?: { label: string; href: string };
  hero?: boolean;
};

/* The film is 14 seconds long. Each act of the shot list carries one beat:
   0–3 s, 3–6 s, 6–9 s, 9–11 s, 11–14 s. */
export const BEATS: Beat[] = [
  {
    id: "overview",
    from: 0,
    to: 0.2143,
    pos: "left",
    depth: "soft",
    tone: "dark",
    motion: "track",
    stamp: "Ato 01 · Universo dos Cachos",
    headline: "Seus cachos merecem<br>todo esse <em class=\"accent\">cuidado</em>.",
    sub: "Descobertas, rotinas e produtos para valorizar a beleza natural dos seus fios.",
    cta: { label: "Descobrir meu tipo de cacho", href: "#tipos-de-cachos" },
    hero: true,
  },
  {
    id: "rotina",
    from: 0.2143,
    to: 0.4286,
    pos: "left",
    depth: "soft",
    tone: "dark",
    motion: "rise",
    stamp: "Ato 02 · Cuidado de verdade",
    headline: "Cada fio pede<br>um <em class=\"accent\">ritual</em> próprio.",
    points: [
      "Hidratação que devolve maciez",
      "Nutrição que sela o brilho",
      "Finalização leve, sem pesar",
    ],
  },
  {
    id: "promessa",
    from: 0.4286,
    to: 0.6429,
    pos: "bottom",
    depth: "soft",
    tone: "dark",
    motion: "zoom",
    stamp: "Ato 03 · A promessa",
    headline: "Bonito no espelho.<br>Melhor no <em class=\"accent\">toque</em>.",
    sub: "Sem promessas milagrosas: só o cuidado certo, todos os dias.",
  },
  {
    id: "semana",
    from: 0.6429,
    to: 0.7857,
    pos: "left",
    depth: "soft",
    tone: "dark",
    motion: "drift",
    stamp: "Ato 04 · Rotina da semana",
    headline: "Uma semana<br>mais <em class=\"accent\">leve</em>.",
    points: [
      "Domingo — hidratação profunda",
      "Quarta — nutrição e selagem",
      "Sexta — finalização e day after",
    ],
  },
  {
    id: "comunidade",
    from: 0.7857,
    to: 1,
    pos: "left",
    depth: "soft",
    tone: "dark",
    motion: "rise",
    stamp: "Ato 05 · Comunidade",
    headline: "Um universo<br>inteiro de <em class=\"accent\">cachos</em>.",
    sub: "Conteúdo para adultos, crianças e para quem está começando agora.",
    cta: { label: "Falar com a gente", href: "#contato" },
  },
];

export const CURL_TYPES = [
  {
    idx: "01",
    title: "Ondulados · 2A, 2B, 2C",
    text: "Fios em ondas suaves, com movimento em S. Costumam pedir leveza na finalização e produtos com pouco peso.",
  },
  {
    idx: "02",
    title: "Cacheados · 3A, 3B, 3C",
    text: "Cachos definidos, de diâmetro médio a fino. Hidratação frequente e ativadores de definição fazem diferença.",
  },
  {
    idx: "03",
    title: "Crespos · 4A, 4B, 4C",
    text: "Coils apertados e volumosos, naturalmente mais secos. Nutrição e reconstrução entram no cronograma com carinho.",
  },
  {
    idx: "04",
    title: "Mistos · mais de um padrão",
    text: "É comum ter ondulado no topo e crespo na nuca. O guia ajuda a ler cada área — não a engessar o seu cabelo.",
  },
];
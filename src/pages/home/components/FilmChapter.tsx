import { useRef, type CSSProperties } from "react";
import { useChapterScrub } from "@/hooks/useChapterScrub";
import { BEATS, VIDEO_COVER, VIDEO_URL } from "@/pages/home/data";
import SplitHeadline from "@/pages/home/components/SplitHeadline";

export default function FilmChapter() {
  const chapterRef = useRef<HTMLElement | null>(null);
  useChapterScrub(chapterRef);

  return (
    <section
      ref={chapterRef}
      className="chapter"
      id="filme"
      data-video={VIDEO_URL}
      data-label="Universo dos Cachos"
      style={{ "--beat-count": BEATS.length } as CSSProperties}
    >
      <div className="stage">
        <img
          className="plate"
          src={VIDEO_COVER}
          width={1920}
          height={1080}
          fetchpriority="high"
          decoding="async"
          alt="Close-up de uma mulher negra de cachos volumosos ao lado de uma janela, sol da manhã sobre o cabelo natural."
        />
        <div className="veil" aria-hidden="true" />

        {BEATS.map((beat) => (
          <div
            key={beat.id}
            className={beat.hero ? "beat beat-hero" : "beat"}
            id={beat.id}
            data-from={beat.from}
            data-to={beat.to}
            data-pos={beat.pos}
            data-depth={beat.depth ?? "soft"}
            data-tone={beat.tone}
            data-motion={beat.motion}
          >
            <p className="stamp">{beat.stamp}</p>
            <SplitHeadline
              html={beat.headline}
              as={beat.hero ? "h1" : "h2"}
              className={beat.hero ? "hero-title" : undefined}
            />
            {beat.sub ? <p className="sub">{beat.sub}</p> : null}
            {beat.points ? (
              <ul className="points">
                {beat.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            ) : null}
            {beat.cta ? (
              <a className="cta" href={beat.cta.href}>
                {beat.cta.label}
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ))}

        <div className="cue" aria-hidden="true">
          <span className="cue-label">Role para explorar</span>
          <span className="cue-track" />
          <span className="cue-dot" />
        </div>
      </div>
    </section>
  );
}
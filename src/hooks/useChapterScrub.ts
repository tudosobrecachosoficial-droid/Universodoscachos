import { useEffect, type RefObject } from "react";

type BeatRef = {
  el: HTMLElement;
  from: number;
  to: number;
  parts: HTMLElement[];
  lines: HTMLElement[];
  chips: HTMLElement[];
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);

/**
 * Scroll-scrubbed film chapter. Every move inside the chapter is a pure function of
 * scroll progress, so it reverses perfectly and freezes when the visitor stops.
 */
export function useChapterScrub(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const chapter = ref.current;
    if (!chapter) return undefined;

    const TOUCH = window.matchMedia("(pointer: coarse)").matches;
    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (REDUCED) {
      chapter.classList.add("is-static");
      return () => chapter.classList.remove("is-static");
    }
    if (TOUCH) chapter.classList.add("is-touch");

    const stage = chapter.querySelector<HTMLElement>(".stage");
    if (!stage) return undefined;
    const stageEl = stage;
    const src = chapter.dataset.video || "";

    const beats: BeatRef[] = Array.from(chapter.querySelectorAll<HTMLElement>(".beat")).map((b) => ({
      el: b,
      from: parseFloat(b.dataset.from || "0") || 0,
      to: b.dataset.to ? parseFloat(b.dataset.to) : 1,
      parts: Array.from(b.children).filter(
        (c): c is HTMLElement =>
          c instanceof HTMLElement && !c.classList.contains("chips") && !c.classList.contains("cue"),
      ),
      lines: Array.from(b.querySelectorAll<HTMLElement>(".line-in")),
      chips: Array.from(b.querySelectorAll<HTMLElement>(".chips li")),
    }));

    const LERP = TOUCH ? 0.03 : 0.02;
    const FADE = 0.1;
    const STAGGER = 0.035;
    const NEAR = "120% 0px";
    const FAR = "260% 0px";
    const EPS = 1 / 60;
    const CREEP = TOUCH ? 0.012 : 0.01;

    let video: HTMLVideoElement | null = null;
    let rolling = false;
    let current = 0;
    let raf = 0;
    let disposed = false;

    const afterLCP = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", () => resolve(), { once: true });
      // never let far-below-the-fold pictures hold the film back
      window.setTimeout(resolve, 2500);
    }).then(
      () =>
        new Promise<void>((resolve) => {
          const w = window as Window & {
            requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
          };
          if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(resolve, { timeout: 1500 });
          else window.setTimeout(resolve, 300);
        }),
    );

    function detach() {
      if (!video) return;
      stageEl.classList.remove("is-live");
      video.removeAttribute("src");
      video.load();
      video.remove();
      video = null;
      rolling = false;
    }

    function warmUp(v: HTMLVideoElement) {
      const roll = () => {
        if (video !== v || rolling || v.readyState >= 2) return;
        rolling = true;
        v.loop = true;
        v.play().catch(() => {
          chapter?.classList.add("is-static");
          detach();
        });
      };
      const started = v.play();
      if (started && typeof started.then === "function") {
        started
          .then(() => {
            if (!rolling) v.pause();
          })
          .catch(roll);
      }
      window.setTimeout(roll, 4000);
    }

    async function attach() {
      if (video || disposed || !src) return;
      await afterLCP;
      if (video || disposed) return;
      const v = document.createElement("video");
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.disablePictureInPicture = true;
      v.tabIndex = -1;
      v.setAttribute("aria-hidden", "true");
      v.src = src;
      v.addEventListener(
        "loadeddata",
        () => {
          if (video !== v) return;
          stageEl.classList.add("is-live");
        },
        { once: true },
      );
      stageEl.insertBefore(v, stageEl.querySelector(".veil"));
      video = v;
      if (TOUCH) warmUp(v);
    }

    const progressOf = () => {
      const rect = chapter.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      return travel <= 0 ? 0 : clamp01(-rect.top / travel);
    };

    const setState = (el: HTMLElement, o: number, leaving: boolean) => {
      el.style.setProperty("--o", o.toFixed(3));
      el.style.setProperty("--o-inv", (1 - o).toFixed(3));
      el.style.setProperty("--dir", leaving ? "1" : "-1");
    };

    const drive = (el: HTMLElement, local: number, i: number, n: number, first: boolean, last: boolean) => {
      const tIn = first ? 1 : clamp01((local - i * STAGGER) / FADE);
      const tOut = last ? 1 : clamp01((1 - local - (n - 1 - i) * STAGGER) / FADE);
      setState(el, ease(Math.min(tIn, tOut)), tOut < 1);
    };

    const applyBeats = () => {
      for (const b of beats) {
        const span = b.to - b.from;
        const local = span > 0 ? (current - b.from) / span : 0;
        const inside = local >= 0 && local <= 1;
        const first = b.from <= 0;
        const last = b.to >= 1;
        const held = (local < 0 && first) || (local > 1 && last);
        b.el.style.setProperty("--local", clamp01(local).toFixed(3));
        if (!inside) {
          [...b.parts, ...b.lines, ...b.chips].forEach((el) => setState(el, held ? 1 : 0, local > 1));
        } else {
          b.parts.forEach((el, i) => drive(el, local, i, b.parts.length, first, last));
          b.lines.forEach((el, i) => drive(el, local, i * 0.8, b.lines.length * 0.8, first, last));
          b.chips.forEach((el, i) => drive(el, local, 2 + i, 2 + b.chips.length, first, last));
        }
        const edge = inside
          ? Math.min(first ? 1 : clamp01(local / FADE), last ? 1 : clamp01((1 - local) / FADE))
          : 0;
        b.el.classList.toggle("is-on", held || edge > 0.5);
        b.el.classList.toggle("is-leaving", inside && !last && 1 - local < FADE + STAGGER * 4);
      }
    };

    const applyVideo = (v: HTMLVideoElement, t: number) => {
      if (!isFinite(v.duration) || v.seeking) return;
      if (Math.abs(v.currentTime - t) < EPS) return;
      v.currentTime = t;
    };

    function glide(span: number) {
      const gap = progressOf() - current;
      let step = gap * LERP;
      if (span > 0) {
        const rest = Math.abs(gap) * span;
        const floor = CREEP / span;
        if (rest < EPS) step = gap;
        else if (Math.abs(step) < floor) step = Math.sign(gap) * Math.min(floor, Math.abs(gap));
      }
      current += step;
    }

    const tick = () => {
      const out = video ? (Number(chapter.dataset.out) || video.duration || 0) : 0;
      const span = Math.max(0, out);
      glide(span);
      const rect = chapter.getBoundingClientRect();
      if (!(rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5)) {
        raf = requestAnimationFrame(tick);
        return;
      }
      applyBeats();
      chapter.style.setProperty("--t", clamp01(current).toFixed(4));
      if (span > 0 && video) applyVideo(video, current * span);
      raf = requestAnimationFrame(tick);
    };

    const inView = new Set<Element>();
    const run = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) inView.add(e.target);
        else inView.delete(e.target);
      });
      if (inView.size && !raf) raf = requestAnimationFrame(tick);
      if (!inView.size && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    run.observe(chapter);

    const findChapter = (target: Element | null) => (target === chapter ? chapter : null);
    const near = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && findChapter(e.target)) void attach(); }),
      { rootMargin: NEAR },
    );
    const far = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (!e.isIntersecting && findChapter(e.target)) detach(); }),
      { rootMargin: FAR },
    );
    near.observe(chapter);
    far.observe(chapter);

    const navHandlers: Array<{ el: HTMLAnchorElement; fn: (ev: Event) => void }> = [];
    document.querySelectorAll<HTMLAnchorElement>("a[data-progress]").forEach((a) => {
      const fn = (ev: Event) => {
        ev.preventDefault();
        const p = parseFloat(a.dataset.progress || "0") || 0;
        const top = chapter.getBoundingClientRect().top + window.scrollY;
        const travel = chapter.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + travel * Math.min(p + 0.02, 1), behavior: "smooth" });
      };
      a.addEventListener("click", fn);
      navHandlers.push({ el: a, fn });
    });

    return () => {
      disposed = true;
      run.disconnect();
      near.disconnect();
      far.disconnect();
      if (raf) cancelAnimationFrame(raf);
      detach();
      navHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    };
  }, [ref]);
}
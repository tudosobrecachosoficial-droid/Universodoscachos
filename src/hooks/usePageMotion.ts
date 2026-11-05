import { useEffect } from "react";

/**
 * Everything after the chapter: nav state, scroll cue, entry reveals, panel parallax,
 * manifesto word lighting and resample smoothing for enlarged pictures.
 */
export function usePageMotion() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    const chapter = document.querySelector<HTMLElement>(".chapter");

    const onScrollState = () => {
      nav?.classList.toggle("is-solid", window.scrollY > 24);
      chapter?.classList.toggle("is-scrolled", window.scrollY > 80);
    };
    onScrollState();
    window.addEventListener("scroll", onScrollState, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let revealIO: IntersectionObserver | null = null;

    if (!reduced) {
      revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            revealIO?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px" },
      );

      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const siblings = Array.from(el.parentElement?.children ?? []).filter((c) =>
          c.hasAttribute("data-reveal"),
        );
        el.style.setProperty("--i", String(Math.max(0, siblings.indexOf(el))));
        revealIO?.observe(el);
      });
    }

    /* manifesto: wrap words once, then light them from the section's scroll progress */
    const manifestos = Array.from(document.querySelectorAll<HTMLElement>("[data-words]")).map((node) => {
      if (node.dataset.wrapped !== "1") {
        const wrap = (parent: Node) => {
          Array.from(parent.childNodes).forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const text = child.textContent ?? "";
              const frag = document.createDocumentFragment();
              text.split(/(\s+)/).forEach((part) => {
                if (!part) return;
                if (/^\s+$/.test(part)) {
                  frag.appendChild(document.createTextNode(part));
                  return;
                }
                const word = document.createElement("span");
                word.className = "w";
                word.textContent = part;
                frag.appendChild(word);
              });
              child.replaceWith(frag);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              wrap(child);
            }
          });
        };
        wrap(node);
        node.dataset.wrapped = "1";
      }
      return {
        section: node.closest("section") ?? node,
        words: Array.from(node.querySelectorAll<HTMLElement>(".w")),
      };
    });

    const light = () => {
      const h = window.innerHeight;
      manifestos.forEach((m) => {
        const rect = m.section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > h) return;
        const p = Math.min(1, Math.max(0, (h * 0.8 - rect.top) / (rect.height + h * 0.45)));
        const n = m.words.length;
        m.words.forEach((w, i) => {
          w.style.setProperty("--lit", p * (n + 1) > i + 1 ? "1" : "0");
        });
      });
    };

    /* panel parallax: each layer offsets by its distance from the viewport centre */
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let paintRaf = 0;
    const paint = () => {
      paintRaf = 0;
      const h = window.innerHeight;
      layers.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -h || rect.top > 2 * h) return;
        const centre = (rect.top + rect.height / 2 - h / 2) / h;
        let speed = parseFloat(el.dataset.parallax || "0.32");
        if (el.classList.contains("panel-bg") && window.innerWidth < 780) speed = Math.min(speed, 0.22);
        el.style.setProperty("--py", `${(centre * -speed * h).toFixed(1)}px`);
      });
    };

    /* resample smoothing: a small source must be soft, never blocky */
    const soften = (el: HTMLImageElement | HTMLVideoElement) => {
      const nw = el instanceof HTMLImageElement ? el.naturalWidth : el.videoWidth;
      const nh = el instanceof HTMLImageElement ? el.naturalHeight : el.videoHeight;
      if (!nw || !nh) return;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const factor = Math.max(rect.width / nw, rect.height / nh);
      const px = factor <= 1.15 ? 0 : Math.min(1.6, Math.max(0.4, (factor - 1) * 1.2));
      el.style.setProperty("--soften", `${px.toFixed(2)}px`);
    };
    const SOFT = ".stage video, .plate, .panel-bg";
    const softenAll = () =>
      document.querySelectorAll<HTMLImageElement | HTMLVideoElement>(SOFT).forEach(soften);
    const onAssetLoad = (e: Event) => {
      const target = e.target;
      if (target instanceof HTMLImageElement || target instanceof HTMLVideoElement) {
        if (target.matches(SOFT)) soften(target);
      }
    };
    document.addEventListener("load", onAssetLoad, true);
    document.addEventListener("loadedmetadata", onAssetLoad, true);
    window.addEventListener("resize", softenAll);
    softenAll();

    let lightRaf = 0;
    const onScroll = () => {
      if (!lightRaf) {
        lightRaf = requestAnimationFrame(() => {
          lightRaf = 0;
          light();
        });
      }
      if (!paintRaf) paintRaf = requestAnimationFrame(paint);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", paint);
    light();
    paint();

    return () => {
      window.removeEventListener("scroll", onScrollState);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", paint);
      window.removeEventListener("resize", softenAll);
      document.removeEventListener("load", onAssetLoad, true);
      document.removeEventListener("loadedmetadata", onAssetLoad, true);
      revealIO?.disconnect();
      if (paintRaf) cancelAnimationFrame(paintRaf);
      if (lightRaf) cancelAnimationFrame(lightRaf);
    };
  }, []);
}
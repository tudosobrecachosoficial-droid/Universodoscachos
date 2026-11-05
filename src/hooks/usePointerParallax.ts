import { useEffect } from "react";

/**
 * Pointer parallax — the front planes (beat copy, chips, panel copy) follow the mouse a
 * few pixels. Input-driven, mouse only, never under reduced motion.
 */
export function usePointerParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const root = document.documentElement;
    const MLERP = 0.08;
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;
    let raf = 0;

    const settle = () => {
      mx += (tx - mx) * MLERP;
      my += (ty - my) * MLERP;
      root.style.setProperty("--mx", mx.toFixed(3));
      root.style.setProperty("--my", my.toFixed(3));
      raf = Math.abs(tx - mx) + Math.abs(ty - my) > 0.002 ? requestAnimationFrame(settle) : 0;
    };

    const aim = (x: number, y: number) => {
      tx = x;
      ty = y;
      if (!raf) raf = requestAnimationFrame(settle);
    };

    const onMove = (e: PointerEvent) => {
      aim((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => aim(0, 0);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
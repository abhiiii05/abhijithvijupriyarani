"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const root = document.documentElement;

      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
      });

      const onScroll = () => ScrollTrigger.update();
      const onVelocity = () => {
        const velocity = Math.min(Math.abs(lenis.velocity), 46);
        const weight = 470 + (velocity / 46) * 210;
        root.style.setProperty("--hero-wght", weight.toFixed(1));
      };

      lenis.on("scroll", onScroll);
      lenis.on("scroll", onVelocity);

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const hero = document.querySelector<HTMLElement>(".hero-name");
      const onPointer = (event: PointerEvent) => {
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        const centreX = rect.left + rect.width * 0.42;
        const centreY = rect.top + rect.height * 0.5;
        const distance = Math.hypot(event.clientX - centreX, event.clientY - centreY);
        const reach = Math.hypot(window.innerWidth, window.innerHeight) * 0.85;
        const proximity = Math.max(0, 1 - distance / reach);
        const opticalSize = 58 + proximity * 74;
        root.style.setProperty("--hero-opsz", opticalSize.toFixed(1));
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const lines = Array.from(
        document.querySelectorAll<HTMLElement>(".reveal-line > span"),
      );
      gsap.set(lines, { yPercent: 115 });
      for (const line of lines) {
        gsap.to(line, {
          yPercent: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line.parentElement ?? line,
            start: "top 92%",
            once: true,
          },
        });
      }

      const refresh = () => ScrollTrigger.refresh();
      void document.fonts.ready.then(refresh);
      ScrollTrigger.refresh();

      cleanup = () => {
        window.removeEventListener("pointermove", onPointer);
        gsap.ticker.remove(tick);
        lenis.destroy();
        for (const trigger of ScrollTrigger.getAll()) trigger.kill();
        root.style.removeProperty("--hero-wght");
        root.style.removeProperty("--hero-opsz");
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}

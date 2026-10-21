"use client";

import { useEffect, useRef } from "react";

type GsapContext = { revert: () => void };

export function MigrationDiagram() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    let ctx: GsapContext | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      if (!alive || !ref.current) return;

      ctx = gsap.context(() => {
        gsap.set(".draw-stroke", { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(".draw-stroke", {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.8,
          },
        });
        gsap.from(".draw-node", {
          opacity: 0,
          y: 9,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
      }, ref.current);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, []);

  return (
    <div className="diagram-box" ref={ref}>
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-labelledby="migration-title migration-desc"
      >
        <title id="migration-title">
          Wipro migration: one legacy monolith to four extracted services
        </title>
        <desc id="migration-desc">
          A legacy monolith containing four services is separated into four
          extracted services with full functional parity, validated against a
          regression suite of forty or more cases. Three critical defects were
          caught before launch.
        </desc>
        <defs>
          <marker
            id="bp-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e2924" />
          </marker>
          <marker
            id="bp-arrow-accent"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#c1492f" />
          </marker>
        </defs>

        <rect
          className="draw-node"
          x="16"
          y="30"
          width="252"
          height="212"
          fill="none"
          stroke="#1e2924"
          strokeWidth="1.4"
        />
        <text className="pipe-label" x="30" y="52">
          Legacy monolith
        </text>
        <text className="pipe-sub" x="30" y="66">
          four core services, coupled
        </text>

        {[
          [36, 92, "SVC 01"],
          [152, 92, "SVC 02"],
          [36, 172, "SVC 03"],
          [152, 172, "SVC 04"],
        ].map(([x, y, label]) => (
          <g key={label} className="draw-node">
            <rect
              x={x as number}
              y={y as number}
              width="100"
              height="56"
              fill="#e8e3d3"
              stroke="#5c665f"
              strokeWidth="1"
            />
            <text
              className="pipe-sub"
              x={(x as number) + 10}
              y={(y as number) + 25}
            >
              {label}
            </text>
            <text
              className="pipe-sub"
              x={(x as number) + 10}
              y={(y as number) + 40}
            >
              unchanged surface
            </text>
          </g>
        ))}

        <path
          className="draw-stroke"
          d="M 268 136 H 500"
          fill="none"
          stroke="#c1492f"
          strokeWidth="1.4"
          pathLength={1}
          markerEnd="url(#bp-arrow-accent)"
        />
        <text className="pipe-sub" x="302" y="124" fill="#c1492f">
          extract · full parity
        </text>
        <text className="pipe-sub" x="302" y="156">
          four deploys, one contract
        </text>

        <rect
          className="draw-node"
          x="500"
          y="30"
          width="384"
          height="212"
          fill="#efd9cf"
          fillOpacity="0.32"
          stroke="#c1492f"
          strokeWidth="1.4"
        />
        <text className="pipe-label" x="514" y="52">
          Modernised architecture
        </text>
        <text className="pipe-sub" x="514" y="66">
          extracted services, data integrity repaired
        </text>

        {[
          [520, 92, "SVC 01"],
          [650, 92, "SVC 02"],
          [520, 172, "SVC 03"],
          [650, 172, "SVC 04"],
        ].map(([x, y, label]) => (
          <g key={label} className="draw-node">
            <rect
              x={x as number}
              y={y as number}
              width="112"
              height="56"
              fill="#f2eee2"
              stroke="#c1492f"
              strokeWidth="1.2"
            />
            <text
              className="pipe-sub"
              x={(x as number) + 10}
              y={(y as number) + 25}
              fill="#c1492f"
            >
              {label}
            </text>
            <text
              className="pipe-sub"
              x={(x as number) + 10}
              y={(y as number) + 40}
            >
              parity verified
            </text>
          </g>
        ))}

        <g className="draw-node">
          <rect
            x="286"
            y="276"
            width="240"
            height="34"
            fill="#f2eee2"
            stroke="#1e2924"
            strokeWidth="1"
          />
          <text className="pipe-sub" x="298" y="297">
            Regression suite · 40+ cases
          </text>
        </g>
        <g className="draw-node">
          <rect
            x="560"
            y="276"
            width="240"
            height="34"
            fill="#efd9cf"
            stroke="#c1492f"
            strokeWidth="1.2"
          />
          <text className="pipe-sub" x="572" y="297" fill="#c1492f">
            3 critical defects caught pre-launch
          </text>
        </g>
        <path
          className="draw-stroke"
          d="M 594 242 V 276"
          fill="none"
          stroke="#5c665f"
          strokeWidth="1"
          strokeDasharray="3 4"
          markerEnd="url(#bp-arrow)"
        />
        <path
          className="draw-stroke"
          d="M 686 242 V 276"
          fill="none"
          stroke="#5c665f"
          strokeWidth="1"
          strokeDasharray="3 4"
          markerEnd="url(#bp-arrow)"
        />
        <text className="pipe-sub" x="16" y="322">
          BP-01 · SERVICE EXTRACTION · REV C · NTS
        </text>
        <text className="pipe-sub" x="742" y="322">
          DRAWN 2026 · IIIT VADODARA / WIPRO
        </text>
      </svg>
      <p className="diagram-hint">Swipe the drawing to pan</p>
    </div>
  );
}

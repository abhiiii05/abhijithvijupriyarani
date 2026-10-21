"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const ShaderName = dynamic(
  () => import("./ShaderName").then((module) => module.ShaderName),
  { ssr: false, loading: () => null },
);

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

const LINES = ["ABHIJITH", "VIJU PRIYA", "RANI"] as const;

export function NameStage({ name }: { name: string }) {
  const [enabled, setEnabled] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return;
    gl.getExtension("WEBGL_lose_context")?.loseContext();

    const idleWindow = window as IdleWindow;
    let firstFrame = 0;
    let secondFrame = 0;
    let idle = 0;
    let timer = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        if (idleWindow.requestIdleCallback) {
          idle = idleWindow.requestIdleCallback(() => setEnabled(true), {
            timeout: 900,
          });
        } else {
          timer = window.setTimeout(() => setEnabled(true), 240);
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      idleWindow.cancelIdleCallback?.(idle);
      window.clearTimeout(timer);
    };
  }, []);

  const handleReady = useCallback(() => setLive(true), []);
  const handleFail = useCallback(() => {
    setLive(false);
    setEnabled(false);
  }, []);

  return (
    <div className="name-stage" data-live={live ? "true" : "false"}>
      <h1 className="sr-only">{name}</h1>
      <div className="name-fallback" aria-hidden="true" data-testid="name-fallback">
        {LINES.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      {enabled ? (
        <ShaderName
          lines={LINES}
          live={live}
          onReady={handleReady}
          onFail={handleFail}
        />
      ) : null}
    </div>
  );
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";

type ShaderNameProps = {
  lines: readonly string[];
  live: boolean;
  onReady: () => void;
  onFail: () => void;
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uInk;
  uniform vec3 uAccent;

  float bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2.0 + a.y * a.y * 0.75);
  }

  float bayer4(vec2 a) {
    return bayer2(a * 0.5) * 0.25 + bayer2(a);
  }

  void main() {
    vec2 uv = vUv;
    float distanceToPointer = distance(vUv, uPointer);

    float ripple = sin(distanceToPointer * 44.0 - uTime * 2.1);
    ripple *= 0.011 * uPointerStrength * smoothstep(0.5, 0.0, distanceToPointer);

    uv.x += ripple;
    uv.x += uScroll * 0.05 * sin(vUv.y * 7.0 + uTime * 0.35);
    uv.y += ripple * 0.35;

    float glyph = texture2D(uTexture, uv).a;
    if (glyph < 0.01) discard;

    float threshold = bayer4(gl_FragCoord.xy * 0.72);
    float mask = smoothstep(threshold - 0.15, threshold + 0.15, glyph);

    if (mask < 0.02) discard;

    float wave = sin(uv.y * 8.0 + uTime * 0.32);
    float field = uv.x * 0.9 + wave * 0.16 + uScroll * 0.45 - distanceToPointer * 0.55;
    field = clamp(field, 0.0, 1.0);

    float accent = step(threshold, field);
    vec3 colour = mix(uInk, uAccent, accent);

    gl_FragColor = vec4(colour, mask);
  }
`;

class CanvasBoundary extends Component<
  { onFail: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Plane({
  texture,
  fallback,
}: {
  texture: THREE.CanvasTexture | null;
  fallback: THREE.DataTexture;
}) {
  const { viewport, gl } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0.5, 0.48));
  const pointerStrength = useRef(0);
  const scroll = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: fallback },
      uPointer: { value: new THREE.Vector2(0.5, 0.48) },
      uPointerStrength: { value: 0 },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uInk: { value: new THREE.Color("#171816") },
      uAccent: { value: new THREE.Color("#e13b1f") },
    }),
    [fallback],
  );

  useEffect(() => {
    const shader = material.current;
    if (!shader) return;
    shader.uniforms.uTexture.value = texture ?? fallback;
  }, [texture, fallback]);

  useEffect(() => {
    const host = gl.domElement.parentElement;
    if (!host) return;

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      pointer.current.set(
        Math.min(1.15, Math.max(-0.15, x)),
        Math.min(1.15, Math.max(-0.15, y)),
      );
      pointerStrength.current = 1;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  useFrame((state) => {
    const shader = material.current;
    if (!shader) return;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    scroll.current += (target - scroll.current) * 0.07;

    shader.uniforms.uTime.value = state.clock.getElapsedTime();
    shader.uniforms.uPointer.value.lerp(pointer.current, 0.075);
    shader.uniforms.uScroll.value = scroll.current;
    shader.uniforms.uPointerStrength.value = THREE.MathUtils.lerp(
      shader.uniforms.uPointerStrength.value as number,
      pointerStrength.current,
      0.08,
    );
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function ShaderCanvas({
  texture,
  fallback,
  onSuccess,
  onFail,
}: {
  texture: THREE.CanvasTexture | null;
  fallback: THREE.DataTexture;
  onSuccess: () => void;
  onFail: () => void;
}) {
  return (
    <CanvasBoundary onFail={onFail}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          onSuccess();
          gl.domElement.addEventListener(
            "webglcontextlost",
            (event) => {
              event.preventDefault();
              onFail();
            },
            { once: true },
          );
        }}
      >
        <Plane texture={texture} fallback={fallback} />
      </Canvas>
    </CanvasBoundary>
  );
}

export function ShaderName({ lines, live, onReady, onFail }: ShaderNameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [mounted, setMounted] = useState(false);

  const fallback = useMemo(() => {
    const data = new Uint8Array([0, 0, 0, 0]);
    const map = new THREE.DataTexture(data, 1, 1);
    map.needsUpdate = true;
    return map;
  }, []);

  useEffect(() => () => fallback.dispose(), [fallback]);

  const paint = useCallback(async () => {
    const host = hostRef.current;
    if (!host) return;

    const rect = host.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return;

    await document.fonts.ready;

    const family =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-archivo")
        .trim() || "sans-serif";

    try {
      await document.fonts.load(`900 120px ${family}`);
    } catch {
      // The fallback family is still usable.
    }

    if (!hostRef.current) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(2, Math.round(rect.width * ratio));
    const height = Math.max(2, Math.round(rect.height * ratio));

    const canvas = canvasRef.current ?? document.createElement("canvas");
    canvasRef.current = canvas;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, width, height);

    const padding = 0;
    const widthLimit = width * 0.99;

    context.letterSpacing = "-0.055em";
    context.font = `900 100px ${family}`;
    const widest = Math.max(
      ...lines.map((line) => context.measureText(line).width),
      1,
    );

    const gapRatio = 0.84;
    const sizeByWidth = (100 * widthLimit) / widest;
    const sizeByHeight =
      height / ((lines.length - 1) * gapRatio + 0.76);
    const fontSize = Math.max(
      12,
      Math.floor(Math.min(sizeByWidth, sizeByHeight)),
    );

    context.letterSpacing = "-0.055em";
    context.font = `900 ${fontSize}px ${family}`;
    context.fillStyle = "#ffffff";
    context.textAlign = "left";
    context.textBaseline = "alphabetic";

    const lineGap = fontSize * gapRatio;
    const capHeight = fontSize * 0.76;
    const blockHeight = lineGap * (lines.length - 1) + capHeight;
    const firstBaseline = (height - blockHeight) / 2 + capHeight;

    lines.forEach((line, index) => {
      context.fillText(line, padding, firstBaseline + index * lineGap);
    });

    const next = new THREE.CanvasTexture(canvas);
    next.minFilter = THREE.LinearFilter;
    next.magFilter = THREE.LinearFilter;
    next.generateMipmaps = false;

    setTexture((previous) => {
      previous?.dispose();
      return next;
    });
  }, [lines]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let frame = 0;
    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        void paint();
      });
    };

    void paint();
    const observer = new ResizeObserver(schedule);
    observer.observe(host);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [paint]);

  useEffect(() => {
    if (!texture || !mounted) return;
    const frame = window.requestAnimationFrame(onReady);
    return () => window.cancelAnimationFrame(frame);
  }, [texture, mounted, onReady]);

  return (
    <div
      ref={hostRef}
      className="shader-host"
      aria-hidden="true"
      data-testid={live ? "shader-canvas" : "shader-pending"}
    >
      <ShaderCanvas
        texture={texture}
        fallback={fallback}
        onSuccess={() => setMounted(true)}
        onFail={onFail}
      />
    </div>
  );
}

# DECISIONS

## Environment

- **Dedicated git repo.** The `portfolio` folder sits inside a larger unrelated git
  repository. `git init` was run inside `portfolio` so commits stay scoped to this
  project and no unrelated parent files are staged.
- **Node 20.18.0**, npm 10.8.2. Next 16.4.2 requires Node >= 20.9.0, so the pinned
  toolchain is compatible.
- **PDF not readable.** The local CV PDF cannot be read by this model. The content
  was taken verbatim from the task brief; nothing was inferred from the PDF.

## Content

- `packages/content` is TypeScript source consumed via `transpilePackages`, with no
  build step. This keeps content edits instant in every app.
- Only hard numbers from the brief appear anywhere. No invented metrics, logos,
  testimonials, photo or location.
- Short factual microcopy (taglines, outcome lines, diagram annotations) lives in
  `packages/content/src/content.ts` so it can be edited in one place.

## Typography (per direction)

- 01 Index: **Fraunces** (variable display serif, `opsz`/`wght`) + **Space Grotesk**
  and **IBM Plex Mono** for metadata.
- 02 Console: **JetBrains Mono** (interface + terminal) + **Newsreader** (plain view
  headings).
- 03 Blueprint: **Space Grotesk** (titles) + **IBM Plex Mono** (drawing annotations).
- 04 Desktop: **Instrument Sans** (UI) + **DM Mono** (terminal/status).
- 05 Swiss: **Archivo** (variable, heavy widths) + **Spline Sans Mono** (metadata).

All loaded with `next/font/google`, variable where available, `display: swap`, and
metric fallbacks to avoid layout shift.

## Library notes

- GSAP + ScrollTrigger used in 01 and 03 only; Lenis in 01 only. Not installed in
  apps that do not use them.
- Motion used for shared-element expansion (01) and window springs (04).
- React Three Fiber / three / drei / postprocessing only in 05, dynamically imported
  with `ssr: false` after first paint. 03 uses hand-written SVG (allowed by the
  brief) rather than shipping a second WebGL stack.
- Zustand only in 03 (simulation) and 04 (window manager).

## Palette

- 02 Console is the single dark direction (warm charcoal, amber phosphor).
- 01, 03, 04, 05 are light/tinted. No pure #000/#fff as surface colours.

## Toolchain deviations

- **ESLint 9.39.5, not 10.x.** ESLint 10 requires Node `^20.19.0 || ^22.13.0 || >=24`;
  this machine runs Node 20.18.0. Pin 9.39.5 (latest line that supports 20.18) and
  leave Next/React on their current stable versions.
- **TypeScript 7.0.2** is current stable. TS 7 removed `baseUrl`, so `paths` are
  declared per app relative to each tsconfig. Verified with `tsc --noEmit`.
- **03 Blueprint diagrams are hand-written SVG, no D3 runtime.** The brief allows
  "D3 helpers or custom code"; custom SVG keeps the bundle smaller and the
  simulation state explicit. GSAP ScrollTrigger powers the Wipro draw-on.
- **QA servers are started directly with `next start`** (not via npm scripts) so the
  Playwright runner can own and stop the process cleanly on Windows.
- **Mobile diagrams scroll horizontally with a visible "swipe to pan" hint.** The
  surrounding narrative carries the same information without scrolling.

## Verification

- Playwright 1.64.1 + Chromium installed locally for QA. Screenshots and console /
  network assertions are produced by `scripts/qa.mjs`.
- QA runs against production servers (`next start`) on ports 3001–3005.

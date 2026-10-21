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

- 01 Index: **Fraunces** (variable display serif, `opsz`/`wght`) + **Karla** for
  body and **IBM Plex Mono** for metadata.
- 02 Console: **JetBrains Mono** (interface + terminal) + **Newsreader** (plain view
  headings).
- 03 Blueprint: **Space Grotesk** (titles) + **IBM Plex Mono** (drawing annotations).
- 04 Desktop: **Instrument Sans** (UI) + **DM Mono** (terminal/status).
- 05 Swiss: **Archivo** (variable, heavy widths) + **Spline Sans Mono** (metadata).
- 06 Swissdesk: the same **Archivo** + **Spline Sans Mono** as 05. The point of the
  hybrid is that the palette and type survive the move into a window manager.

All loaded with `next/font/google`, variable where available, `display: swap`, and
metric fallbacks to avoid layout shift.

## Library notes

- GSAP + ScrollTrigger used in 01 and 03 only; Lenis in 01 only. Not installed in
  apps that do not use them.
- Motion used for shared-element expansion (01) and window springs (04).
- React Three Fiber + three in 05 and 06, dynamically imported with `ssr: false`
  after first paint. No drei or postprocessing. 03 uses hand-written SVG (allowed
  by the brief) rather than shipping a second WebGL stack.
- Zustand in 03 (simulation), 04 and 06 (window managers).

## Palette

- 02 Console is the single dark direction (warm charcoal, amber phosphor).
- 01, 03, 04, 05, 06 are light/tinted. No pure #000/#fff as surface colours.
- 06 reuses the 05 palette exactly: `#f1efe7` paper, `#171816` ink, `#c6c3b5`
  rules and `#e13b1f` vermilion. It does not introduce a second accent.

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
- **05 shader name is a generated CanvasTexture in a custom GLSL plane.** Archivo
  900 is drawn into a transparent 2D canvas (matching the static fallback's
  tracking), then sampled in a fragment shader with a 4×4 Bayer dither between ink
  and vermilion. Fully transparent texture pixels are discarded, so the dither
  cannot print a background field outside the glyphs.
- **05 shader waits for first paint.** Two `requestAnimationFrame` ticks plus
  `requestIdleCallback` mount the Canvas. The cursor ripple is multiplied by a
  pointer-strength uniform that starts at zero, so the static composition is not
  distorted before the visitor moves. Reduced motion, missing WebGL, an error
  boundary and a lost context all fall back to the static Archivo setting.
- **02 Console has no terminal library.** `lib/shell.ts` is a hand-written command
  interpreter over a small virtual filesystem (home, work, projects, record) with
  path resolution, Tab completion and arrow-key history. The terminal renders as a
  scrolling log with the prompt inside the log, so output reads top-down like a real
  shell rather than a mock chat window.
- **02 plain view is a full second layout, not a fallback.** Every record section is
  typeset in Newsreader from the same content package; the toggle preserves the
  current theme and is reachable from the top bar and the `plain` command.
- **02 autofocus is limited to fine pointers.** The input takes focus on desktop so
  the caret is visible, but not on touch devices, where autofocus would open the
  keyboard over the boot output. All focus calls use `preventScroll`.
- **05 mobile name stays within the stage.** The fallback uses `min(12.1vw, 11.3rem)`
  so "VIJU PRIYA" fits a 390px viewport; section headings stack and use
  `11.5vw` to prevent the "Capabilities" heading from setting the document width.
- **04 window state lives in one Zustand store.** `lib/desktop-store.ts` owns pane
  metadata, window rectangles, stacking order and open/minimised state. Panes are
  rendered by id from that store, so the taskbar, palette, shortcuts and drag logic
  all read the same source. Rectangles are clamped to the stage on open, drag, resize
  and stage resize (`ResizeObserver`), so a window can never be lost off-screen.
- **04 opens with one window, not a scattered desktop.** Only Work is open on load:
  the strongest proof sits in front, and the wallpaper (name, role, availability)
  stays legible behind it. Opening everything at once reads as clutter and hides the
  type composition.
- **04 uses hard-offset shadows, not blur.** Paper windows cast a flat two-layer
  offset shadow on the tinted desk. Combined with a single ultramarine accent and ink
  titlebars on the focused window, depth comes from drawing, not glass or glow.
- **04 drag and resize use pointer capture.** Dragging the titlebar or the bottom-right
  handle calls `setPointerCapture`, so the gesture survives fast movement outside the
  window. Keyboard users get the taskbar and `Alt+1`–`6`; the palette traps Tab and
  returns focus to its opener on close.
- **04 mobile is a stacked sheet list, not tiny windows.** Below 900px the desktop and
  taskbar are removed and the same panes render as full-width sheets under a sticky
  3×2 section nav. Shrinking floating windows to phone width would make the record
  unreadable.
- **04 motion is limited to window open/close and focus.** Motion springs run through
  `MotionConfig reducedMotion="user"`; with reduced motion the windows appear without
  travel. Palette and hover transitions stay under 200ms.
- **04 palette is the only command surface.** `Cmd/Ctrl+K` opens it, arrow keys and
  Enter select, `Alt+1`–`6` open panes directly, and `Escape` closes the top window
  when the palette is not open. There is no separate menu bar, which keeps the
  desktop from turning into a mock OS.

- **06 is a deliberate hybrid, not a sixth theme.** It takes the 05 palette,
  Archivo/Spline pairing, 12-column stage and dithered name, then applies the 04
  window manager. The contrast between the oversized type on the wall and the paper
  windows in front of it is the idea; neither direction alone produces it.
- **06 promotes the app launcher to the primary top band and drops the taskbar.**
  Six heavy numbered buttons show open state with an ink fill and a 4px vermilion
  top rule. A bottom taskbar plus a top launcher would duplicate the same affordance
  and make the page read as an OS imitation rather than a portfolio.
- **06 focus is drawn, not glowed.** The focused window switches to an ink titlebar
  and a hard vermilion offset shadow; unfocused windows keep a neutral ink shadow.
  Only one window can carry it, so stacking order is legible at a glance.
- **06 switches to the mobile layout at 1081px, not 04's 900px.** Between roughly
  900 and 1080px the name and a 600px window overlap in a way that hides both. The
  mobile stacked sheets are the honest fallback at that width.
- **06 opens with only Work on screen.** The strongest proof is in front, the name
  stays legible behind it, and the remaining apps are one launcher click away.
  Opening everything would reproduce the clutter 04 already rejected.
- **06 removes repeated copy rather than filling space.** Availability appears once
  in the masthead, role words once in the wall kicker, and the hero tagline and
  metrics are gone because Work already states them. Each responsive layout has one
  footer. The wall foot carries only the interaction hint and the 01–06 index.
- **06 clamps windows with a 16px margin.** Drag, resize and store clamping all leave
  room for the vermilion offset shadow; at the earlier 10px edge the shadow was
  clipped by the stage. Window state stays local and intentionally does not persist.
- **06 reuses the 05 shader implementation.** `NameStage`/`ShaderName` are copied with
  the same lazy mount, Bayer dither and static fallback, so the hybrid keeps the 05
  signature without introducing a second rendering approach.

## Verification

- Playwright 1.64.1 + Chromium installed locally for QA. Screenshots and console /
  network assertions are produced by `scripts/qa.mjs`.
- QA runs against production servers (`next start`) on ports 3001–3006.

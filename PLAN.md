# PLAN

## Shared setup
- [x] Root npm workspaces + pinned dependency versions
- [x] Shared tsconfig, .gitignore, git repo
- [x] AGENTS.md / PLAN.md / DECISIONS.md
- [x] `packages/content` typed content, exact copy only
- [x] `scripts/qa.mjs` (Playwright + chromium)
- [x] Verify install, typecheck, lint baseline

## 03 Blueprint (port 3003)
- [x] Engineering-drawing shell, grid paper, title blocks
- [x] File Processing System SVG with animated job particles
- [x] Zustand simulation: add 25, kill worker, idempotent retry, counters, event log
- [x] Wipro migration and Obelisk verification diagrams
- [x] Scroll-scrubbed draw-on (GSAP ScrollTrigger), reduced-motion static
- [x] Typecheck / lint / build
- [x] Playwright: screenshots, kill-worker interaction, reduced motion
- [x] Critique + fix pass
- [x] Commit

## 01 Index (port 3001)
- [x] Editorial type system, paper palette, hairline rules
- [x] Typographic table of contents (proof + projects)
- [x] Shared-element case-study expansion (Motion layoutId)
- [x] GSAP line reveals + scroll-velocity variable font response
- [x] Typecheck / lint / build
- [x] Playwright: screenshots, expand row, reduced motion
- [x] Critique + fix pass
- [x] Commit

## 05 Swiss (port 3005)
- [x] Strict 12-column grid, heavy name, numbered sections
- [x] Two flat colours + tinted black/white
- [x] Lazy WebGL dithered/displaced name shader with cursor + scroll
- [x] Static fallback when WebGL unavailable / reduced motion
- [x] Numbered work rows
- [x] Typecheck / lint / build
- [x] Playwright: screenshots, canvas mount + fallback check, reduced motion
- [x] Critique + fix pass
- [x] Commit

## 02 Console (port 3002)
- [x] Warm charcoal + amber phosphor, CRT overlay (reduced-motion off)
- [x] Virtual filesystem command interpreter
- [x] help/ls/cd/cat/pwd/clear/whoami/git log/contact/skills/open/theme
- [x] Tab completion + arrow-key history
- [x] Plain view toggle with identical content
- [x] Typecheck / lint / build
- [x] Playwright: screenshots, `ls`, `cat`, reduced motion
- [x] Critique + fix pass
- [x] Commit

## 04 Desktop (port 3004)
- [x] Original restrained window manager
- [x] Drag, resize, focus stacking, spring physics
- [x] Windows: Work, Projects, Experience, Skills, Record, Contact
- [x] Taskbar, keyboard shortcuts, Cmd/Ctrl+K palette
- [x] Mobile stacked sheets with sticky section nav
- [x] Typecheck / lint / build
- [x] Playwright: screenshots, open + drag window, reduced motion
- [x] Critique + fix pass
- [x] Commit

## Final QA
- [ ] `npm run build:all`
- [ ] `npm run typecheck:all`
- [ ] `npm run lint:all`
- [ ] `npm run qa` all directions
- [ ] README with run instructions, comparison table, recommendation
- [ ] Final commit

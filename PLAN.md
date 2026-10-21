# PLAN

## Shared setup
- [ ] Root npm workspaces + pinned dependency versions
- [ ] Shared tsconfig, .gitignore, git repo
- [ ] AGENTS.md / PLAN.md / DECISIONS.md
- [ ] `packages/content` typed content, exact copy only
- [ ] `scripts/qa.mjs` (Playwright + chromium)
- [ ] Verify install, typecheck, lint baseline

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
- [ ] Editorial type system, paper palette, hairline rules
- [ ] Typographic table of contents (proof + projects)
- [ ] Shared-element case-study expansion (Motion layoutId)
- [ ] GSAP line reveals + scroll-velocity variable font response
- [x] Typecheck / lint / build
- [ ] Playwright: screenshots, expand row, reduced motion
- [x] Critique + fix pass
- [x] Commit

## 05 Swiss (port 3005)
- [ ] Strict 12-column grid, heavy name, numbered sections
- [ ] Two flat colours + tinted black/white
- [ ] Lazy WebGL dithered/displaced name shader with cursor + scroll
- [ ] Static fallback when WebGL unavailable / reduced motion
- [ ] Numbered work rows
- [x] Typecheck / lint / build
- [ ] Playwright: screenshots, canvas mount + fallback check, reduced motion
- [x] Critique + fix pass
- [x] Commit

## 02 Console (port 3002)
- [ ] Warm charcoal + amber phosphor, CRT overlay (reduced-motion off)
- [ ] Virtual filesystem command interpreter
- [ ] help/ls/cd/cat/pwd/clear/whoami/git log/contact/skills/open/theme
- [ ] Tab completion + arrow-key history
- [ ] Plain view toggle with identical content
- [x] Typecheck / lint / build
- [ ] Playwright: screenshots, `ls`, `cat`, reduced motion
- [x] Critique + fix pass
- [x] Commit

## 04 Desktop (port 3004)
- [ ] Original restrained window manager
- [ ] Drag, resize, focus stacking, spring physics
- [ ] Windows: About, Work, Experience, Skills, Contact, Terminal
- [ ] Dock/taskbar, keyboard shortcuts, Cmd/Ctrl+K palette
- [ ] Mobile stacked app list
- [x] Typecheck / lint / build
- [ ] Playwright: screenshots, open + drag window, reduced motion
- [x] Critique + fix pass
- [x] Commit

## Final QA
- [ ] `npm run build:all`
- [ ] `npm run typecheck:all`
- [ ] `npm run lint:all`
- [ ] `npm run qa` all directions
- [ ] README with run instructions, comparison table, recommendation
- [ ] Final commit

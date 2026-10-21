# Portfolio directions

Five complete portfolio sites for Abhijith Viju Priya Rani, built as one
npm-workspaces monorepo. Each app is an independent Next.js App Router project with
its own layout, type, colour, motion and interaction model. All five read the same
typed content package.

## Run

Requires Node >= 20.9 (tested on 20.18.0).

```bash
npm install
npm run dev:1   # http://localhost:3001  01 Index
npm run dev:2   # http://localhost:3002  02 Console
npm run dev:3   # http://localhost:3003  03 Blueprint
npm run dev:4   # http://localhost:3004  04 Desktop
npm run dev:5   # http://localhost:3005  05 Swiss
```

Build and verify:

```bash
npm run build:all       # production build for every app
npm run typecheck:all
npm run lint:all
npm run qa              # Playwright checks + screenshots into qa/<app>/
```

`npm run qa` builds nothing: run `npm run build:all` first. It starts each app on
its port with `next start`, asserts no console/page/network errors, checks horizontal
overflow at 1440 and 390, captures desktop, mobile and reduced-motion screenshots,
and exercises the per-direction interaction (expand a case study, run shell commands,
kill a worker, drag a window, fall back without WebGL).

## The five directions

| # | Direction | Concept | Signature detail | Port |
| - | --------- | ------- | ---------------- | ---- |
| 01 | Index | Editorial, type-led work index on warm paper | Case-study rows expand in place; Fraunces responds to scroll velocity | 3001 |
| 02 | Console | Shell-driven portfolio in warm charcoal and amber | Real command interpreter over a virtual filesystem, with a typeset plain view | 3002 |
| 03 | Blueprint | Engineering drawing of the work and the systems behind it | File Processing System diagram with live job particles; kill a worker and watch retries | 3003 |
| 04 | Desktop | Restrained window manager, one window open on load | Draggable, resizable paper windows with a Cmd/Ctrl+K palette | 3004 |
| 05 | Swiss | Strict 12-column grid, heavy Archivo, two flat colours | Dithered WebGL name shader with cursor and scroll displacement, plus static fallback | 3005 |

Content order is identical everywhere: Wipro migration, Vasco Foods production
backend, Solarium contract, then projects, skills, achievements, leadership and
contact. Only facts from the brief appear; there are no invented metrics, logos,
testimonials or photos.

## Which one to use

- **Backend-engineering recruiters: 03 Blueprint.** It shows how the systems work
  rather than only listing them. The File Processing System diagram, the retry
  simulation and the migration drawing make the Wipro and Vasco work legible in
  under a minute.
- **Freelance clients: 02 Console.** The shell is memorable and proves technical
  comfort immediately, while the plain view gives a non-technical client a normal
  readable record in one click.
- **Broadest audience: 01 Index.** Fastest to scan, strongest typography, and the
  expanding case studies keep the strongest proof above the fold.
- 04 Desktop and 05 Swiss are the two most visual directions. 04 is playful but still
  readable; 05 is the most graphic and works best as a design-forward calling card.

## Layout

```
apps/01-index/      editorial index           port 3001
apps/02-console/    shell / command line      port 3002
apps/03-blueprint/  interactive diagrams      port 3003
apps/04-desktop/    window manager            port 3004
apps/05-swiss/      grid + WebGL name         port 3005
packages/content/   typed content, single source of copy
scripts/qa.mjs      Playwright QA runner
qa/<app>/           generated screenshots and logs (gitignored)
```

## Notes

- `packages/content` is TypeScript source consumed through `transpilePackages`, so
  copy edits apply to every app with no build step.
- Reduced motion disables the shader, parallax, smooth scroll and window springs.
- Each direction uses one accent colour and tinted neutrals; there are no gradients,
  glass panels or decorative icon sets.
- Every footer carries a short "How this was built" line naming the stack.
- Decisions, environment constraints and known deviations are recorded in
  `DECISIONS.md`; the build checklist is `PLAN.md`.

# AGENTS.md

## Project goal

Five complete, production-quality portfolio websites for Abhijith Viju Priya Rani,
built as one npm-workspaces monorepo. Every direction is an independent Next.js App
Router project with its own layout, typography, colour, motion and interaction. All
five import the same typed content package. The sites are meant to be evaluated by
backend-engineering recruiters and freelance clients.

## Repo layout

```
/                        root workspace (npm workspaces: apps/*, packages/*)
/AGENTS.md               working rules
/PLAN.md                 build checklist
/DECISIONS.md            decisions, deviations, known issues
/README.md               run instructions + direction comparison
/packages/content/       shared typed content (`content` + types)
/apps/01-index/          editorial, type-led index            port 3001
/apps/02-console/        terminal / command interpreter       port 3002
/apps/03-blueprint/      interactive system diagrams          port 3003
/apps/04-desktop/        original window-manager desktop      port 3004
/apps/05-swiss/          12-column Swiss grid + WebGL shader  port 3005
/scripts/qa.mjs          Playwright screenshots + interactions
/qa/<app>/               generated QA artifacts (gitignored)
```

Content order is identical in every direction: strongest proof first
(Wipro migration, Vasco Foods production backend, Solarium contract), then projects,
then skills, achievements, leadership, contact.

## Commands

From the repo root:

```bash
npm install                 # install all workspaces
npm run dev:1               # 01-index   http://localhost:3001
npm run dev:2               # 02-console http://localhost:3002
npm run dev:3               # 03-blueprint
npm run dev:4               # 04-desktop
npm run dev:5               # 05-swiss
npm run build:all           # build every app (and content typecheck)
npm run typecheck:all       # tsc --noEmit in every workspace
npm run lint:all            # eslint in every app
npm run qa                  # Playwright QA against built apps
```

Per app:

```bash
npm run typecheck -w @portfolio/03-blueprint
npm run lint -w @portfolio/03-blueprint
npm run build -w @portfolio/03-blueprint
```

## Hard design rules

Never:
- Purple/blue/teal gradients, gradient text, glowing orbs, blurred blobs, glassmorphism, neon outlines.
- A default dark-mode gradient hero.
- Emoji as icons; icon-in-circle feature grids; decorative icon libraries.
- Three-equal-cards-in-a-row layouts, anywhere.
- Copy like "Hi, I'm…", "passionate about", "crafting digital experiences", "building the future", "leveraging", "seamless", "cutting-edge". Write plainly: what he built and what happened.
- Floating-particle backgrounds, scroll-jacking that traps the user, bouncing scroll arrows, typewriter effects (except the Console cursor).
- The same hover animation on every element. Motion is sparse and meaningful.
- Inter/Roboto/system fonts as the main type choice.
- Lorem ipsum, placeholder text, fake logos, stock photos, missing images shown as broken boxes.
- More than one accent colour per direction; pure #000 or #fff (use tinted neutrals).
- Centred-everything layouts. Padding sections to look full.

Always:
- Obvious hierarchy through scale, weight and spacing, not decoration.
- One memorable signature detail per direction.
- Readable line lengths (55 to 75 characters) and real copy at real lengths.
- A small "How this was built" line naming the stack in the footer.

## Engineering rules

- Never guess library APIs. Check the installed version and its types/README before use.
- Pin to current stable versions. Do not downgrade Next.js or React.
- No UI kits, no shadcn, no template packs; every component is custom.
- `prefers-reduced-motion` disables parallax, smooth scroll, shaders and long animations.
- Run typecheck and lint after each meaningful chunk; never stack broken work.
- Commit after each direction passes verification.

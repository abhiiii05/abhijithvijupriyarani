import { content } from "@portfolio/content";
import type { ComponentType } from "react";
import { NameStage } from "./NameStage";
import {
  ContactPane,
  ExperiencePane,
  ProjectsPane,
  RecordPane,
  SkillsPane,
  WorkPane,
} from "./Panes";
import { paneIds, panes, type PaneId } from "@/lib/desktop-store";

const paneContent: Record<PaneId, ComponentType> = {
  work: WorkPane,
  projects: ProjectsPane,
  experience: ExperiencePane,
  skills: SkillsPane,
  record: RecordPane,
  contact: ContactPane,
};

const titleParts = content.title
  .split(" | ")
  .flatMap((part) => part.split(" & "));

export function MobileDesk() {
  return (
    <div className="mobile" id="top">
      <header className="m-mast">
        <a className="m-brand" href="#top">
          <strong>AVPR</strong>
          <span>Backend systems</span>
        </a>
        <p className="m-avail">
          <span className="m-dot" aria-hidden="true" />
          {content.availability}
        </p>
      </header>

      <section className="m-hero" aria-label="Introduction">
        <p className="m-kicker">
          {titleParts.map((part) => (
            <span key={part}>{part}</span>
          ))}
          <span>Portfolio / 2026</span>
        </p>

        <div className="m-name">
          <NameStage name={content.name} />
        </div>
      </section>

      <nav className="m-launch" aria-label="Applications">
        <div className="m-launch-head">
          <span>Applications / 2026</span>
          <span>06 entries</span>
        </div>
        <ul>
          {paneIds.map((id) => (
            <li key={id}>
              <a href={`#m-${id}`}>
                <span className="m-launch-index">{panes[id].index}</span>
                <span className="m-launch-name">{panes[id].name}</span>
                <span className="m-launch-note">{panes[id].note}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="m-stack">
        {paneIds.map((id) => {
          const Pane = paneContent[id];

          return (
            <section className="m-sheet" id={`m-${id}`} key={id}>
              <div className="m-bar">
                <span className="m-number">{panes[id].index}</span>
                <h2>{panes[id].title}</h2>
                <span className="m-note">{panes[id].note}</span>
              </div>
              <div className="m-body">
                <Pane />
              </div>
            </section>
          );
        })}
      </main>

      <footer className="m-foot">
        <p>
          <span>How this was built</span> Next.js App Router, React, Motion,
          Zustand and React Three Fiber. Archivo, Spline Sans Mono and a custom
          GLSL dither on the name.
        </p>
        <a href="#top">Top &uarr;</a>
      </footer>
    </div>
  );
}

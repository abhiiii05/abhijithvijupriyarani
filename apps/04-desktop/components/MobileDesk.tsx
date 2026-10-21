import { content } from "@portfolio/content";
import type { ComponentType } from "react";
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

export function MobileDesk() {
  return (
    <div className="mobile">
      <header className="m-head">
        <p className="m-kicker">
          <span className="m-mark" aria-hidden="true" />
          Desktop / stacked
        </p>
        <h1 className="m-name">{content.name}</h1>
        <p className="m-role">{content.title}</p>
        <p className="m-tagline">{content.tagline}</p>
        <p className="m-avail">
          <span className="m-avail-mark" aria-hidden="true" />
          {content.availability}
        </p>
      </header>

      <nav className="m-index" aria-label="Sections">
        {paneIds.map((id) => (
          <a key={id} href={`#m-${id}`}>
            <span aria-hidden="true">{panes[id].index}</span>
            {panes[id].name}
          </a>
        ))}
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
          <span>How this was built</span> Next.js App Router, React, Motion and
          Zustand. Instrument Sans and DM Mono.
        </p>
        <p className="foot-hint">Same windows, stacked for touch.</p>
      </footer>
    </div>
  );
}

"use client";

import { content } from "@portfolio/content";
import { AnimatePresence, MotionConfig } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { CommandPalette } from "./CommandPalette";
import {
  ContactPane,
  ExperiencePane,
  ProjectsPane,
  RecordPane,
  SkillsPane,
  WorkPane,
} from "./Panes";
import { DesktopWindow } from "./Window";
import {
  openWindows,
  paneIds,
  panes,
  useDesktop,
  type PaneId,
} from "@/lib/desktop-store";

const paneContent: Record<PaneId, ComponentType> = {
  work: WorkPane,
  projects: ProjectsPane,
  experience: ExperiencePane,
  skills: SkillsPane,
  record: RecordPane,
  contact: ContactPane,
};

export function Desktop() {
  const windows = useDesktop((state) => state.windows);
  const openPane = useDesktop((state) => state.openPane);
  const closeAll = useDesktop((state) => state.closeAll);
  const focusPane = useDesktop((state) => state.focusPane);
  const clampWindows = useDesktop((state) => state.clampWindows);

  const stageRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLButtonElement>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    window.requestAnimationFrame(() => {
      commandRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const openIds = openWindows({ windows });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => clampWindows(stage.clientWidth, stage.clientHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [clampWindows]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setPaletteOpen((current) => !current);
        return;
      }

      if (event.key === "Escape" && paletteOpen) {
        event.preventDefault();
        closePalette();
        return;
      }

      if (event.altKey && key >= "1" && key <= "6") {
        const id = paneIds[Number(key) - 1];
        if (!id) return;
        event.preventDefault();
        openPane(id);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePalette, openPane, paletteOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="desk">
        <header className="sysbar">
          <p className="sys-id">
            <span className="sys-mark" aria-hidden="true" />
            {content.shortName} / desktop
          </p>
          <p className="sys-mid">Backend engineering, production systems</p>
          <button
            ref={commandRef}
            type="button"
            className="sys-command"
            data-testid="palette-trigger"
            aria-haspopup="dialog"
            aria-expanded={paletteOpen}
            onClick={() => setPaletteOpen(true)}
          >
            Commands
            <kbd>Ctrl K</kbd>
          </button>
        </header>

        <div className="stage" ref={stageRef} role="main" data-testid="desk-stage">
          <div className="wall">
            <div className="wall-id">
              <p className="wall-kicker">
                <span className="wall-mark" aria-hidden="true" />
                Portfolio / desktop edition
              </p>
              <h1 className="wall-name">{content.name}</h1>
              <p className="wall-role">{content.title}</p>
            </div>

            <div className="wall-foot">
              <p className="wall-tagline">{content.tagline}</p>
              <p className="wall-avail">
                <span className="wall-avail-mark" aria-hidden="true" />
                {content.availability}
              </p>
              <p className="wall-hint">
                Drag a title bar to move it. Pull the bottom-right corner to
                resize. Alt + 1–6 opens a window.
              </p>
            </div>
          </div>

          <AnimatePresence>
            {openIds.map((id) => {
              const Pane = paneContent[id];
              return (
                <DesktopWindow key={id} id={id} boundsRef={stageRef}>
                  <Pane />
                </DesktopWindow>
              );
            })}
          </AnimatePresence>
        </div>

        <nav className="taskbar" aria-label="Applications">
          <span className="task-label">Apps</span>
          <ul className="task-list">
            {paneIds.map((id) => {
              const entry = windows[id];
              const isOpen = entry.open && !entry.minimized;

              return (
                <li key={id}>
                  <button
                    type="button"
                    data-testid={`app-${id}`}
                    data-open={isOpen}
                    aria-pressed={isOpen}
                    onClick={() =>
                      isOpen ? focusPane(id) : openPane(id)
                    }
                  >
                    <span aria-hidden="true">{panes[id].index}</span>
                    {panes[id].name}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="task-right">
            <span className="task-count">
              {String(openIds.length).padStart(2, "0")} open
            </span>
            <button
              type="button"
              className="task-clear"
              onClick={closeAll}
              disabled={openIds.length === 0}
            >
              Close all
            </button>
          </div>
        </nav>

        <footer className="desk-foot">
          <p>
            <span>How this was built</span> Next.js App Router, React, Motion
            and Zustand. Instrument Sans and DM Mono.
          </p>
          <p className="foot-hint">Windows held in local state / 2026</p>
        </footer>

        <CommandPalette
          open={paletteOpen}
          onClose={closePalette}
        />
      </div>
    </MotionConfig>
  );
}

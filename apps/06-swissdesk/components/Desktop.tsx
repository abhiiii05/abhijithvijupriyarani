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
import { NameStage } from "./NameStage";
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

const titleParts = content.title
  .split(" | ")
  .flatMap((part) => part.split(" & "));

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
        <header className="mast">
          <a className="brand" href="#desk-main">
            <strong>AVPR</strong>
            <span>Backend systems</span>
          </a>
          <p className="mast-note">
            <span className="mast-dot" aria-hidden="true" />
            {content.availability}
          </p>
          <button
            ref={commandRef}
            type="button"
            className="command"
            data-testid="palette-trigger"
            aria-haspopup="dialog"
            aria-expanded={paletteOpen}
            onClick={() => setPaletteOpen(true)}
          >
            Commands
            <kbd>Ctrl K</kbd>
          </button>
        </header>

        <nav className="launch" aria-label="Applications">
          <div className="launch-head">
            <span>Applications / 2026</span>
            <span>{String(openIds.length).padStart(2, "0")} open</span>
            <button
              type="button"
              onClick={closeAll}
              disabled={openIds.length === 0}
            >
              Close all
            </button>
          </div>
          <ul className="launch-list">
            {paneIds.map((id) => {
              const entry = windows[id];
              const isOpen = entry.open && !entry.minimized;

              return (
                <li key={id}>
                  <button
                    type="button"
                    className="launch-app"
                    data-testid={`app-${id}`}
                    data-open={isOpen}
                    aria-pressed={isOpen}
                    onClick={() => (isOpen ? focusPane(id) : openPane(id))}
                  >
                    <span className="launch-index">{panes[id].index}</span>
                    <span className="launch-name">{panes[id].name}</span>
                    <span className="launch-note">
                      {isOpen ? "Open" : panes[id].note}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className="stage"
          id="desk-main"
          ref={stageRef}
          role="main"
          data-testid="desk-stage"
        >
          <div className="stage-grid" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className="wall">
            <div className="wall-head">
              <p className="wall-kicker">
                {titleParts.map((part) => (
                  <span key={part}>{part}</span>
                ))}
                <span>Portfolio / 2026</span>
              </p>
              <div className="wall-name">
                <NameStage name={content.name} />
              </div>
            </div>

            <div className="wall-foot">
              <div className="wall-meta">
                <p className="wall-hint">
                  Drag a title bar to move it. Pull the bottom-right corner to
                  resize. Alt + 1&ndash;6 opens a window.
                </p>
                <p className="wall-index">Selected work / 01&ndash;06</p>
              </div>
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

        <footer className="desk-foot">
          <p>
            <span>How this was built</span> Next.js App Router, React, Motion,
            Zustand and React Three Fiber. Archivo, Spline Sans Mono and a
            custom GLSL dither on the name.
          </p>
          <p className="foot-note">Windows held in local state / 2026</p>
        </footer>

        <CommandPalette open={paletteOpen} onClose={closePalette} />
      </div>
    </MotionConfig>
  );
}


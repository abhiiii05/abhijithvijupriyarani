"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { content, type Metric } from "@portfolio/content";
import { useCallback, useEffect, useRef, useState } from "react";

type MetaRow = { label: string; value: string };

type Entry = {
  id: string;
  number: string;
  year: string;
  kind: string;
  title: string;
  stack: readonly string[];
  outcome: string;
  summary: string;
  bullets: readonly string[];
  metrics: readonly Metric[];
  meta: MetaRow[];
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const entries: Entry[] = [
  ...content.proof.map((item, index) => ({
    id: item.id,
    number: pad(index + 1),
    year: item.year,
    kind: item.kind,
    title: item.title,
    stack: item.stack,
    outcome: item.outcome,
    summary: item.summary,
    bullets: item.bullets,
    metrics: item.metrics,
    meta: [
      { label: "Role", value: item.role },
      { label: "Organisation", value: item.organisation },
      { label: "Period", value: item.period },
      { label: "Location", value: item.location },
    ],
  })),
  ...content.projects.map((item, index) => ({
    id: item.id,
    number: pad(index + content.proof.length + 1),
    year: item.year,
    kind: "Project",
    title: item.title,
    stack: item.stack,
    outcome: item.outcome,
    summary: item.summary,
    bullets: item.bullets,
    metrics: item.metrics,
    meta: [
      { label: "Type", value: "Project" },
      { label: "Date", value: item.date },
      { label: "Build", value: item.stack.slice(0, 2).join(" · ") },
    ],
  })),
];

export function IndexTable() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const active = entries.find((entry) => entry.id === activeId) ?? null;

  const open = useCallback((id: string) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setActiveId(id);
  }, []);

  const close = useCallback(() => {
    setActiveId(null);
  }, []);

  useEffect(() => {
    if (!active) return;
    const node = overlayRef.current;
    const previousOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    node?.scrollTo(0, 0);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveId(null);
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previousOverflow;
      document.body.style.overflow = previousBodyOverflow;
      returnFocus.current?.focus();
    };
  }, [active]);

  const layoutTransition = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 210, damping: 28 };

  return (
    <>
      <ol className="index-list" aria-label="Selected work">
        {entries.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              className="index-row"
              aria-haspopup="dialog"
              aria-label={`Open case study: ${entry.title}`}
              data-testid={`row-${entry.id}`}
              onClick={() => open(entry.id)}
            >
              <span className="row-no">{entry.number}</span>
              <span className="row-year">{entry.year}</span>
              <span className="row-title-wrap">
                {activeId === entry.id ? (
                  <span className="row-title is-hidden" aria-hidden="true">
                    {entry.title}
                  </span>
                ) : (
                  <motion.span
                    className="row-title"
                    layoutId={reduce ? undefined : `case-title-${entry.id}`}
                    transition={layoutTransition}
                  >
                    {entry.title}
                  </motion.span>
                )}
                <span className="row-kind">{entry.kind}</span>
              </span>
              <span className="row-stack">{entry.stack.slice(0, 3).join(" / ")}</span>
              <span className="row-outcome">{entry.outcome}</span>
              <span className="row-plus" aria-hidden="true">
                +
              </span>
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="study"
            className="study"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`study-title-${active.id}`}
            data-lenis-prevent
            data-testid="case-study"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
          >
            <div className="study-top">
              <div className="wrap study-top-inner">
                <span className="mono">
                  Case study {active.number} / {String(entries.length).padStart(2, "0")} ·{" "}
                  {active.year}
                </span>
                <button
                  type="button"
                  className="study-close"
                  onClick={close}
                  ref={closeRef}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="wrap study-inner">
              <div className="study-grid">
                <aside className="study-rail">
                  <span className="mono study-no">Entry {active.number}</span>
                  <span className="study-year">{active.year}</span>
                  <span className="study-kind">{active.kind}</span>
                </aside>

                <div className="study-main">
                  <motion.h2
                    className="study-title"
                    id={`study-title-${active.id}`}
                    layoutId={reduce ? undefined : `case-title-${active.id}`}
                    transition={layoutTransition}
                  >
                    {active.title}
                  </motion.h2>

                  <dl className="study-meta">
                    {active.meta.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="study-summary">{active.summary}</p>

                  <ul className="study-list">
                    {active.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  {active.metrics.length > 0 ? (
                    <div className="study-metrics" aria-label="Hard numbers">
                      {active.metrics.map((metric) => (
                        <div key={metric.label}>
                          <strong>{metric.value}</strong>
                          <span>{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <p className="study-stack">
                    Stack / {active.stack.join(" · ")}
                  </p>

                  <div className="study-foot">
                    <button type="button" onClick={close}>
                      Back to the index
                    </button>
                    <span>Esc to close</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

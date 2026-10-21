"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { paneIds, panes, useDesktop } from "@/lib/desktop-store";

type Command = {
  id: string;
  label: string;
  detail: string;
  run: () => void;
};

type PaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: PaletteProps) {
  return (
    <AnimatePresence>
      {open ? <PaletteDialog onClose={onClose} /> : null}
    </AnimatePresence>
  );
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const openPane = useDesktop((state) => state.openPane);
  const closeAll = useDesktop((state) => state.closeAll);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const windows: Command[] = paneIds.map((id) => ({
      id: `open-${id}`,
      label: `Open ${panes[id].name}`,
      detail: panes[id].title,
      run: () => openPane(id),
    }));

    return [
      ...windows,
      {
        id: "close-all",
        label: "Close all windows",
        detail: "Clear the desk",
        run: closeAll,
      },
    ];
  }, [closeAll, openPane]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.detail}`.toLowerCase().includes(needle),
    );
  }, [commands, query]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function run(command: Command | undefined) {
    if (!command) return;
    onClose();
    command.run();
  }

  return (
    <motion.div
      className="palette-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-labelledby="palette-title"
        initial={{ opacity: 0, y: -10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.995 }}
        transition={{ type: "spring", stiffness: 520, damping: 40 }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;

          const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
            "input, button:not([disabled])",
          );
          if (!focusable || focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <div className="palette-head">
          <h2 id="palette-title">Commands</h2>
          <span>Esc to close</span>
        </div>

        <input
          ref={inputRef}
          className="palette-input"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setSelected((current) =>
                filtered.length === 0
                  ? 0
                  : (current + 1) % filtered.length,
              );
            }

            if (event.key === "ArrowUp") {
              event.preventDefault();
              setSelected((current) =>
                filtered.length === 0
                  ? 0
                  : (current - 1 + filtered.length) % filtered.length,
              );
            }

            if (event.key === "Enter") {
              event.preventDefault();
              run(filtered[selected]);
            }
          }}
          placeholder="Type a window or action"
          aria-label="Search commands"
          autoComplete="off"
          spellCheck={false}
        />

        <ul className="palette-list">
          {filtered.map((command, index) => (
            <li key={command.id}>
              <button
                type="button"
                data-selected={index === selected}
                onMouseEnter={() => setSelected(index)}
                onClick={() => run(command)}
              >
                <span className="palette-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="palette-label">{command.label}</span>
                <span className="palette-detail">{command.detail}</span>
              </button>
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="palette-empty">No command matches that.</p>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

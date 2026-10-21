"use client";

import { content } from "@portfolio/content";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { PlainView } from "./PlainView";
import {
  bootLines,
  complete,
  displayPath,
  execute,
  HOME,
  type OutputLine,
  type ShellTheme,
} from "@/lib/shell";

type Entry = {
  id: number;
  prompt?: string;
  command?: string;
  lines: OutputLine[];
};

type View = "terminal" | "plain";

const quickCommands = [
  "whoami",
  "ls",
  "open wipro",
  "skills",
  "git log",
  "contact",
  "help",
];

export function Console() {
  const [view, setView] = useState<View>("terminal");
  const [cwd, setCwd] = useState(HOME);
  const [theme, setTheme] = useState<ShellTheme>("amber");
  const [entries, setEntries] = useState<Entry[]>([
    { id: 0, lines: bootLines },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draft, setDraft] = useState("");
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const idRef = useRef(1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const plainHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstView = useRef(true);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }

    if (view === "plain") {
      window.scrollTo({ top: 0, behavior: "auto" });
      plainHeadingRef.current?.focus({ preventScroll: true });
    } else {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [view]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [entries, notice]);

  const runCommand = useCallback(
    (raw: string) => {
      const command = raw.trim();
      const prompt = displayPath(cwd);

      setInput("");
      setNotice(null);
      setHistoryIndex(-1);
      setDraft("");

      if (!command) {
        setEntries((previous) => [
          ...previous,
          { id: idRef.current++, prompt, command: "", lines: [] },
        ]);
        return;
      }

      const result = execute(command, { cwd, theme });
      setCwd(result.state.cwd);
      setTheme(result.state.theme);
      setHistory((previous) => [...previous, command]);

      if (result.clear) {
        setEntries([]);
      } else {
        setEntries((previous) => [
          ...previous,
          {
            id: idRef.current++,
            prompt,
            command,
            lines: result.lines,
          },
        ]);
      }

      if (result.togglePlain) setView("plain");
    },
    [cwd, theme],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      const result = complete(input, cwd);

      if (result.value !== undefined && result.value !== input) {
        setInput(result.value);
      }

      if (result.matches.length > 1) {
        setNotice(result.matches.join("   "));
      } else if (result.matches.length === 0) {
        setNotice("no matches");
      } else {
        setNotice(null);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;

      if (historyIndex === -1) {
        setDraft(input);
        setHistoryIndex(history.length - 1);
        setInput(history[history.length - 1]);
      } else if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(history[next]);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;

      if (historyIndex < history.length - 1) {
        const next = historyIndex + 1;
        setHistoryIndex(next);
        setInput(history[next]);
      } else {
        setHistoryIndex(-1);
        setInput(draft);
      }
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setEntries([]);
      setNotice(null);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      if (!input.trim()) return;

      setEntries((previous) => [
        ...previous,
        {
          id: idRef.current++,
          prompt: displayPath(cwd),
          command: input,
          lines: [{ text: "^C", tone: "muted" }],
        },
      ]);
      setInput("");
      setNotice(null);
      setHistoryIndex(-1);
    }
  }

  function runQuick(command: string) {
    runCommand(command);
    window.requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
  }

  function handleViewToggle() {
    setView((current) => (current === "plain" ? "terminal" : "plain"));
  }

  return (
    <div className="console" data-theme={theme}>
      <header className="topbar">
        <p className="topbar-id">
          <span className="topbar-mark" aria-hidden="true" />
          abhijith@portfolio
        </p>
        <p className="topbar-path">
          {view === "terminal" ? displayPath(cwd) : "~/plain-view"}
        </p>
        <button
          type="button"
          className="view-toggle"
          data-testid="plain-view-toggle"
          aria-pressed={view === "plain"}
          onClick={handleViewToggle}
        >
          {view === "plain" ? "Terminal view" : "Plain view"}
        </button>
      </header>

      <h1 className="sr-only" hidden={view === "plain"}>
        {content.name} — {content.title}
      </h1>

      <main className="workspace" data-view={view}>
        <section
          className="terminal-shell"
          aria-label="Interactive terminal"
          hidden={view !== "terminal"}
        >
          <div className="terminal-chrome">
            <span>tty1 / zsh</span>
            <span>{displayPath(cwd)}</span>
            <span className="chrome-status">
              <span className="status-mark" aria-hidden="true" />
              online
            </span>
          </div>

          <div
            className="terminal-body"
            ref={bodyRef}
            role="log"
            aria-label="Terminal output"
            onClick={() => {
              if (window.getSelection()?.toString()) return;
              inputRef.current?.focus();
            }}
          >
            {entries.map((entry) => (
              <div className="entry" key={entry.id}>
                {entry.command !== undefined ? (
                  <p className="entry-command">
                    <span className="ps1">{entry.prompt}</span>
                    <span className="ps1-mark">$</span>
                    <span className="ps1-command">{entry.command}</span>
                  </p>
                ) : null}

                {entry.lines.map((line, index) => (
                  <p
                    className={`line${line.tone ? ` line--${line.tone}` : ""}`}
                    key={`${entry.id}-${index}`}
                  >
                    {line.text || "\u00A0"}
                  </p>
                ))}
              </div>
            ))}

            {notice ? (
              <p className="completion-note" aria-live="polite">
                {notice}
              </p>
            ) : null}

            <form className="prompt-line" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="console-input">
                Terminal command
              </label>
              <span className="ps1" aria-hidden="true">
                {displayPath(cwd)}
              </span>
              <span className="ps1-mark" aria-hidden="true">
                $
              </span>
              <input
                id="console-input"
                data-testid="console-input"
                ref={inputRef}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  setHistoryIndex(-1);
                  if (notice) setNotice(null);
                }}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal command"
              />
            </form>
          </div>
        </section>

        <aside className="rail" hidden={view !== "terminal"}>
          <section className="rail-block">
            <h2 className="rail-label">Command index</h2>
            <div className="rail-commands">
              {quickCommands.map((command) => (
                <button
                  type="button"
                  key={command}
                  onClick={() => runQuick(command)}
                >
                  {command}
                </button>
              ))}
            </div>
          </section>

          <section className="rail-block">
            <h2 className="rail-label">Selected work</h2>
            <ol className="rail-work">
              {content.proof.map((entry, index) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => runQuick(`open ${entry.id}`)}
                  >
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {entry.organisation}
                  </button>
                </li>
              ))}
            </ol>
          </section>

          <section className="rail-block">
            <h2 className="rail-label">Status</h2>
            <p className="rail-copy">{content.availability}</p>
            <a className="rail-link" href={`mailto:${content.email}`}>
              {content.email}
            </a>
          </section>

          <p className="rail-note">
            Type <code>plain</code> for the document view. Tab completes
            commands and paths.
          </p>
        </aside>

        <PlainView hidden={view !== "plain"} headingRef={plainHeadingRef} />
      </main>

      <footer className="site-foot">
        <p className="foot-label">How this was built</p>
        <p>
          Next.js App Router and TypeScript. A hand-written command interpreter
          and virtual filesystem, no terminal library. The plain view is typeset
          HTML with the same content. JetBrains Mono and Newsreader.
        </p>
      </footer>

      <div className="crt" aria-hidden="true" />
    </div>
  );
}

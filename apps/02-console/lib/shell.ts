import { content } from "@portfolio/content";

export type Tone = "normal" | "muted" | "accent" | "error";

export type OutputLine = {
  text: string;
  tone?: Tone;
};

export type ShellTheme = "amber" | "high";

export type ShellState = {
  cwd: string;
  theme: ShellTheme;
};

export type ShellResult = {
  state: ShellState;
  lines: OutputLine[];
  clear?: boolean;
  togglePlain?: boolean;
};

type FileNode = {
  kind: "file";
  content: string;
};

type DirNode = {
  kind: "dir";
  children: Record<string, FsNode>;
};

type FsNode = FileNode | DirNode;

export const HOME = "/home/abhijith";

const commands = [
  "help",
  "ls",
  "cd",
  "pwd",
  "cat",
  "open",
  "whoami",
  "git",
  "contact",
  "skills",
  "theme",
  "clear",
  "plain",
] as const;

const proof = (id: string) => {
  const entry = content.proof.find((item) => item.id === id);
  if (!entry) throw new Error(`Missing proof entry: ${id}`);
  return entry;
};

const project = (id: string) => {
  const entry = content.projects.find((item) => item.id === id);
  if (!entry) throw new Error(`Missing project entry: ${id}`);
  return entry;
};

function proofDoc(id: string): string {
  const entry = proof(id);

  return [
    entry.title,
    "",
    `Type     ${entry.kind}`,
    `Role     ${entry.role}`,
    `Period   ${entry.period}`,
    `Place    ${entry.location}`,
    "",
    entry.outcome,
    "",
    entry.summary,
    "",
    "DETAILS",
    ...entry.bullets.map((bullet) => `  - ${bullet}`),
    ...(entry.metrics.length
      ? [
          "",
          "METRICS",
          ...entry.metrics.map(
            (metric) => `  ${metric.value.padEnd(6)}${metric.label}`,
          ),
        ]
      : []),
    "",
    `STACK    ${entry.stack.join(" / ")}`,
  ].join("\n");
}

function projectDoc(id: string): string {
  const entry = project(id);

  return [
    entry.title,
    "",
    `Date     ${entry.date}`,
    "",
    entry.outcome,
    "",
    entry.summary,
    "",
    "DETAILS",
    ...entry.bullets.map((bullet) => `  - ${bullet}`),
    ...(entry.metrics.length
      ? [
          "",
          "METRICS",
          ...entry.metrics.map(
            (metric) => `  ${metric.value.padEnd(6)}${metric.label}`,
          ),
        ]
      : []),
    "",
    `STACK    ${entry.stack.join(" / ")}`,
  ].join("\n");
}

const aboutDoc = [
  content.name.toUpperCase(),
  content.title,
  "",
  content.tagline,
  content.availability,
  "",
  "EDUCATION",
  `  ${content.education.degree}`,
  `  ${content.education.institution}`,
  `  ${content.education.period}`,
].join("\n");

const experienceDoc = content.experience
  .map((role) =>
    [
      `${role.organisation.toUpperCase()} — ${role.role}`,
      `Period   ${role.period}`,
      `Place    ${role.location}`,
      "",
      role.summary,
      "",
      ...role.bullets.map((bullet) => `  - ${bullet}`),
    ].join("\n"),
  )
  .join("\n\n");

const skillsDoc = content.skills
  .map(
    (group) =>
      `${group.label.toUpperCase().padEnd(12)}${group.items.join(", ")}`,
  )
  .join("\n");

const achievementsDoc = content.achievements
  .map(
    (achievement, index) =>
      `${String(index + 1).padStart(2, "0")}  ${achievement.text} — ${achievement.detail}`,
  )
  .join("\n");

const leadershipDoc = content.leadership
  .map((role) =>
    [
      `${role.role.toUpperCase()} — ${role.organisation}, ${role.year}`,
      "",
      role.detail,
    ].join("\n"),
  )
  .join("\n\n");

const contactDoc = [
  `EMAIL     ${content.email}`,
  `PHONE     ${content.phone}`,
  `GITHUB    ${content.github}`,
  "STUDIO    PiixelTheory, co-founder",
  "",
  content.availability,
].join("\n");

const helpDoc = [
  "help              this list",
  "ls [path]         list the current directory",
  "cd <path>         change directory (~, .., work, projects)",
  "pwd               print the working directory",
  "cat <file>        print a file",
  "open <name>       open a case study",
  "whoami            name, role and availability",
  "git log           career history, newest first",
  "contact           email, phone and GitHub",
  "skills            languages, frameworks, infrastructure, data",
  "theme             toggle the phosphor theme",
  "clear             clear the screen",
  "plain             open the plain view",
  "",
  "Case studies: wipro, vasco, solarium, file, claude, obelisk",
  "Paths:        work/, projects/, skills.md, achievements.md",
  "Tab completes commands and paths. Up/down recalls history.",
].join("\n");

const gitLog = [
  "* 2026-07  wipro         four services migrated, 3 critical defects caught",
  "* 2026-06  vasco         production e-commerce, Razorpay + Shiprocket",
  "* 2026-06  piixeltheory  co-founded the studio",
  "* 2026     solarium      multi-year contract, rebuild + solar e-commerce",
  "* 2025-07  obelisk       on-chain authenticity, 50+ product entries",
].join("\n");

const homeDir: DirNode = {
  kind: "dir",
  children: {
    work: {
      kind: "dir",
      children: {
        "wipro.md": { kind: "file", content: proofDoc("wipro") },
        "vasco.md": { kind: "file", content: proofDoc("vasco") },
        "solarium.md": { kind: "file", content: proofDoc("solarium") },
      },
    },
    projects: {
      kind: "dir",
      children: {
        "file-processing.md": {
          kind: "file",
          content: projectDoc("file-processing"),
        },
        "claude-code.md": {
          kind: "file",
          content: projectDoc("claude-code"),
        },
        "obelisk.md": {
          kind: "file",
          content: projectDoc("obelisk"),
        },
      },
    },
    "skills.md": { kind: "file", content: skillsDoc },
    "achievements.md": { kind: "file", content: achievementsDoc },
    "leadership.md": { kind: "file", content: leadershipDoc },
    "experience.md": { kind: "file", content: experienceDoc },
    "contact.md": { kind: "file", content: contactDoc },
    "about.md": { kind: "file", content: aboutDoc },
  },
};

const root: DirNode = {
  kind: "dir",
  children: {
    home: {
      kind: "dir",
      children: {
        abhijith: homeDir,
      },
    },
  },
};

const aliases: Record<string, string> = {
  wipro: "work/wipro.md",
  vasco: "work/vasco.md",
  solarium: "work/solarium.md",
  file: "projects/file-processing.md",
  "file-processing": "projects/file-processing.md",
  claude: "projects/claude-code.md",
  "claude-code": "projects/claude-code.md",
  obelisk: "projects/obelisk.md",
};

export const bootLines: OutputLine[] = [
  { text: content.name.toUpperCase(), tone: "accent" },
  { text: content.title, tone: "muted" },
  { text: "" },
  {
    text: "WIPRO     4 core services migrated / 40+ regression cases / 3 critical defects caught",
  },
  {
    text: "VASCO     live store at vascofoods.in / Razorpay + Shiprocket",
  },
  {
    text: "SOLARIUM  multi-year contract / website rebuild + solar e-commerce",
  },
  { text: "" },
  {
    text: "Type `help` for commands, `ls` to browse, `open wipro` for the full record.",
    tone: "muted",
  },
];

export function displayPath(path: string): string {
  if (path === HOME) return "~";
  if (path.startsWith(`${HOME}/`)) return `~/${path.slice(HOME.length + 1)}`;
  return path;
}

export function resolvePath(cwd: string, target?: string): string {
  if (!target || target === "~") return HOME;

  let raw = target;
  if (raw === "~") raw = HOME;
  else if (raw.startsWith("~/")) raw = `${HOME}/${raw.slice(2)}`;
  else if (!raw.startsWith("/")) raw = `${cwd}/${raw}`;

  const parts: string[] = [];
  for (const part of raw.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }

  return `/${parts.join("/")}`;
}

function getNode(path: string): FsNode | null {
  let node: FsNode = root;
  for (const part of path.split("/").filter(Boolean)) {
    if (node.kind !== "dir") return null;
    const next: FsNode | undefined = node.children[part];
    if (!next) return null;
    node = next;
  }
  return node;
}

function error(text: string): OutputLine[] {
  return [{ text, tone: "error" }];
}

function formatList(names: string[]): string {
  if (names.length === 0) return "(empty)";

  const width = Math.min(
    Math.max(...names.map((name) => name.length)) + 2,
    26,
  );
  const columns = Math.max(1, Math.floor(72 / width));
  const rows = Math.ceil(names.length / columns);
  const lines: string[] = [];

  for (let row = 0; row < rows; row += 1) {
    const cells: string[] = [];
    for (let column = 0; column < columns; column += 1) {
      const name = names[column * rows + row];
      if (name) cells.push(name.padEnd(width));
    }
    lines.push(cells.join("").trimEnd());
  }

  return lines.join("\n");
}

function listDir(node: DirNode): string[] {
  return Object.entries(node.children).map(([name, child]) =>
    child.kind === "dir" ? `${name}/` : name,
  );
}

export function execute(input: string, state: ShellState): ShellResult {
  const trimmed = input.trim();
  if (!trimmed) return { state, lines: [] };

  const tokens = trimmed.split(/\s+/);
  const name = tokens[0].toLowerCase();
  const args = tokens.slice(1);
  const nextState: ShellState = { ...state };

  switch (name) {
    case "help":
      return { state, lines: [{ text: helpDoc }] };

    case "ls": {
      const target = args[0] ? resolvePath(state.cwd, args[0]) : state.cwd;
      const node = getNode(target);
      if (!node) return { state, lines: error(`ls: ${args[0]}: No such file or directory`) };
      if (node.kind === "file") return { state, lines: [{ text: args[0] ?? target }] };
      return {
        state,
        lines: [{ text: formatList(listDir(node)) }],
      };
    }

    case "pwd":
      return { state, lines: [{ text: state.cwd }] };

    case "cd": {
      const target = resolvePath(state.cwd, args[0]);
      const node = getNode(target);
      if (!node) return { state, lines: error(`cd: ${args[0]}: No such file or directory`) };
      if (node.kind !== "dir") return { state, lines: error(`cd: ${args[0]}: Not a directory`) };
      nextState.cwd = target;
      return { state: nextState, lines: [] };
    }

    case "cat": {
      if (!args[0]) return { state, lines: error("cat: usage: cat <file>") };
      const target = resolvePath(state.cwd, args[0]);
      const node = getNode(target);
      if (!node) return { state, lines: error(`cat: ${args[0]}: No such file or directory`) };
      if (node.kind === "dir") return { state, lines: error(`cat: ${args[0]}: Is a directory`) };
      return { state, lines: [{ text: node.content }] };
    }

    case "open": {
      if (!args[0]) {
        return {
          state,
          lines: [
            { text: "open: usage: open <name>", tone: "error" },
            {
              text: "names: wipro, vasco, solarium, file, claude, obelisk",
              tone: "muted",
            },
          ],
        };
      }

      const query = args[0].toLowerCase();
      const alias = aliases[query];
      const target = alias ? `${HOME}/${alias}` : resolvePath(state.cwd, args[0]);
      const node = getNode(target);

      if (!node) {
        return {
          state,
          lines: [
            { text: `open: ${args[0]}: no such case study`, tone: "error" },
            {
              text: "names: wipro, vasco, solarium, file, claude, obelisk",
              tone: "muted",
            },
          ],
        };
      }

      if (node.kind === "dir") {
        return { state, lines: [{ text: formatList(listDir(node)) }] };
      }

      return {
        state,
        lines: [
          { text: `opening ${displayPath(target)}`, tone: "muted" },
          { text: "" },
          { text: node.content },
        ],
      };
    }

    case "whoami":
      return {
        state,
        lines: [
          { text: content.name, tone: "accent" },
          { text: content.title },
          { text: "" },
          { text: content.tagline },
          { text: content.availability, tone: "muted" },
        ],
      };

    case "git": {
      if (args[0]?.toLowerCase() === "log") {
        return {
          state,
          lines: [
            { text: "career history / newest first", tone: "muted" },
            { text: "" },
            { text: gitLog },
          ],
        };
      }
      return {
        state,
        lines: error(
          args[0]
            ? `git: '${args[0]}' is not a supported subcommand. Try: git log`
            : "git: usage: git log",
        ),
      };
    }

    case "contact":
      return { state, lines: [{ text: contactDoc }] };

    case "skills":
      return { state, lines: [{ text: skillsDoc }] };

    case "theme": {
      nextState.theme = state.theme === "amber" ? "high" : "amber";
      return {
        state: nextState,
        lines: [
          {
            text:
              nextState.theme === "amber"
                ? "theme: amber"
                : "theme: high contrast",
            tone: "muted",
          },
        ],
      };
    }

    case "clear":
      return { state, lines: [], clear: true };

    case "plain":
      return { state, lines: [], togglePlain: true };

    default:
      return {
        state,
        lines: [
          { text: `command not found: ${name}`, tone: "error" },
          { text: "Type `help` for the command list.", tone: "muted" },
        ],
      };
  }
}

function commonPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (const value of values.slice(1)) {
    while (!value.startsWith(prefix)) prefix = prefix.slice(0, -1);
    if (!prefix) break;
  }
  return prefix;
}

export type Completion = {
  value?: string;
  matches: string[];
};

export function complete(input: string, cwd: string): Completion {
  const hasSpace = input.includes(" ");
  const commandPart = hasSpace ? input.slice(0, input.indexOf(" ")) : input;
  const isCommandPosition = !hasSpace && input.trim().length > 0;

  if (!input.trim() || isCommandPosition) {
    const query = commandPart.toLowerCase();
    const matches = commands.filter((command) => command.startsWith(query));

    if (matches.length === 1) {
      return { value: `${matches[0]} `, matches };
    }

    return { value: commonPrefix(matches), matches };
  }

  const tokenStart = input.lastIndexOf(" ") + 1;
  const token = input.slice(tokenStart);
  const prefix = input.slice(0, tokenStart);
  const slash = token.lastIndexOf("/");
  const dirToken = slash >= 0 ? token.slice(0, slash + 1) : "";
  const fragment = token.slice(slash + 1);
  const dirPath = dirToken ? resolvePath(cwd, dirToken) : cwd;
  const node = getNode(dirPath);

  if (!node || node.kind !== "dir") return { matches: [] };

  const command = commandPart.trim().toLowerCase();
  const entries = Object.entries(node.children)
    .filter(([, child]) => (command === "cd" ? child.kind === "dir" : true))
    .map(([entryName, child]) => ({
      name: entryName,
      display: child.kind === "dir" ? `${entryName}/` : entryName,
      directory: child.kind === "dir",
    }))
    .filter((entry) => entry.name.startsWith(fragment));

  if (entries.length === 0) return { matches: [] };

  if (entries.length === 1) {
    const entry = entries[0];
    const suffix = entry.directory ? "/" : " ";
    return {
      value: `${prefix}${dirToken}${entry.name}${suffix}`,
      matches: [entry.display],
    };
  }

  const common = commonPrefix(entries.map((entry) => entry.name));
  return {
    value: `${prefix}${dirToken}${common}`,
    matches: entries.map((entry) => entry.display),
  };
}

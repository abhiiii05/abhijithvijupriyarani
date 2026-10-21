import { create } from "zustand";

export const paneIds = [
  "work",
  "projects",
  "experience",
  "skills",
  "record",
  "contact",
] as const;

export type PaneId = (typeof paneIds)[number];

export type PaneMeta = {
  index: string;
  name: string;
  title: string;
  note: string;
  rect: { x: number; y: number; w: number; h: number };
};

export const panes: Record<PaneId, PaneMeta> = {
  work: {
    index: "01",
    name: "Work",
    title: "Selected work",
    note: "3 engagements",
    rect: { x: 700, y: 44, w: 636, h: 726 },
  },
  projects: {
    index: "02",
    name: "Projects",
    title: "Independent builds",
    note: "3 systems",
    rect: { x: 560, y: 64, w: 620, h: 700 },
  },
  experience: {
    index: "03",
    name: "Experience",
    title: "Experience",
    note: "2 roles",
    rect: { x: 640, y: 106, w: 576, h: 608 },
  },
  skills: {
    index: "04",
    name: "Skills",
    title: "Skills",
    note: "5 groups",
    rect: { x: 700, y: 150, w: 540, h: 414 },
  },
  record: {
    index: "05",
    name: "Record",
    title: "Record",
    note: "Education & leadership",
    rect: { x: 600, y: 84, w: 626, h: 606 },
  },
  contact: {
    index: "06",
    name: "Contact",
    title: "Contact",
    note: "Open for work",
    rect: { x: 660, y: 128, w: 560, h: 340 },
  },
};

export type DesktopWindow = {
  open: boolean;
  minimized: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
};

type DesktopStore = {
  windows: Record<PaneId, DesktopWindow>;
  topZ: number;
  openPane: (id: PaneId) => void;
  closePane: (id: PaneId) => void;
  minimizePane: (id: PaneId) => void;
  focusPane: (id: PaneId) => void;
  movePane: (id: PaneId, x: number, y: number) => void;
  resizePane: (id: PaneId, w: number, h: number) => void;
  closeAll: () => void;
  clampWindows: (width: number, height: number) => void;
};

function initialWindows(): Record<PaneId, DesktopWindow> {
  const windows = {} as Record<PaneId, DesktopWindow>;

  for (const id of paneIds) {
    windows[id] = {
      ...panes[id].rect,
      open: id === "work",
      minimized: false,
      z: id === "work" ? 2 : 1,
    };
  }

  return windows;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export const useDesktop = create<DesktopStore>((set) => ({
  windows: initialWindows(),
  topZ: 2,

  openPane: (id) =>
    set((state) => ({
      topZ: state.topZ + 1,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          open: true,
          minimized: false,
          z: state.topZ + 1,
        },
      },
    })),

  closePane: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], open: false, minimized: false },
      },
    })),

  minimizePane: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], minimized: true },
      },
    })),

  focusPane: (id) =>
    set((state) => {
      const current = state.windows[id];

      if (!current.open || current.minimized) return state;
      if (current.z === state.topZ) return state;

      return {
        topZ: state.topZ + 1,
        windows: {
          ...state.windows,
          [id]: { ...current, z: state.topZ + 1 },
        },
      };
    }),

  movePane: (id, x, y) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], x, y },
      },
    })),

  resizePane: (id, w, h) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], w, h },
      },
    })),

  closeAll: () =>
    set((state) => {
      const windows = {} as Record<PaneId, DesktopWindow>;

      for (const id of paneIds) {
        windows[id] = {
          ...state.windows[id],
          open: false,
          minimized: false,
        };
      }

      return { windows };
    }),

  clampWindows: (width, height) =>
    set((state) => {
      if (width <= 0 || height <= 0) return state;

      const windows = {} as Record<PaneId, DesktopWindow>;

      for (const id of paneIds) {
        const current = state.windows[id];
        const w = clamp(current.w, 320, width - 16);
        const h = clamp(current.h, 240, height - 16);

        windows[id] = {
          ...current,
          w,
          h,
          x: clamp(current.x, 8, width - w - 8),
          y: clamp(current.y, 6, height - h - 6),
        };
      }

      return { windows };
    }),
}));

export function openWindows(state: { windows: Record<PaneId, DesktopWindow> }) {
  return paneIds.filter((id) => {
    const entry = state.windows[id];
    return entry.open && !entry.minimized;
  });
}

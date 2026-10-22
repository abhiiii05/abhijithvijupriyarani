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
    rect: { x: 728, y: 24, w: 620, h: 620 },
  },
  projects: {
    index: "02",
    name: "Projects",
    title: "Independent builds",
    note: "3 builds",
    rect: { x: 600, y: 44, w: 600, h: 590 },
  },
  experience: {
    index: "03",
    name: "Experience",
    title: "Experience",
    note: "2 roles",
    rect: { x: 664, y: 78, w: 600, h: 560 },
  },
  skills: {
    index: "04",
    name: "Skills",
    title: "Skills",
    note: "5 groups",
    rect: { x: 724, y: 112, w: 540, h: 400 },
  },
  record: {
    index: "05",
    name: "Record",
    title: "Record",
    note: "Education / leadership",
    rect: { x: 604, y: 56, w: 640, h: 590 },
  },
  contact: {
    index: "06",
    name: "Contact",
    title: "Contact",
    note: "Open for work",
    rect: { x: 680, y: 112, w: 580, h: 330 },
  },
};

export type DesktopWindow = {
  open: boolean;
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
          z: state.topZ + 1,
        },
      },
    })),

  closePane: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], open: false },
      },
    })),

  focusPane: (id) =>
    set((state) => {
      const current = state.windows[id];

      if (!current.open) return state;
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
        const w = clamp(current.w, 320, width - 24);
        const h = clamp(current.h, 240, height - 24);

        windows[id] = {
          ...current,
          w,
          h,
          x: clamp(current.x, 10, width - w - 16),
          y: clamp(current.y, 8, height - h - 16),
        };
      }

      return { windows };
    }),
}));

export function openWindows(state: { windows: Record<PaneId, DesktopWindow> }) {
  return paneIds.filter((id) => state.windows[id].open);
}




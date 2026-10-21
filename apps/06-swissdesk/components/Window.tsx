"use client";

import { motion } from "motion/react";
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { panes, useDesktop, type PaneId } from "@/lib/desktop-store";

type WindowProps = {
  id: PaneId;
  boundsRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

type ResizeState = {
  pointerId: number;
  startX: number;
  startY: number;
  originW: number;
  originH: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export function DesktopWindow({ id, boundsRef, children }: WindowProps) {
  const meta = panes[id];
  const win = useDesktop((state) => state.windows[id]);
  const focused = useDesktop((state) => state.topZ === state.windows[id].z);
  const closePane = useDesktop((state) => state.closePane);
  const minimizePane = useDesktop((state) => state.minimizePane);
  const focusPane = useDesktop((state) => state.focusPane);
  const movePane = useDesktop((state) => state.movePane);
  const resizePane = useDesktop((state) => state.resizePane);

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const drag = useRef<DragState | null>(null);
  const resize = useRef<ResizeState | null>(null);

  function stopDrag(event: ReactPointerEvent<HTMLElement>) {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
  }

  function stopResize(event: ReactPointerEvent<HTMLElement>) {
    if (!resize.current || resize.current.pointerId !== event.pointerId) return;
    resize.current = null;
    setResizing(false);
  }

  function handleBarDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.button !== 0) return;

    focusPane(id);
    event.currentTarget.setPointerCapture(event.pointerId);

    const current = useDesktop.getState().windows[id];
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: current.x,
      originY: current.y,
    };
    setDragging(true);
  }

  function handleBarMove(event: ReactPointerEvent<HTMLElement>) {
    const state = drag.current;
    const bounds = boundsRef.current?.getBoundingClientRect();
    if (!state || !bounds || state.pointerId !== event.pointerId) return;

    const current = useDesktop.getState().windows[id];
    const x = clamp(
      state.originX + event.clientX - state.startX,
      8,
      bounds.width - current.w - 16,
    );
    const y = clamp(
      state.originY + event.clientY - state.startY,
      6,
      bounds.height - current.h - 16,
    );

    movePane(id, Math.round(x), Math.round(y));
  }

  function handleResizeDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.button !== 0) return;

    event.stopPropagation();
    focusPane(id);
    event.currentTarget.setPointerCapture(event.pointerId);

    const current = useDesktop.getState().windows[id];
    resize.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originW: current.w,
      originH: current.h,
    };
    setResizing(true);
  }

  function handleResizeMove(event: ReactPointerEvent<HTMLElement>) {
    const state = resize.current;
    const bounds = boundsRef.current?.getBoundingClientRect();
    if (!state || !bounds || state.pointerId !== event.pointerId) return;

    const current = useDesktop.getState().windows[id];
    const w = clamp(
      state.originW + event.clientX - state.startX,
      320,
      bounds.width - current.x - 16,
    );
    const h = clamp(
      state.originH + event.clientY - state.startY,
      240,
      bounds.height - current.y - 16,
    );

    resizePane(id, Math.round(w), Math.round(h));
  }

  return (
    <motion.section
      className="window"
      data-testid={`window-${id}`}
      data-focused={focused}
      data-dragging={dragging}
      data-resizing={resizing}
      aria-labelledby={`window-title-${id}`}
      initial={{ opacity: 0, scale: 0.975, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 8 }}
      transition={{ type: "spring", stiffness: 460, damping: 36, mass: 0.7 }}
      style={{
        position: "absolute",
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
      }}
      onPointerDownCapture={() => focusPane(id)}
    >
      <div
        className="win-bar"
        data-testid={`window-${id}-handle`}
        onPointerDown={handleBarDown}
        onPointerMove={handleBarMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        title="Drag window"
      >
        <span className="win-number">{meta.index}</span>
        <h2 className="win-title" id={`window-title-${id}`}>
          {meta.title}
        </h2>
        <span className="win-note">{meta.note}</span>
        <div className="win-actions">
          <button
            type="button"
            className="win-btn"
            aria-label={`Minimise ${meta.name}`}
            title="Minimise"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => minimizePane(id)}
          >
            â€“
          </button>
          <button
            type="button"
            className="win-btn"
            aria-label={`Close ${meta.name}`}
            title="Close"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => closePane(id)}
          >
            Ã—
          </button>
        </div>
      </div>

      <div className="win-body">{children}</div>

      <div
        className="win-resize"
        aria-hidden="true"
        onPointerDown={handleResizeDown}
        onPointerMove={handleResizeMove}
        onPointerUp={stopResize}
        onPointerCancel={stopResize}
      />
    </motion.section>
  );
}


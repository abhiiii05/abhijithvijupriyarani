import { create } from "zustand";

export type JobStage = "queued" | "active" | "completed";

export type Job = {
  id: number;
  stage: JobStage;
  worker: number | null;
  progress: number;
  attempts: number;
};

export type EventEntry = {
  id: string;
  at: string;
  text: string;
};

export type Counters = {
  queued: number;
  active: number;
  completed: number;
  retried: number;
  dropped: number;
};

type SimState = {
  jobs: Job[];
  workers: boolean[];
  counters: Counters;
  events: EventEntry[];
  nextJobId: number;
  lastRetryWorker: number | null;
  addJobs: (count?: number) => void;
  killWorker: () => void;
  reviveWorkers: () => void;
  reset: () => void;
  tick: () => void;
};

const WORKER_COUNT = 3;
const JOB_TICKS = 5;
const MAX_EVENTS = 14;
const MAX_JOBS = 100;

const emptyCounters: Counters = {
  queued: 0,
  active: 0,
  completed: 0,
  retried: 0,
  dropped: 0,
};

function derive(jobs: Job[]): Counters {
  let queued = 0;
  let active = 0;
  let completed = 0;
  let retried = 0;
  for (const job of jobs) {
    if (job.stage === "queued") queued += 1;
    if (job.stage === "active") active += 1;
    if (job.stage === "completed") completed += 1;
    retried += job.attempts;
  }
  return { queued, active, completed, retried, dropped: 0 };
}

function stamp(): string {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

function event(text: string): EventEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: stamp(),
    text,
  };
}

function freshState() {
  return {
    jobs: [] as Job[],
    workers: Array.from({ length: WORKER_COUNT }, () => true),
    counters: { ...emptyCounters },
    events: [] as EventEntry[],
    nextJobId: 1,
    lastRetryWorker: null as number | null,
  };
}

export const useSim = create<SimState>()((set) => ({
  ...freshState(),

  addJobs: (count = 25) =>
    set((state) => {
      const room = MAX_JOBS - state.jobs.length;
      const n = Math.max(0, Math.min(count, room));
      if (n === 0) return state;
      const added: Job[] = Array.from({ length: n }, (_, i) => ({
        id: state.nextJobId + i,
        stage: "queued",
        worker: null,
        progress: 0,
        attempts: 0,
      }));
      const jobs = [...state.jobs, ...added];
      return {
        jobs,
        nextJobId: state.nextJobId + n,
        counters: derive(jobs),
        events: [
          event(`+${n} jobs accepted by the upload API; queued in BullMQ`),
          ...state.events,
        ].slice(0, MAX_EVENTS),
      };
    }),

  killWorker: () =>
    set((state) => {
      const worker = state.workers.findIndex(Boolean);
      if (worker === -1) return state;
      const workers = state.workers.map((alive, i) =>
        i === worker ? false : alive,
      );
      let requeued = 0;
      const jobs = state.jobs.map((job) => {
        if (job.stage === "active" && job.worker === worker) {
          requeued += 1;
          return {
            ...job,
            stage: "queued" as const,
            worker: null,
            progress: 0,
            attempts: job.attempts + 1,
          };
        }
        return job;
      });
      const text =
        requeued > 0
          ? `worker ${worker + 1} killed · ${requeued} in-flight job(s) requeued with idempotency keys`
          : `worker ${worker + 1} killed · no in-flight jobs`;
      return {
        jobs,
        workers,
        counters: derive(jobs),
        lastRetryWorker: worker,
        events: [event(text), ...state.events].slice(0, MAX_EVENTS),
      };
    }),

  reviveWorkers: () =>
    set((state) => {
      if (state.workers.every(Boolean)) return state;
      return {
        workers: state.workers.map(() => true),
        events: [event("worker pool restored · three workers live"), ...state.events].slice(
          0,
          MAX_EVENTS,
        ),
      };
    }),

  reset: () => set(() => ({ ...freshState() })),

  tick: () =>
    set((state) => {
      if (state.jobs.length === 0) return state;
      const jobs = state.jobs.map((job) => ({ ...job }));
      const events: EventEntry[] = [];
      let changed = false;

      for (const job of jobs) {
        if (job.stage !== "active") continue;
        job.progress += 1;
        changed = true;
        if (job.progress >= JOB_TICKS) {
          job.stage = "completed";
          job.worker = null;
          events.push(
            event(
              `job ${String(job.id).padStart(2, "0")} committed · PostgreSQL + Azure Blob · one write`,
            ),
          );
        }
      }

      const busy = new Set(
        jobs
          .filter((job) => job.stage === "active" && job.worker !== null)
          .map((job) => job.worker),
      );
      const free = state.workers
        .map((alive, index) => (alive && !busy.has(index) ? index : -1))
        .filter((index) => index >= 0);

      let dispatched = 0;
      for (const job of jobs) {
        if (job.stage !== "queued" || free.length === 0) continue;
        const worker = free.shift();
        if (worker === undefined) break;
        job.stage = "active";
        job.worker = worker;
        job.progress = 0;
        dispatched += 1;
        changed = true;
      }
      if (dispatched > 0) {
        events.push(
          event(
            `dispatched ${dispatched} queued job(s) to ${state.workers.filter(Boolean).length} live worker(s)`,
          ),
        );
      }

      if (!changed) return state;
      const done = jobs.every((job) => job.stage === "completed");
      if (done) {
        events.push(event("queue drained · 0 dropped tasks"));
      }
      return {
        jobs,
        counters: derive(jobs),
        events: [...events.reverse(), ...state.events].slice(0, MAX_EVENTS),
      };
    }),
}));

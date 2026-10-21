"use client";

import { useEffect } from "react";
import { useSim } from "@/lib/sim";

const WORKER_Y = [55, 160, 265];
const WORKER_X = 492;
const QUEUE_RIGHT = { x: 436, y: 205 };

function workerPath(index: number) {
  const y = WORKER_Y[index] + 35;
  return `M ${QUEUE_RIGHT.x} ${QUEUE_RIGHT.y} C 464 ${QUEUE_RIGHT.y}, 464 ${y}, ${WORKER_X} ${y}`;
}

function retryPath(index: number) {
  const y = WORKER_Y[index] + 35;
  return `M ${WORKER_X} ${y} C 464 ${y}, 464 ${QUEUE_RIGHT.y}, ${QUEUE_RIGHT.x} ${QUEUE_RIGHT.y}`;
}

export function PipelineSimulator() {
  const jobs = useSim((state) => state.jobs);
  const workers = useSim((state) => state.workers);
  const counters = useSim((state) => state.counters);
  const events = useSim((state) => state.events);
  const lastRetryWorker = useSim((state) => state.lastRetryWorker);
  const addJobs = useSim((state) => state.addJobs);
  const killWorker = useSim((state) => state.killWorker);
  const reviveWorkers = useSim((state) => state.reviveWorkers);
  const reset = useSim((state) => state.reset);
  const tick = useSim((state) => state.tick);

  useEffect(() => {
    const timer = window.setInterval(() => tick(), 500);
    return () => window.clearInterval(timer);
  }, [tick]);

  const active = jobs.filter((job) => job.stage === "active");
  const queuedDots = Math.min(counters.queued, 8);
  const liveWorkers = workers.filter(Boolean).length;

  return (
    <div className="sim-grid">
      <div>
        <div className="diagram-box">
          <svg
            viewBox="0 0 880 430"
            role="img"
            aria-labelledby="pipeline-title pipeline-desc"
          >
            <title id="pipeline-title">
              File processing pipeline simulation
            </title>
            <desc id="pipeline-desc">
              Uploads enter an API, wait in a BullMQ queue backed by Redis, are
              processed by three workers, and are committed to PostgreSQL and
              Azure Blob. Kill a worker to see in-flight jobs retried
              idempotently. Dropped tasks stay at zero.
            </desc>
            <defs>
              <marker
                id="sim-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e2924" />
              </marker>
              <marker
                id="sim-arrow-accent"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#c1492f" />
              </marker>
            </defs>

            <g>
              <rect
                className="pipe-node"
                x="24"
                y="170"
                width="104"
                height="70"
              />
              <text className="pipe-label" x="38" y="198">
                Upload
              </text>
              <text className="pipe-sub" x="38" y="216">
                client
              </text>
              <text className="pipe-sub" x="38" y="228">
                multipart
              </text>
            </g>

            <g>
              <rect
                className="pipe-node"
                x="168"
                y="170"
                width="110"
                height="70"
              />
              <text className="pipe-label" x="182" y="198">
                API
              </text>
              <text className="pipe-sub" x="182" y="216">
                accept
              </text>
              <text className="pipe-sub" x="182" y="228">
                validate
              </text>
            </g>

            <g>
              <rect
                className="pipe-node"
                x="318"
                y="170"
                width="118"
                height="80"
              />
              <text className="pipe-label" x="332" y="196">
                BullMQ
              </text>
              <text className="pipe-sub" x="332" y="212">
                waiting
              </text>
              {Array.from({ length: queuedDots }, (_, i) => (
                <rect
                  key={i}
                  x={332 + (i % 4) * 18}
                  y={224 + Math.floor(i / 4) * 14}
                  width="10"
                  height="8"
                  fill="#c1492f"
                  opacity={0.75}
                />
              ))}
              {counters.queued > 8 ? (
                <text className="pipe-sub" x="408" y="232">
                  +{counters.queued - 8}
                </text>
              ) : null}
            </g>

            {WORKER_Y.map((y, index) => (
              <g key={index}>
                <rect
                  x={WORKER_X}
                  y={y}
                  width="118"
                  height="70"
                  className={workers[index] ? "pipe-node" : "pipe-node is-down"}
                  opacity={workers[index] ? 1 : 0.55}
                />
                <text className="pipe-label" x={WORKER_X + 14} y={y + 28}>
                  Worker {String(index + 1).padStart(2, "0")}
                </text>
                <text className="pipe-sub" x={WORKER_X + 14} y={y + 46}>
                  {workers[index] ? "live" : "down"}
                </text>
                <text className="pipe-sub" x={WORKER_X + 14} y={y + 59}>
                  {workers[index] ? "idempotent" : "requeue"}
                </text>
              </g>
            ))}

            <g>
              <rect
                className="pipe-node"
                x="690"
                y="70"
                width="154"
                height="78"
              />
              <text className="pipe-label" x="706" y="98">
                PostgreSQL
              </text>
              <text className="pipe-sub" x="706" y="116">
                jobs + results
              </text>
              <text className="pipe-sub" x="706" y="128">
                tracked schema
              </text>
            </g>

            <g>
              <rect
                className="pipe-node"
                x="690"
                y="230"
                width="154"
                height="78"
              />
              <text className="pipe-label" x="706" y="258">
                Azure Blob
              </text>
              <text className="pipe-sub" x="706" y="276">
                file output
              </text>
              <text className="pipe-sub" x="706" y="288">
                container apps
              </text>
            </g>

            <g>
              <rect
                className="pipe-node-accent"
                x={WORKER_X}
                y="345"
                width="118"
                height="58"
              />
              <text className="pipe-label" x={WORKER_X + 14} y="371">
                Redis
              </text>
              <text className="pipe-sub" x={WORKER_X + 14} y="388">
                queue state
              </text>
            </g>

            <path className="pipe-line" d="M 128 205 H 168" markerEnd="url(#sim-arrow)" />
            <path className="pipe-line" d="M 278 205 H 318" markerEnd="url(#sim-arrow)" />
            {WORKER_Y.map((_, index) => (
              <path
                key={index}
                className="pipe-line"
                d={workerPath(index)}
                markerEnd="url(#sim-arrow)"
              />
            ))}
            <path
              className="pipe-line"
              d="M 610 90 C 650 90, 650 109, 690 109"
              markerEnd="url(#sim-arrow)"
            />
            <path
              className="pipe-line"
              d="M 610 300 C 650 300, 650 269, 690 269"
              markerEnd="url(#sim-arrow)"
            />
            <path className="pipe-line-dash" d="M 377 250 V 345" markerEnd="url(#sim-arrow)" />
            <path
              className="pipe-line-dash"
              d="M 551 335 V 345"
              markerEnd="url(#sim-arrow)"
            />
            <path
              className="pipe-line-dash"
              d="M 486 335 V 345"
              markerEnd="url(#sim-arrow)"
            />

            {active.map((job) => {
              if (job.worker === null) return null;
              return (
                <circle
                  key={job.id}
                  className="motion-particle"
                  cx={QUEUE_RIGHT.x}
                  cy={QUEUE_RIGHT.y}
                  r="4.5"
                  fill="#c1492f"
                >
                  <animateMotion
                    dur={`${1.2 + (job.id % 4) * 0.12}s`}
                    repeatCount="indefinite"
                    path={workerPath(job.worker)}
                  />
                </circle>
              );
            })}

            {counters.retried > 0 && lastRetryWorker !== null ? (
              <g key={counters.retried}>
                <circle r="5" fill="#c1492f">
                  <animateMotion
                    dur="0.9s"
                    fill="freeze"
                    path={retryPath(lastRetryWorker)}
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0"
                    dur="1.1s"
                    fill="freeze"
                  />
                </circle>
              </g>
            ) : null}

            <text className="pipe-sub" x="24" y="410">
              DIAGRAM BP-03 · REDIS HIGHLIGHTED · DROPPED = {counters.dropped}
            </text>
            <text className="pipe-sub" x="660" y="410">
              LIVE SIMULATION · {liveWorkers}/3 WORKERS
            </text>
          </svg>
        </div>
        <p className="diagram-caption">
          <span>Fig. 03 — upload, queue, worker pool, storage</span>
          <span>queue depth {counters.queued}</span>
        </p>
        <p className="diagram-hint">Swipe the drawing to pan</p>
      </div>

      <div className="sim-panel" aria-label="Simulation controls and counters">
        <div className="sim-panel-head">
          <span>Control panel</span>
          <span className="sim-status">{liveWorkers}/3 live</span>
        </div>
        <div className="sim-controls">
          <button
            type="button"
            className="btn wide"
            onClick={() => addJobs(25)}
            data-testid="add-jobs"
          >
            + add 25 jobs
          </button>
          <button
            type="button"
            className="btn btn-accent"
            onClick={killWorker}
            data-testid="kill-worker"
          >
            kill worker
          </button>
          <button type="button" className="btn" onClick={reviveWorkers}>
            restart pool
          </button>
          <button type="button" className="btn wide" onClick={reset}>
            reset sheet
          </button>
        </div>

        <table className="counter-table">
          <caption className="sr-only">
            Live job counters for the pipeline simulation
          </caption>
          <thead>
            <tr>
              <th scope="col">Counter</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Queued</th>
              <td data-testid="counter-queued">{counters.queued}</td>
            </tr>
            <tr>
              <th scope="row">Active</th>
              <td data-testid="counter-active">{counters.active}</td>
            </tr>
            <tr>
              <th scope="row">Completed</th>
              <td data-testid="counter-completed">{counters.completed}</td>
            </tr>
            <tr>
              <th scope="row">Retried</th>
              <td data-testid="counter-retried">{counters.retried}</td>
            </tr>
            <tr>
              <th scope="row">Dropped</th>
              <td data-testid="counter-dropped">{counters.dropped}</td>
            </tr>
          </tbody>
        </table>

        <div className="event-log" aria-label="Simulation event log">
          {events.length === 0 ? (
            <p>No events. Add jobs to start the simulation.</p>
          ) : (
            events.map((entry) => (
              <p key={entry.id}>
                <time>{entry.at}</time>
                {entry.text}
              </p>
            ))
          )}
        </div>
        <p className="sr-only" aria-live="polite">
          {counters.queued} queued, {counters.active} active,{" "}
          {counters.completed} completed, {counters.retried} retried,{" "}
          {counters.dropped} dropped.
        </p>
      </div>
    </div>
  );
}

import { content } from "@portfolio/content";
import { AgentLoop, ObeliskFlow, SolariumFlow, VascoFlow } from "@/components/Diagrams";
import { MigrationDiagram } from "@/components/MigrationDiagram";
import { PipelineSimulator } from "@/components/PipelineSimulator";

type SheetProps = {
  id: string;
  number: string;
  name: string;
  revision: string;
  children: React.ReactNode;
  titleBlock: {
    drawing: string;
    project: string;
    revision: string;
  };
};

function Sheet({
  id,
  number,
  name,
  revision,
  children,
  titleBlock,
}: SheetProps) {
  return (
    <section className="sheet" id={id} aria-labelledby={`${id}-heading`}>
      <div className="sheet-head">
        <span className="sheet-no">SHEET {number}</span>
        <span className="sheet-title" id={`${id}-heading`}>
          {name}
        </span>
        <span className="sheet-rev">{revision}</span>
      </div>
      {children}
      <div className="title-block sheet-titleblock">
        <div>
          Drawing
          <b>{titleBlock.drawing}</b>
        </div>
        <div>
          Project
          <b>{titleBlock.project}</b>
        </div>
        <div>
          Revision
          <b>{titleBlock.revision}</b>
        </div>
        <div>
          Sheet
          <b>
            {number} / 07
          </b>
        </div>
      </div>
    </section>
  );
}

function Metrics({
  items,
}: {
  items: readonly { value: string; label: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="metric-strip">
      {items.map((metric) => (
        <div key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const wipro = content.proof[0];
  const vasco = content.proof[1];
  const solarium = content.proof[2];
  const studio = content.experience[0];
  const fileSystem = content.projects[0];
  const agent = content.projects[1];
  const obelisk = content.projects[2];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="topbar">
        <div className="wrap topbar-inner">
          <div>
            <div className="topbar-name">{content.name}</div>
            <div className="mono" style={{ color: "var(--ink-soft)" }}>
              {content.title}
            </div>
          </div>
          <div className="topbar-meta mono">
            <a href={`mailto:${content.email}`}>Email</a>
            <a href={content.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span>Sheet set 01–07</span>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-kicker mono">
                <span>Portfolio / system drawings</span>
                <span>Revision C · 2026</span>
              </div>

              <h1 className="hero-name">
                <span>Abhijith Viju</span>
                <span className="outline">Priya Rani</span>
              </h1>

              <div className="hero-aside">
                <p>{content.tagline}</p>
                <span className="hero-tag mono">{content.availability}</span>
              </div>
            </div>

            <div className="hero-facts" aria-label="Selected hard numbers">
              <div>
                <strong>4</strong>
                <span>core services migrated</span>
              </div>
              <div>
                <strong>40+</strong>
                <span>regression cases</span>
              </div>
              <div>
                <strong>25+</strong>
                <span>concurrent upload jobs</span>
              </div>
              <div>
                <strong>0</strong>
                <span>dropped tasks</span>
              </div>
            </div>
          </div>
        </section>

        <nav className="sheet-nav" aria-label="System drawing sheets">
          <div className="wrap sheet-nav-inner">
            <a href="#migration">01 Migration</a>
            <a href="#production">02 Production</a>
            <a href="#queue">03 Queue</a>
            <a href="#agent">04 Agent</a>
            <a href="#ledger">05 Ledger</a>
            <a href="#record">06 Record</a>
            <a href="#contact">07 Contact</a>
          </div>
        </nav>

        <div className="wrap">
          <Sheet
            id="migration"
            number="01"
            name="Service extraction"
            revision="REV C"
            titleBlock={{
              drawing: "BP-01 · service extraction",
              project: "Wipro migration",
              revision: "REV C",
            }}
          >
            <div className="sheet-body">
              <div className="sheet-intro">
                <p className="mono">Wipro · Backend Engineering Intern</p>
                <h2>Four services out of the monolith.</h2>
                <p className="lede">{wipro.summary}</p>
                <ul className="rule-list">
                  {wipro.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Metrics items={wipro.metrics} />
              </div>
              <div className="sheet-visual">
                <MigrationDiagram />
                <p className="diagram-caption">
                  <span>Fig. 01 — functional parity, service by service</span>
                  <span>Hyderabad · May–Jul 2026</span>
                </p>
              </div>
            </div>
          </Sheet>

          <Sheet
            id="production"
            number="02"
            name="Production systems"
            revision="REV B"
            titleBlock={{
              drawing: "BP-02 · client systems",
              project: "PiixelTheory engagements",
              revision: "REV B",
            }}
          >
            <div className="sheet-body">
              <div className="sheet-intro">
                <p className="mono">PiixelTheory · Co-Founder & Backend Engineer</p>
                <h2>Production systems, in service.</h2>
                <p className="lede">{studio.summary}</p>
                <ul className="rule-list">
                  <li>{vasco.outcome}</li>
                  <li>{solarium.outcome}</li>
                </ul>
                <p className="mono" style={{ marginTop: "1rem" }}>
                  {studio.period} · {studio.location}
                </p>
              </div>
              <div className="sheet-visual">
                <div className="production-stack">
                  <article className="production-row">
                    <div>
                      <h3>
                        <span>02A</span> Vasco Foods
                      </h3>
                      <p className="lede" style={{ marginBottom: "0.4rem" }}>
                        {vasco.summary}
                      </p>
                      <p className="mono" style={{ color: "var(--accent)" }}>
                        Live · vascofoods.in
                      </p>
                    </div>
                    <VascoFlow />
                  </article>
                  <article className="production-row">
                    <div>
                      <h3>
                        <span>02B</span> Solarium Green Energy
                      </h3>
                      <p className="lede" style={{ marginBottom: "0.4rem" }}>
                        {solarium.summary}
                      </p>
                      <p className="mono" style={{ color: "var(--accent)" }}>
                        Multi-year contract
                      </p>
                    </div>
                    <SolariumFlow />
                  </article>
                </div>
                <p className="diagram-hint">Swipe drawings to pan</p>
              </div>
            </div>
          </Sheet>

          <Sheet
            id="queue"
            number="03"
            name="Queue simulation"
            revision="REV D"
            titleBlock={{
              drawing: "BP-03 · file processing",
              project: "Scalable File Processing System",
              revision: "REV D",
            }}
          >
            <div className="sheet-body">
              <div className="sheet-wide sim-head">
                <div>
                  <p className="mono">Project 01 · Mar 2026</p>
                  <h2>Twenty-five jobs, no drops.</h2>
                  <p className="lede">{fileSystem.summary}</p>
                  <ul className="rule-list">
                    {fileSystem.bullets.slice(1).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Metrics items={fileSystem.metrics} />
                  <p className="mono" style={{ marginTop: "0.9rem" }}>
                    Stack / {fileSystem.stack.join(" · ")}
                  </p>
                </div>
              </div>
              <div className="sheet-wide" style={{ marginTop: "0.4rem" }}>
                <PipelineSimulator />
              </div>
            </div>
          </Sheet>

          <Sheet
            id="agent"
            number="04"
            name="Agent loop"
            revision="REV A"
            titleBlock={{
              drawing: "BP-04 · reasoning loop",
              project: "Claude Code: Autonomous Coding Agent",
              revision: "REV A",
            }}
          >
            <div className="sheet-body">
              <div className="sheet-intro">
                <p className="mono">Project 02 · Apr 2026 · CodeCrafters</p>
                <h2>An agent that checks its own work.</h2>
                <p className="lede">{agent.summary}</p>
                <ul className="rule-list">
                  {agent.bullets.slice(0, 1).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                  <li>{agent.bullets[2]}</li>
                </ul>
                <Metrics items={agent.metrics} />
              </div>
              <div className="sheet-visual">
                <AgentLoop />
                <p className="diagram-caption">
                  <span>Fig. 04 — plan, act, observe, correct</span>
                  <span>{agent.stack.join(" · ")}</span>
                </p>
              </div>
            </div>
          </Sheet>

          <Sheet
            id="ledger"
            number="05"
            name="On-chain ledger"
            revision="REV B"
            titleBlock={{
              drawing: "BP-05 · verification flow",
              project: "Obelisk",
              revision: "REV B",
            }}
          >
            <div className="sheet-body">
              <div className="sheet-intro">
                <p className="mono">Project 03 · Jul 2025</p>
                <h2>Product history you can verify.</h2>
                <p className="lede">{obelisk.summary}</p>
                <ul className="rule-list">
                  <li>{obelisk.bullets[0]}</li>
                  <li>{obelisk.bullets[1]}</li>
                </ul>
                <Metrics items={obelisk.metrics} />
              </div>
              <div className="sheet-visual">
                <ObeliskFlow />
                <p className="diagram-caption">
                  <span>Fig. 05 — entry, pin, record, lookup</span>
                  <span>{obelisk.stack.join(" · ")}</span>
                </p>
              </div>
            </div>
          </Sheet>

          <Sheet
            id="record"
            number="06"
            name="Record"
            revision="REV C"
            titleBlock={{
              drawing: "BP-06 · schedule of record",
              project: "Education, skills, achievements, leadership",
              revision: "REV C",
            }}
          >
            <div className="sheet-body">
              <div className="sheet-wide record-grid">
                <section className="record-education">
                  <h2>Education</h2>
                  <h3>{content.education.degree}</h3>
                  <p className="lede">{content.education.institution}</p>
                  <p className="mono">{content.education.period}</p>
                </section>

                <section className="record-skills">
                  <h2>Skills</h2>
                  <dl style={{ margin: 0 }}>
                    {content.skills.map((group) => (
                      <div className="skill-row" key={group.label}>
                        <dt>{group.label}</dt>
                        <dd>{group.items.join(" · ")}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className="record-achievements">
                  <h2>Achievements</h2>
                  <ul className="plain-record">
                    {content.achievements.map((item) => (
                      <li key={item.text}>
                        {item.text}
                        <span>{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="record-leadership">
                  <h2>Leadership</h2>
                  {content.leadership.map((item) => (
                    <article key={item.role} style={{ marginBottom: "1rem" }}>
                      <h3>
                        {item.role} · {item.organisation}
                      </h3>
                      <p className="lede">{item.detail}</p>
                      <p className="mono">{item.year}</p>
                    </article>
                  ))}
                </section>
              </div>
            </div>
          </Sheet>

          <section
            className="contact-sheet"
            id="contact"
            aria-labelledby="contact-heading"
          >
            <div className="contact-main">
              <p className="mono">Sheet 07 · Contact</p>
              <h2 id="contact-heading">Contact</h2>
              <p className="lede">{content.microcopy.contactLead}</p>
              <p className="mono" style={{ color: "var(--accent)" }}>
                Backend engineering roles · freelance backend work
              </p>
            </div>
            <div className="contact-side">
              <ul className="contact-list">
                <li>
                  <a href={`mailto:${content.email}`}>{content.email}</a>
                </li>
                <li>
                  <a href={`tel:${content.phone.replace(/\s/g, "")}`}>
                    {content.phone}
                  </a>
                </li>
                <li>
                  <a href={content.github} target="_blank" rel="noreferrer">
                    github.com/abhiiii05
                  </a>
                </li>
              </ul>
              <p className="mono" style={{ margin: 0 }}>
                {content.education.institution}
                <br />
                {content.education.period}
              </p>
            </div>
          </section>

          <footer className="footer">
            <p>
              <span className="mono" style={{ display: "block" }}>
                {content.microcopy.footerNote}
              </span>
              Next.js 16 · React 19 · Tailwind CSS v4 · GSAP ScrollTrigger ·
              Zustand · hand-written SVG. Type: Space Grotesk and IBM Plex Mono.
            </p>
            <p className="mono">{content.name}</p>
          </footer>
        </div>
      </main>
    </>
  );
}

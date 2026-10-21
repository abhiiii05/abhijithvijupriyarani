import { content, type Metric } from "@portfolio/content";
import { NameStage } from "@/components/NameStage";

type WorkItem = {
  number: string;
  kind: string;
  period: string;
  place: string;
  title: string;
  outcome: string;
  bullets: readonly string[];
  metrics: readonly Metric[];
  stack: readonly string[];
};

const work: WorkItem[] = [
  ...content.proof.map((entry, index) => ({
    number: String(index + 1).padStart(2, "0"),
    kind: entry.kind,
    period: entry.period,
    place: entry.location,
    title: entry.title,
    outcome: entry.outcome,
    bullets: entry.bullets,
    metrics: entry.metrics,
    stack: entry.stack,
  })),
  ...content.projects.map((project, index) => ({
    number: String(index + content.proof.length + 1).padStart(2, "0"),
    kind: "Independent build",
    period: project.date,
    place: project.year,
    title: project.title,
    outcome: project.outcome,
    bullets: project.bullets,
    metrics: project.metrics,
    stack: project.stack,
  })),
];

const titleParts = content.title
  .split(" | ")
  .flatMap((part) => part.split(" & "));

export default function Page() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>

      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Abhijith Viju Priya Rani, back to top">
          <strong>AVPR</strong>
          <span>Backend systems</span>
        </a>
        <p className="masthead-title">{content.title}</p>
        <nav className="masthead-nav" aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#record">Record</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className="hero-inner grid12">
            <div className="hero-kicker">
              {titleParts.map((part) => (
                <span key={part}>{part}</span>
              ))}
              <span>Portfolio / 2026</span>
            </div>

            <div className="hero-name">
              <NameStage name={content.name} />
            </div>

            <div className="hero-bottom">
              <p className="hero-lead">
                Four services migrated at Wipro. A live store for Vasco Foods. A
                signed multi-year contract with Solarium. The proof comes first.
              </p>
              <div className="hero-meta">
                <p>{content.availability}</p>
                <a href="#work">Selected work, 01&ndash;06 &rarr;</a>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="grid12">
            <header className="section-head">
              <span className="section-no">01</span>
              <h2 id="work-title">Work</h2>
              <p className="section-lead">
                Production work first: a service migration, a live store, and a
                signed multi-year contract. Three independent builds follow.
              </p>
            </header>
          </div>

          <div className="work-list">
            {work.map((item) => (
              <article className="work-row" key={item.number}>
                <div className="work-number" aria-hidden="true">
                  {item.number}
                </div>

                <div className="work-main">
                  <p className="work-eyebrow">
                    <span>{item.kind}</span>
                    <span>{item.period}</span>
                    <span>{item.place}</span>
                  </p>
                  <h3>{item.title}</h3>
                  <p className="work-outcome">{item.outcome}</p>
                  <ul className="work-bullets">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <aside className="work-aside">
                  {item.metrics.length > 0 ? (
                    <dl className="work-metrics">
                      {item.metrics.map((metric) => (
                        <div key={metric.label}>
                          <dt>{metric.label}</dt>
                          <dd>{metric.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  <div className="work-stack">
                    <span className="work-stack-label">Stack</span>
                    <ul>
                      {item.stack.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </article>
            ))}
          </div>
        </section>

        <section
          id="capabilities"
          className="section"
          aria-labelledby="capabilities-title"
        >
          <div className="grid12">
            <header className="section-head">
              <span className="section-no">02</span>
              <h2 id="capabilities-title">Capabilities</h2>
              <p className="section-lead">
                Languages, frameworks, infrastructure and data, grouped the way
                the work uses them.
              </p>
            </header>
          </div>

          <div className="capability-list">
            {content.skills.map((group, index) => (
              <div className="capability-row" key={group.label}>
                <span className="capability-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{group.label}</h3>
                <p>{group.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="record" className="section" aria-labelledby="record-title">
          <div className="grid12">
            <header className="section-head">
              <span className="section-no">03</span>
              <h2 id="record-title">Record</h2>
              <p className="section-lead">
                Education, competition results and committee work at IIIT
                Vadodara.
              </p>
            </header>
          </div>

          <div className="education-row">
            <span className="record-label">Education</span>
            <div>
              <h3>{content.education.degree}</h3>
              <p>{content.education.institution}</p>
            </div>
            <span className="record-period">{content.education.period}</span>
          </div>

          <div className="record-grid">
            <div className="record-col">
              <h3 className="record-heading">Achievements</h3>
              <ol className="achievement-list">
                {content.achievements.map((achievement, index) => (
                  <li key={achievement.text}>
                    <span className="achievement-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="achievement-text">{achievement.text}</span>
                    <span className="achievement-detail">{achievement.detail}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="record-col">
              <h3 className="record-heading">Leadership</h3>
              <div className="leadership-list">
                {content.leadership.map((role) => (
                  <article key={role.role} className="leadership-item">
                    <p className="leadership-meta">
                      <span>{role.year}</span>
                      <span>{role.organisation}</span>
                    </p>
                    <h4>{role.role}</h4>
                    <p>{role.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="grid12">
            <header className="section-head">
              <span className="section-no">04</span>
              <h2 id="contact-title">Contact</h2>
              <p className="section-lead">{content.microcopy.contactLead}</p>
            </header>
          </div>

          <div className="contact-body">
            <div className="contact-call">
              <p>Backend work, in production.</p>
              <a className="contact-email" href={`mailto:${content.email}`}>
                {content.email}
              </a>
            </div>

            <div className="contact-details">
              <div>
                <span>Phone</span>
                <a href={`tel:${content.phone.replace(/\s/g, "")}`}>
                  {content.phone}
                </a>
              </div>
              <div>
                <span>GitHub</span>
                <a href={content.github} target="_blank" rel="noreferrer">
                  github.com/abhiiii05
                </a>
              </div>
              <div>
                <span>Studio</span>
                <p>PiixelTheory, co-founder</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <p>{content.name}</p>
          <p>Backend engineer, IIIT Vadodara, 2027.</p>
          <a href="#top">Top &uarr;</a>
        </div>
        <div className="footer-note">
          <span>How this was built</span>
          <p>
            Next.js App Router and TypeScript. Hand-written CSS on a 12-column
            grid. The name is a React Three Fiber plane with a custom GLSL
            dither, loaded after first paint; reduced motion and missing WebGL
            get the static setting.
          </p>
        </div>
      </footer>
    </>
  );
}

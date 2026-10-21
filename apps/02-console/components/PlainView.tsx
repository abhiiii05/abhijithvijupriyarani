import { content } from "@portfolio/content";
import type { RefObject } from "react";

type PlainViewProps = {
  hidden: boolean;
  headingRef: RefObject<HTMLHeadingElement | null>;
};

export function PlainView({ hidden, headingRef }: PlainViewProps) {
  return (
    <section
      className="plain-view"
      data-testid="plain-view"
      aria-labelledby="plain-title"
      hidden={hidden}
    >
      <header className="plain-hero">
        <p className="plain-kicker">Plain view / the same record, no shell</p>
        <h1 id="plain-title" ref={headingRef} tabIndex={-1}>
          {content.name}
        </h1>
        <p className="plain-role">{content.title}</p>
        <div className="plain-hero-foot">
          <p>{content.tagline}</p>
          <p className="plain-availability">{content.availability}</p>
        </div>
      </header>

      <section className="plain-section" aria-labelledby="plain-work">
        <header className="plain-section-head">
          <span>01</span>
          <h2 id="plain-work">Selected work</h2>
          <p>{content.microcopy.proofLead}</p>
        </header>

        <div className="plain-entries">
          {content.proof.map((entry, index) => (
            <article className="plain-entry" key={entry.id}>
              <div className="plain-entry-rail">
                <span className="plain-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{entry.period}</span>
                <span>{entry.kind}</span>
                <span>{entry.location}</span>
              </div>
              <div className="plain-entry-body">
                <h3>{entry.title}</h3>
                <p className="plain-entry-role">
                  {entry.role} / {entry.organisation}
                </p>
                <p className="plain-entry-summary">{entry.summary}</p>
                <ul className="plain-bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {entry.metrics.length > 0 ? (
                  <dl className="plain-metrics">
                    {entry.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt>{metric.label}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <p className="plain-stack">{entry.stack.join(" / ")}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="plain-section" aria-labelledby="plain-projects">
        <header className="plain-section-head">
          <span>02</span>
          <h2 id="plain-projects">Projects</h2>
          <p>{content.microcopy.projectsLead}</p>
        </header>

        <div className="plain-entries">
          {content.projects.map((entry, index) => (
            <article className="plain-entry" key={entry.id}>
              <div className="plain-entry-rail">
                <span className="plain-index">
                  {String(index + 4).padStart(2, "0")}
                </span>
                <span>{entry.date}</span>
                <span>Independent build</span>
              </div>
              <div className="plain-entry-body">
                <h3>{entry.title}</h3>
                <p className="plain-entry-summary">{entry.summary}</p>
                <ul className="plain-bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {entry.metrics.length > 0 ? (
                  <dl className="plain-metrics">
                    {entry.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt>{metric.label}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <p className="plain-stack">{entry.stack.join(" / ")}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="plain-section" aria-labelledby="plain-experience">
        <header className="plain-section-head">
          <span>03</span>
          <h2 id="plain-experience">Experience</h2>
          <p>
            Two roles, one studio, and the work each one put into production.
          </p>
        </header>

        <div className="plain-entries">
          {content.experience.map((entry) => (
            <article className="plain-entry" key={entry.id}>
              <div className="plain-entry-rail">
                <span>{entry.period}</span>
                <span>{entry.location}</span>
              </div>
              <div className="plain-entry-body">
                <h3>
                  {entry.organisation} — {entry.role}
                </h3>
                <p className="plain-entry-summary">{entry.summary}</p>
                <ul className="plain-bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="plain-section" aria-labelledby="plain-skills">
        <header className="plain-section-head">
          <span>04</span>
          <h2 id="plain-skills">Skills</h2>
          <p>Languages, frameworks, infrastructure and data.</p>
        </header>

        <div className="plain-skills">
          {content.skills.map((group) => (
            <div className="plain-skill-row" key={group.label}>
              <h3>{group.label}</h3>
              <p>{group.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="plain-section" aria-labelledby="plain-record">
        <header className="plain-section-head">
          <span>05</span>
          <h2 id="plain-record">Record</h2>
          <p>
            {content.education.degree}, {content.education.institution},{" "}
            {content.education.period}.
          </p>
        </header>

        <div className="plain-record">
          <div>
            <h3 className="plain-subhead">Achievements</h3>
            <ol className="plain-achievements">
              {content.achievements.map((achievement, index) => (
                <li key={achievement.text}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{achievement.text}</strong>
                  <em>{achievement.detail}</em>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="plain-subhead">Leadership</h3>
            <div className="plain-leadership">
              {content.leadership.map((role) => (
                <article key={role.role}>
                  <p className="plain-leadership-meta">
                    {role.year} / {role.organisation}
                  </p>
                  <h4>{role.role}</h4>
                  <p>{role.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="plain-section plain-contact" aria-labelledby="plain-contact">
        <header className="plain-section-head">
          <span>06</span>
          <h2 id="plain-contact">Contact</h2>
          <p>{content.microcopy.contactLead}</p>
        </header>

        <div className="plain-contact-body">
          <a href={`mailto:${content.email}`}>{content.email}</a>
          <div>
            <p>
              <span>Phone</span>
              <a href={`tel:${content.phone.replace(/\s/g, "")}`}>
                {content.phone}
              </a>
            </p>
            <p>
              <span>GitHub</span>
              <a href={content.github} target="_blank" rel="noreferrer">
                github.com/abhiiii05
              </a>
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}

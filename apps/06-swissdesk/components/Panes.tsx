import { content } from "@portfolio/content";
import { RichText } from "./RichText";

function workTitle(title: string) {
  return title.replace(/\s*\u2014\s*/g, ": ");
}

export function WorkPane() {
  return (
    <>
      <div className="pane-intro">
        <p className="pane-kicker">In production / 2026</p>
        <p className="pane-lead">{content.microcopy.proofLead}</p>
      </div>

      <div className="entry-list">
        {content.proof.map((entry, index) => (
          <article className="entry" key={entry.id}>
            <div className="entry-top">
              <span className="entry-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="entry-head">
                <h3>{workTitle(entry.title)}</h3>
                <p className="entry-meta">
                  {entry.role} / {entry.kind}
                </p>
              </div>
              <span className="entry-period">{entry.period}</span>
            </div>

            <p className="entry-outcome">
              <RichText text={entry.outcome} />
            </p>
            <p className="entry-copy">
              <RichText text={entry.summary} />
            </p>

            {entry.metrics.length > 0 ? (
              <dl className="metrics">
                {entry.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <p className="entry-stack">{entry.stack.join(" / ")}</p>
          </article>
        ))}
      </div>
    </>
  );
}

export function ProjectsPane() {
  return (
    <>
      <div className="pane-intro">
        <p className="pane-kicker">Selected projects / 2025–26</p>
        <p className="pane-lead">{content.microcopy.projectsLead}</p>
      </div>

      <div className="entry-list">
        {content.projects.map((entry, index) => (
          <article className="entry" key={entry.id}>
            <div className="entry-top">
              <span className="entry-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="entry-head">
                <h3>{entry.title}</h3>
                <p className="entry-meta">{entry.date} / Independent build</p>
              </div>
            </div>

            <p className="entry-outcome">
              <RichText text={entry.outcome} />
            </p>
            <p className="entry-copy">
              <RichText text={entry.summary} />
            </p>

            {entry.metrics.length > 0 ? (
              <dl className="metrics">
                {entry.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <p className="entry-stack">{entry.stack.join(" / ")}</p>
          </article>
        ))}
      </div>
    </>
  );
}

export function ExperiencePane() {
  return (
    <>
      <div className="pane-intro">
        <p className="pane-kicker">Roles / 2026</p>
        <p className="pane-lead">
          Two roles: one studio he co-founded, one migration inside Wipro.
        </p>
      </div>

      <div className="entry-list">
        {content.experience.map((entry, index) => (
          <article className="entry" key={entry.id}>
            <div className="entry-top">
              <span className="entry-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="entry-head">
                <h3>{entry.organisation}</h3>
                <p className="entry-meta">{entry.role}</p>
              </div>
              <span className="entry-period">{entry.period}</span>
            </div>

            <p className="entry-location">{entry.location}</p>
            <p className="entry-copy">
              <RichText text={entry.summary} />
            </p>

            <ul className="bullets">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>
                  <RichText text={bullet} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}

export function SkillsPane() {
  return (
    <>
      <div className="pane-intro">
        <p className="pane-kicker">Working stack</p>
        <p className="pane-lead">
          Languages, frameworks, infrastructure and data used in production.
        </p>
      </div>

      <dl className="skill-table">
        {content.skills.map((group) => (
          <div className="skill-row" key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function RecordPane() {
  return (
    <>
      <div className="pane-intro">
        <p className="pane-kicker">Education, awards, leadership</p>
        <p className="pane-lead">
          {content.education.degree}, {content.education.institution},{" "}
          {content.education.period}.
        </p>
      </div>

      <section className="record-block" aria-label="Achievements">
        <h3 className="record-title">
          Achievements
        </h3>
        <ol className="award-list">
          {content.achievements.map((achievement, index) => (
            <li key={achievement.text}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{achievement.text}</strong>
              <em>{achievement.detail}</em>
            </li>
          ))}
        </ol>
      </section>

      <section className="record-block" aria-label="Leadership">
        <h3 className="record-title">
          Leadership
        </h3>
        <div className="lead-list">
          {content.leadership.map((role) => (
            <article key={role.role}>
              <p className="lead-meta">
                {role.year} / {role.organisation}
              </p>
              <h4>{role.role}</h4>
              <p>
                <RichText text={role.detail} />
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function ContactPane() {
  return (
    <>
      <div className="pane-intro">
        <p className="pane-kicker">Contact</p>
        <p className="pane-lead">{content.microcopy.contactLead}</p>
      </div>

      <div className="contact-block">
        <a className="contact-mail" href={`mailto:${content.email}`}>
          {content.email}
        </a>

        <dl className="contact-list">
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${content.phone.replace(/\s/g, "")}`}>
                {content.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={content.github} target="_blank" rel="noreferrer">
                github.com/abhiiii05
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}

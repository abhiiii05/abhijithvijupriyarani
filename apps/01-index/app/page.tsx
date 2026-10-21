import { content } from "@portfolio/content";
import { IndexTable } from "@/components/IndexTable";
import { ScrollEffects } from "@/components/ScrollEffects";

export default function Home() {
  const entries = content.proof.length + content.projects.length;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollEffects />

      <header className="masthead">
        <div className="wrap masthead-inner">
          <span className="mono">The Index / selected work</span>
          <span className="mono">Abhijith Viju Priya Rani</span>
          <a className="mono" href="#contact">
            Available for work
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="wrap">
            <div className="hero-top">
              <p className="hero-role">{content.title}</p>
              <span className="hero-avail mono">{content.availability}</span>
            </div>

            <h1 className="hero-name" aria-label={content.name}>
              <span className="line reveal-line" aria-hidden="true">
                <span>Abhijith Viju</span>
              </span>
              <span className="line reveal-line" aria-hidden="true">
                <span>
                  Priya <span className="accent">Rani</span>
                </span>
              </span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-lede">{content.tagline}</p>
              <div className="hero-figures" aria-label="Selected hard numbers">
                <span>
                  <b>4</b> services migrated
                </span>
                <span>
                  <b>40+</b> regression cases
                </span>
                <span>
                  <b>25+</b> concurrent jobs
                </span>
                <span>
                  <b>0</b> dropped tasks
                </span>
              </div>
            </div>

            <div className="hero-scroll mono">
              <span>Index of selected work — {String(entries).padStart(2, "0")} entries</span>
              <span>2025–2026</span>
            </div>
          </div>
        </section>

        <section className="index-section" aria-labelledby="index-heading">
          <div className="wrap">
            <div className="index-head">
              <h2 id="index-heading">Index of selected work</h2>
              <span className="mono">Click a row to open the case study</span>
            </div>
            <IndexTable />
          </div>
        </section>

        <section className="chapter" id="profile" aria-labelledby="profile-heading">
          <div className="wrap">
            <div className="chapter-head">
              <span className="chapter-no">01</span>
              <h2 id="profile-heading">Profile</h2>
              <span className="chapter-note">Education / availability</span>
            </div>
            <div className="chapter-grid">
              <p className="chapter-lede">{content.microcopy.aboutLead}</p>
              <dl className="facts">
                <div>
                  <dt>Degree</dt>
                  <dd>{content.education.degree}</dd>
                </div>
                <div>
                  <dt>Institution</dt>
                  <dd>{content.education.institution}</dd>
                </div>
                <div>
                  <dt>Period</dt>
                  <dd>{content.education.period}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{content.availability}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="chapter" id="skills" aria-labelledby="skills-heading">
          <div className="wrap">
            <div className="chapter-head">
              <span className="chapter-no">02</span>
              <h2 id="skills-heading">Skills</h2>
              <span className="chapter-note">Languages to infrastructure</span>
            </div>
            <div className="chapter-grid">
              <dl className="skill-list">
                {content.skills.map((group) => (
                  <div className="skill-line" key={group.label}>
                    <dt>{group.label}</dt>
                    <dd>{group.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="chapter" id="record" aria-labelledby="record-heading">
          <div className="wrap">
            <div className="chapter-head">
              <span className="chapter-no">03</span>
              <h2 id="record-heading">Record</h2>
              <span className="chapter-note">Achievements / leadership</span>
            </div>
            <div className="record-grid">
              <div className="record-achievements">
                <h3 className="mono" style={{ marginBottom: "0.6rem" }}>
                  Achievements
                </h3>
                <ul className="record-list">
                  {content.achievements.map((item) => (
                    <li key={item.text}>
                      {item.text}
                      <span>{item.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="record-leadership">
                <h3 className="mono" style={{ marginBottom: "0.6rem" }}>
                  Leadership
                </h3>
                {content.leadership.map((item) => (
                  <article className="leader" key={item.role}>
                    <h3>
                      {item.role} · {item.organisation}
                    </h3>
                    <p>{item.detail}</p>
                    <p className="mono">{item.year}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-heading">
          <div className="wrap">
            <div className="contact-inner">
              <div className="contact-main">
                <p className="mono" style={{ color: "var(--accent)", marginBottom: "0.8rem" }}>
                  04 / Contact
                </p>
                <h2 id="contact-heading">Contact</h2>
                <p className="hero-role" style={{ marginBottom: "1rem" }}>
                  {content.microcopy.contactLead}
                </p>
                <a className="contact-email" href={`mailto:${content.email}`}>
                  {content.email}
                </a>
              </div>
              <div className="contact-side">
                <dl>
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
                  <div>
                    <dt>Education</dt>
                    <dd>
                      {content.education.institution}
                      <br />
                      {content.education.period}
                    </dd>
                  </div>
                  <div>
                    <dt>Availability</dt>
                    <dd>{content.availability}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <footer className="footer">
              <p>
                <span className="mono" style={{ display: "block", marginBottom: "0.25rem" }}>
                  {content.microcopy.footerNote}
                </span>
                Next.js 16 · React 19 · Tailwind CSS v4 · GSAP ScrollTrigger ·
                Lenis · Motion shared-element expansion. Type: Fraunces, Karla,
                IBM Plex Mono.
              </p>
              <p className="mono">{content.name}</p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

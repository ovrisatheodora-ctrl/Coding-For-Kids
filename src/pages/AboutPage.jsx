import aboutIllustration from '../assets/Playful_Pink_Idea_Cube.png';
import mascotIllustration from '../assets/Maskot_Coding_For_Kids.png';
import './AboutPage.css';

const STEP_ICONS = ['📚', '👀', '✍️', '🧩', '💬', '🏆'];
const STEP_COLORS = [
  'var(--sour-apple)',
  'var(--summer-sky)',
  'var(--blossom)',
  'var(--sour-apple)',
  'var(--summer-sky)',
  'var(--blossom)',
];

function AboutPage({ t }) {
  return (
    <main id="main-content" className="about-page">
      <div className="about-shell container">
        <section className="about-intro" aria-labelledby="about-title">
          <div className="about-intro-copy">
            <div className="about-intro-icon">
              <img src={aboutIllustration} alt="" />
            </div>
            <div>
              <h1 id="about-title" className="about-title">{t.about.title}</h1>
              <p>{t.about.intro}</p>
            </div>
          </div>
          <div className="about-stats">
            {t.about.stats.map((stat) => (
              <div className="about-stat" key={stat.text}>
                <span aria-hidden="true">{stat.icon}</span>
                <strong>{stat.text}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-learning" aria-labelledby="about-learning-title">
          <h2 id="about-learning-title" className="about-section-title">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
            </svg>
            {t.about.howTitle}
          </h2>
          <div className="about-learning-layout">
            <div className="about-steps">
              {t.about.steps.map((step, index) => (
                <article className="about-step" key={step.title}>
                  <div className="about-step-capsule" style={{ '--step-color': STEP_COLORS[index] }}>
                    <span>{index + 1}</span>
                    <span aria-hidden="true">{STEP_ICONS[index]}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              ))}
            </div>
            <aside className="about-mascot">
              <img src={mascotIllustration} alt="" />
              <p>{t.about.mascotCaption}</p>
            </aside>
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-features-title">
          <h2 id="about-features-title" className="about-section-title">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
            </svg>
            {t.about.featuresTitle}
          </h2>
          <div className="about-features">
            {t.about.features.map((feature, index) => (
              <article
                className="about-feature-card"
                key={feature.title}
                style={{ '--feature-color': STEP_COLORS[(index + 1) % STEP_COLORS.length] }}
              >
                <span className="about-feature-icon" aria-hidden="true">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <span className="about-feature-go" aria-hidden="true">→</span>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-badges-title">
          <div className="about-badges-heading">
            <h2 id="about-badges-title" className="about-section-title">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
              </svg>
              {t.about.badgesTitle}
            </h2>
            <span>{t.about.badgesCaption}</span>
          </div>
          <div className="about-badges">
            {t.badges.map((badge) => (
              <article className="about-badge-card" key={badge.id}>
                <span className="about-badge-icon" aria-hidden="true">{badge.icon}</span>
                <span className="about-badge-copy">
                  <strong>{badge.name}</strong>
                  <span>{badge.desc}</span>
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;

import mascotIllustration from '../assets/About Maskot.webp';
import bugHunterAsset from '../assets/Bug Hunter.webp';
import basicCodingAsset from '../assets/Grade 3-4.webp';
import logicAlgorithmsAsset from '../assets/Brain.webp';
import creativeGameAsset from '../assets/Card Color Studio.webp';
import iosChampionAsset from '../assets/IOS Champion.webp';
import iosStarAsset from '../assets/IOS Star.webp';
import iosBookAsset from '../assets/IOS BOOK.webp';
import iosEyesAsset from '../assets/IOS Eyes.webp';
import iosWritingAsset from '../assets/IOS Writting.webp';
import iosPuzzleAsset from '../assets/IOS Puzzle.webp';
import iosBubblechatAsset from '../assets/IOS Bubblechat.webp';
import iosAgeAppropriateAsset from '../assets/IOS Age-appropriate.webp';
import iosShieldAsset from '../assets/IOS Perisai.webp';
import iosRobotAsset from '../assets/IOS Robot.webp';
import iosWorldAsset from '../assets/IOS World.webp';
import iosPhoneAsset from '../assets/IOS Phone.webp';
import badgePatternFinderAsset from '../assets/Badge Pattern Finder.webp';
import badgeGameCreatorAsset from '../assets/Badge Game Creator.webp';
import robotExplorerAsset from '../assets/Card move crth.webp';
import iosGameAsset from '../assets/IOS Game.webp';
import PastelBackdrop from '../components/PastelBackdrop';
import './AboutPage.css';

const STEP_ASSETS = [
  iosBookAsset,
  iosEyesAsset,
  iosWritingAsset,
  iosPuzzleAsset,
  iosBubblechatAsset,
];
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
      <PastelBackdrop />
      <div className="about-shell container">
        <section className="about-intro" aria-labelledby="about-title">
          <div className="about-intro-copy">
            <div>
              <h1 id="about-title" className="about-title">{t.about.title}</h1>
              <p>{t.about.intro}</p>
            </div>
          </div>
          <div className="about-stats">
            {t.about.stats.map((stat) => (
              <div className="about-stat" key={stat.text}>
                <span aria-hidden="true">
                  {stat.id === 'learn-through-play'
                    ? <img className="about-game-icon" src={iosGameAsset} alt="" />
                    : stat.id === 'age-appropriate'
                    ? <img className="about-game-icon about-game-icon--age" src={iosAgeAppropriateAsset} alt="" />
                    : stat.id === 'safe-trusted'
                    ? <img className="about-game-icon" src={iosShieldAsset} alt="" />
                    : stat.icon}
                </span>
                <strong>{stat.text}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section about-learning" aria-labelledby="about-learning-title">
          <h2 id="about-learning-title" className="about-section-title">
            <img className="about-section-star" src={iosStarAsset} alt="" aria-hidden="true" />
            {t.about.howTitle}
          </h2>
          <div className="about-learning-layout">
            <div className="about-steps">
              {t.about.steps.map((step, index) => (
                <article className="about-step" key={step.title}>
                  <div className="about-step-capsule" style={{ '--step-color': STEP_COLORS[index] }}>
                    <span>{index + 1}</span>
                    <span className="about-step-icon" aria-hidden="true">
                      <img
                        className="about-step-icon--aligned"
                        src={STEP_ASSETS[index]}
                        alt=""
                      />
                    </span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              ))}
            </div>
            <aside className="about-mascot">
              <img src={mascotIllustration} alt="" />
            </aside>
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-features-title">
          <h2 id="about-features-title" className="about-section-title">
            <img className="about-section-star" src={iosStarAsset} alt="" aria-hidden="true" />
            {t.about.featuresTitle}
          </h2>
          <div className="about-features">
            {t.about.features.map((feature, index) => (
              <article
                className="about-feature-card"
                key={feature.title}
                style={{ '--feature-color': STEP_COLORS[(index + 1) % STEP_COLORS.length] }}
              >
                <span className="about-feature-icon" aria-hidden="true">
                  {feature.id === 'interactive-games'
                    ? <img className="about-game-feature-icon about-feature-icon--games" src={iosGameAsset} alt="" />
                    : feature.id === 'structured-curriculum'
                    ? <img className="about-book-feature-icon about-feature-icon--book" src={iosBookAsset} alt="" />
                    : feature.id === 'gamification'
                    ? <img className="about-award-icon" src={iosChampionAsset} alt="" />
                    : feature.id === 'ai-assistant'
                    ? <img className="about-game-feature-icon about-feature-icon--robot" src={iosRobotAsset} alt="" />
                    : feature.id === 'bilingual'
                    ? <img className="about-game-feature-icon" src={iosWorldAsset} alt="" />
                    : feature.id === 'responsive'
                    ? <img className="about-game-feature-icon about-feature-icon--phone" src={iosPhoneAsset} alt="" />
                    : feature.icon}
                </span>
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
              <img className="about-section-star" src={iosStarAsset} alt="" aria-hidden="true" />
              {t.about.badgesTitle}
            </h2>
            <span>{t.about.badgesCaption}</span>
          </div>
          <div className="about-badges">
            {t.badges.map((badge) => (
              <article className="about-badge-card" key={badge.id}>
                <span className="about-badge-icon" aria-hidden="true">
                  {badge.id === 'pattern-finder' ? (
                    <img className="about-badge-icon--enlarged" src={badgePatternFinderAsset} alt="" />
                  ) : badge.id === 'game-creator' ? (
                    <img className="about-badge-icon--enlarged" src={badgeGameCreatorAsset} alt="" />
                  ) : badge.id === 'bug-hunter' ? (
                    <img src={bugHunterAsset} alt="" />
                  ) : badge.id === 'junior-coder' ? (
                    <img src={basicCodingAsset} alt="" />
                  ) : badge.id === 'problem-solver' ? (
                    <img src={logicAlgorithmsAsset} alt="" />
                  ) : badge.id === 'robot-explorer' ? (
                    <img className="about-badge-icon--enlarged" src={robotExplorerAsset} alt="" />
                  ) : badge.id === 'creative-coder' ? (
                    <img className="about-badge-icon--creative" src={creativeGameAsset} alt="" />
                  ) : badge.icon}
                </span>
                <span className="about-badge-copy">
                  <strong>{badge.name}</strong>
                  <span>{badge.desc}</span>
                </span>
              </article>
            ))}
          </div>
        </section>
        <section className="about-section about-parent-note" aria-labelledby="about-parent-note-title">
          <h2 id="about-parent-note-title">{t.about.parentPrivacyTitle}</h2>
          <p>{t.about.parentPrivacyNote}</p>
        </section>
      </div>
    </main>
  );
}

export default AboutPage;

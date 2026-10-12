import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLabel from '../ArrowLabel';
import './LessonsSection.css';
import playfulIdeaCube240 from '../../assets/optimized/pink-cube-240w.webp';
import playfulIdeaCube480 from '../../assets/optimized/pink-cube-480w.webp';
import kawaiiRobot240 from '../../assets/optimized/kawaii-robot-240w.webp';
import kawaiiRobot480 from '../../assets/optimized/kawaii-robot-480w.webp';
import kawaiiCat240 from '../../assets/optimized/kawaii-cat-240w.webp';
import kawaiiCat480 from '../../assets/optimized/kawaii-cat-480w.webp';

const ILLUSTRATIONS = [
  {
    src: playfulIdeaCube240,
    srcSet: `${playfulIdeaCube240} 240w, ${playfulIdeaCube480} 480w`,
    width: 240,
    height: 240,
  },
  {
    src: kawaiiRobot240,
    srcSet: `${kawaiiRobot240} 240w, ${kawaiiRobot480} 480w`,
    width: 283,
    height: 240,
  },
  {
    src: kawaiiCat240,
    srcSet: `${kawaiiCat240} 240w, ${kawaiiCat480} 480w`,
    width: 336,
    height: 240,
  },
];
const CARD_COLORS = ['#FFE98B', '#9BD0FF', '#F7A8CE'];
const CARD_LEVELS = [2, 2, 2];

function LessonCard({ card, exploreLabel, levelLabel, levelAriaLabel, index, visible = false }) {
  const navigate = useNavigate();
  const illustration = ILLUSTRATIONS[index];
  const level = CARD_LEVELS[index];

  const handleExplore = () => {
    navigate(`/lessons/${card.id}`);
  };

  return (
    <article
      className={`lesson-card card${visible ? ' visible' : ''}`}
      style={{ '--card-color': CARD_COLORS[index] }}
      tabIndex={0}
      role="button"
      aria-label={`Lesson ${card.number}: ${card.title}`}
      onClick={handleExplore}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleExplore();
        }
      }}
    >
      <span className="lesson-card-number">{card.number}</span>
      <span className="lesson-card-star" aria-hidden="true">★</span>
      <img
        className="card-illustration"
        src={illustration.src}
        srcSet={illustration.srcSet}
        sizes="240px"
        alt=""
        aria-hidden="true"
        width={illustration.width}
        height={illustration.height}
        loading="lazy"
        decoding="async"
      />

      <div className="lesson-card-body">
        <h3 className="lesson-card-title">{card.title}</h3>
        <p className="lesson-card-desc">{card.description}</p>
        <div className="lesson-card-level">
          <span>{levelLabel}</span>
          <span
            className="lesson-card-level-dots"
            role="img"
            aria-label={levelAriaLabel.replace('{level}', level)}
          >
            {[0, 1, 2, 3].map((dot) => (
              <span
                key={dot}
                className={`lesson-card-level-dot${dot < level ? ' is-active' : ''}`}
              />
            ))}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="btn lesson-card-btn"
        onClick={(event) => {
          event.stopPropagation();
          handleExplore();
        }}
        aria-label={`${exploreLabel} ${card.title}`}
      >
        <ArrowLabel>{exploreLabel}</ArrowLabel>
      </button>
    </article>
  );
}

function LessonsSection({ t }) {
  const ls = t.lessons;
  const sectionRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.lesson-card');
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [t]);

  return (
    <section className="lessons-section section-pad" ref={sectionRef} id="lessons" aria-label="Lessons section">
      {/* Section header */}
      <div className="lessons-header container">
        <div className="lessons-heading-row">
          <span className="lessons-deco-arrow" aria-hidden="true">→</span>
          <h2 className="section-title lessons-title">{ls.sectionTitle}</h2>
          <span className="lessons-deco-star doodle-star" aria-hidden="true">✦</span>
        </div>
        <p className="section-subtitle">{ls.sectionSubtitle}</p>
      </div>

      {/* Cards grid */}
      <div className="lessons-grid container">
        {t.lessonCards.map((card, i) => (
          <LessonCard
            key={card.id}
            card={card}
            exploreLabel={ls.exploreBtn}
            levelLabel={ls.levelLabel}
            levelAriaLabel={ls.levelAriaLabel}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

export default LessonsSection;
export { LessonCard };

import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLabel from '../ArrowLabel';
import './LessonsSection.css';
import playfulIdeaCube from '../../assets/Playful_Pink_Idea_Cube.png';
import kawaiiRobot from '../../assets/Kawaii_Robot_and_Pastel_Signpost.png';
import kawaiiCat from '../../assets/Kawaii_Cat_Designing_a_Star.png';

const ILLUSTRATIONS = [playfulIdeaCube, kawaiiRobot, kawaiiCat];
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
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleExplore()}
    >
      <span className="lesson-card-number">{card.number}</span>
      <span className="lesson-card-star" aria-hidden="true">★</span>
      <img className="card-illustration" src={illustration} alt="" aria-hidden="true" />

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
        className="btn lesson-card-btn"
        onClick={handleExplore}
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

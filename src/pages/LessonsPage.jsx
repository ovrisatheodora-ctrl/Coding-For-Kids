import { LessonCard } from '../components/LessonsSection/LessonsSection';
import './LessonsPage.css';

function LessonsPage({ t }) {
  const { sectionTitle, sectionSubtitle, exploreBtn, levelLabel, levelAriaLabel } = t.lessons;

  return (
    <main id="main-content" className="lessons-page">
      <div className="lessons-page-banner">
        <div className="container">
          <div className="lessons-heading-row">
            <span className="lessons-deco-arrow" aria-hidden="true">→</span>
            <h1 className="lessons-page-title">{sectionTitle}</h1>
            <span className="lessons-deco-star doodle-star" aria-hidden="true">✦</span>
          </div>
          <p className="lessons-page-subtitle">{sectionSubtitle}</p>
        </div>
      </div>

      <section className="lessons-grid lessons-page-grid container" aria-label="All lessons">
        {t.lessonCards.map((card, i) => (
          <LessonCard
            key={card.id}
            card={card}
            exploreLabel={exploreBtn}
            levelLabel={levelLabel}
            levelAriaLabel={levelAriaLabel}
            index={i}
            visible
          />
        ))}
      </section>
    </main>
  );
}

export default LessonsPage;

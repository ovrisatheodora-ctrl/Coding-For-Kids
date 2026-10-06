import { Link } from 'react-router-dom';
import './LessonsPage.css';

function LessonsPage({ t }) {
  const { sectionTitle, sectionSubtitle, exploreBtn, levels } = t.lessons;
  const COLORS = ['#C7EF8E', '#CCF6FF', '#FFD1F3'];
  const ICONS_BIG = ['🧠', '💻', '🎨'];

  return (
    <main id="main-content" className="lessons-page">
      {/* Hero banner */}
      <div className="lessons-page-banner">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{t.lessonDetail?.breadcrumbHome || 'Home'}</Link>
            <span aria-hidden="true"> → </span>
            <span>{t.lessonDetail?.breadcrumbLessons || 'Lessons'}</span>
          </nav>
          <h1 className="lessons-page-title">{sectionTitle}</h1>
          <p className="lessons-page-subtitle">{sectionSubtitle}</p>
        </div>
      </div>

      {/* Cards */}
      <section className="lessons-page-grid container" aria-label="All lessons">
        {t.lessonCards.map((card, i) => (
          <article
            key={card.id}
            className="lessons-page-card"
            style={{ '--card-color': COLORS[i] }}
          >
            <div className="lp-card-number">{card.number}</div>
            <div className="lp-card-icon">{ICONS_BIG[i]}</div>
            <h2 className="lp-card-title">{card.title}</h2>
            <p className="lp-card-desc">{card.description}</p>
            <div className="lp-card-tags">
              {card.tags.map((tag) => (
                <span key={tag} className="lesson-tag">{tag}</span>
              ))}
            </div>
            <div className="lp-card-level">
              <span className="level-dot" /> {levels}
            </div>
            <Link to={`/lessons/${card.id}`} className="btn lp-card-btn">
              {exploreBtn}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default LessonsPage;

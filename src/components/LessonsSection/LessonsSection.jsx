import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonsSection.css';

// Inline SVG illustrations for each card
function LogicIllustration() {
  return (
    <svg viewBox="0 0 120 100" className="card-illustration" aria-hidden="true">
      {/* Brain icon with circuit pattern */}
      <circle cx="60" cy="48" r="32" fill="white" stroke="#111" strokeWidth="2.5" />
      {/* Left brain hemisphere */}
      <path d="M60 20 Q38 22 32 42 Q28 55 36 65 Q44 72 55 70 L60 70 Z" fill="#C7EF8E" stroke="#111" strokeWidth="2" />
      {/* Right brain hemisphere */}
      <path d="M60 20 Q82 22 88 42 Q92 55 84 65 Q76 72 65 70 L60 70 Z" fill="#C7EF8E" stroke="#111" strokeWidth="2" />
      {/* Circuit dots */}
      <circle cx="48" cy="45" r="4" fill="#111" />
      <circle cx="72" cy="45" r="4" fill="#111" />
      <line x1="48" y1="45" x2="60" y2="45" stroke="#111" strokeWidth="2" />
      <line x1="60" y1="45" x2="72" y2="45" stroke="#111" strokeWidth="2" />
      <circle cx="60" cy="45" r="4" fill="#FFD1F3" stroke="#111" strokeWidth="1.5" />
      {/* Stars */}
      <text x="20" y="25" fontSize="14" fill="#C7EF8E">⭐</text>
      <text x="88" y="30" fontSize="12" fill="#FFD1F3">✦</text>
      <text x="50" y="95" fontSize="10" fill="#111" fontFamily="monospace" fontWeight="bold">{'if(x) → ?'}</text>
    </svg>
  );
}

function CodingIllustration() {
  return (
    <svg viewBox="0 0 120 100" className="card-illustration" aria-hidden="true">
      {/* Laptop */}
      <rect x="20" y="30" width="80" height="52" rx="6" fill="white" stroke="#111" strokeWidth="2.5" />
      <rect x="26" y="36" width="68" height="36" rx="3" fill="#111" />
      {/* Screen content */}
      <text x="30" y="52" fontSize="7" fill="#C7EF8E" fontFamily="monospace">{'> print("Hi!")'}</text>
      <text x="30" y="63" fontSize="7" fill="#CCF6FF" fontFamily="monospace">{'Hi, Coder! 🎉'}</text>
      {/* Keyboard */}
      <rect x="15" y="82" width="90" height="10" rx="5" fill="#ddd" stroke="#111" strokeWidth="2" />
      {/* Stars */}
      <text x="8" y="38" fontSize="14" fill="#CCF6FF">⭐</text>
      <text x="95" y="28" fontSize="11" fill="#111">✦</text>
      {/* Cursor */}
      <text x="94" y="58" fontSize="9" fill="#FFD1F3">█</text>
    </svg>
  );
}

function CreativeIllustration() {
  return (
    <svg viewBox="0 0 120 100" className="card-illustration" aria-hidden="true">
      {/* Palette */}
      <ellipse cx="58" cy="52" rx="36" ry="28" fill="white" stroke="#111" strokeWidth="2.5" />
      <circle cx="42" cy="44" r="7" fill="#FFD1F3" stroke="#111" strokeWidth="1.5" />
      <circle cx="58" cy="38" r="7" fill="#C7EF8E" stroke="#111" strokeWidth="1.5" />
      <circle cx="74" cy="44" r="7" fill="#C7EF8E" stroke="#111" strokeWidth="1.5" />
      <circle cx="76" cy="60" r="7" fill="#CCF6FF" stroke="#111" strokeWidth="1.5" />
      <circle cx="40" cy="60" r="7" fill="#FFD1F3" stroke="#111" strokeWidth="1.5" />
      {/* Brush */}
      <rect x="72" y="20" width="6" height="32" rx="3" fill="#C7EF8E" stroke="#111" strokeWidth="2" transform="rotate(30 75 36)" />
      <rect x="70" y="46" width="10" height="7" rx="2" fill="#111" transform="rotate(30 75 50)" />
      {/* Stars */}
      <text x="8" y="22" fontSize="14" fill="#FFD1F3">⭐</text>
      <text x="98" y="38" fontSize="11" fill="#C7EF8E">✦</text>
      <text x="50" y="95" fontSize="8" fill="#111" fontFamily="sans-serif" fontWeight="bold">🎨 Create!</text>
    </svg>
  );
}

const ILLUSTRATIONS = [LogicIllustration, CodingIllustration, CreativeIllustration];

function LessonCard({ card, exploreLabel, levelsLabel, index, lang }) {
  const navigate = useNavigate();
  const Illustration = ILLUSTRATIONS[index];

  const handleExplore = () => {
    navigate(`/lessons/${card.id}`);
  };

  return (
    <article
      className="lesson-card card"
      style={{ '--card-color': card.color }}
      tabIndex={0}
      role="button"
      aria-label={`Lesson ${card.number}: ${card.title}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleExplore()}
    >
      <div className="lesson-card-top">
        <span className="lesson-card-number">{card.number}</span>
        <span className="lesson-card-star" aria-hidden="true">⭐</span>
      </div>

      <div className="lesson-card-illustration">
        <Illustration />
      </div>

      <div className="lesson-card-body">
        <div className="lesson-card-icon">{card.icon}</div>
        <h3 className="lesson-card-title">{card.title}</h3>
        <p className="lesson-card-desc">{card.description}</p>
        <div className="lesson-card-tags">
          {card.tags.map((tag) => (
            <span key={tag} className="lesson-tag">{tag}</span>
          ))}
        </div>
        <div className="lesson-card-level">
          <span className="level-dot" />
          {levelsLabel}
        </div>
      </div>

      <button
        className="btn lesson-card-btn"
        onClick={handleExplore}
        aria-label={`${exploreLabel} ${card.title}`}
      >
        {exploreLabel}
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
            levelsLabel={ls.levels}
            index={i}
            lang={t}
          />
        ))}
      </div>
    </section>
  );
}

export default LessonsSection;

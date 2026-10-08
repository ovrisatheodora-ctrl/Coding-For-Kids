import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import grade12Asset from '../assets/Grade 1-2.png';
import grade34Asset from '../assets/Grade 3-4.png';
import grade56Asset from '../assets/Grade 5-6.png';
import grade12StarAsset from '../assets/Grade 1-2.png';
import learnAsset from '../assets/Learn.png';
import gameAsset from '../assets/Game.png';
import logicIllustration from '../assets/LOGIKA & ALGORITMA.png';
import codingIllustration from '../assets/CODING DASAR.png';
import creativeIllustration from '../assets/CODING KREATIF & PROYEK.png';
import { setGrade as saveGrade, setLanguage as saveLang } from '../data/progress';
import './LessonDetailPage.css';

const GRADE_ASSETS = {
  '1-2': grade12Asset,
  '3-4': grade34Asset,
  '5-6': grade56Asset,
};

const LESSON_ILLUSTRATIONS = {
  'logic-algorithms': logicIllustration,
  'basic-coding': codingIllustration,
  'creative-coding': creativeIllustration,
};

const LESSON_META = {
  'logic-algorithms': {
    colorBg: '#FFE45C',
  },
  'basic-coding': {
    colorBg: '#CCF6FF',
  },
  'creative-coding': {
    colorBg: '#FFD1F3',
  },
};

function LessonDetailPage({ t, lang: appLang, onLangChange }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const meta = LESSON_META[lessonId];
  const ld = t.lessonDetail;
  const lesson = t.lessonCards.find((card) => card.id === lessonId);
  const description = ld.descriptions[lessonId];

  const [selectedGrade, setSelectedGrade] = useState(() => searchParams.get('grade'));
  const [selectedLang, setSelectedLang] = useState(() => searchParams.get('lang'));
  const languageSectionRef = useRef(null);
  const pathSectionRef = useRef(null);

  useEffect(() => {
    const nextSection = selectedLang ? pathSectionRef.current : languageSectionRef.current;

    if (selectedGrade && nextSection) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const scrollToSection = () => {
        nextSection.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'nearest',
        });
      };
      const scrollTimer = window.setTimeout(scrollToSection, reduceMotion ? 0 : 120);

      return () => window.clearTimeout(scrollTimer);
    }

    return undefined;
  }, [selectedGrade, selectedLang]);

  if (!meta || !lesson) {
    return (
      <main className="lesson-detail-page container">
        <h1>Lesson not found</h1>
        <Link to="/lessons" className="btn btn-primary">← Back to Lessons</Link>
      </main>
    );
  }

  const handleStart = (path) => {
    if (!selectedGrade || !selectedLang) {
      alert(appLang === 'en' ? 'Please choose your grade and language first!' : 'Pilih kelas dan bahasa dulu ya!');
      return;
    }
    saveGrade(selectedGrade);
    saveLang(selectedLang);
    onLangChange(selectedLang);
    const destination = path === 'learn' ? 'units' : path;
    navigate(`/lessons/${lessonId}/${destination}?grade=${selectedGrade}&lang=${selectedLang}`);
  };

  return (
    <main id="main-content" className="lesson-detail-page">
      {/* Hero banner */}
      <div className="ld-hero-shell container">
        <Link to="/lessons" className="ld-back">
          <span className="ld-back-arrow" aria-hidden="true">←</span>
          {ld.backToLessons}
        </Link>

        <section
          className="ld-banner"
          style={{ '--card-color': meta.colorBg }}
          aria-labelledby="ld-banner-title"
        >
          <div className="ld-banner-content">
            <div className="ld-banner-text">
              <h1 id="ld-banner-title" className="ld-banner-title">{lesson.title}</h1>
              <p className="ld-banner-desc">{description}</p>
              <span className="ld-topic-pill">
                <img src={grade12StarAsset} alt="" aria-hidden="true" />
                {ld.topicCount((lesson.tags || []).length)}
              </span>
            </div>
            <img
              className={`ld-banner-image${lessonId === 'logic-algorithms' ? ' ld-banner-image--logic' : ''}${lessonId === 'basic-coding' ? ' ld-banner-image--basic' : ''}`}
              src={LESSON_ILLUSTRATIONS[lessonId]}
              alt=""
              aria-hidden="true"
            />
          </div>
        </section>
      </div>

      <div className="ld-body container">
        {/* Grade selection */}
        <section className="ld-section" aria-label="Grade selection">
          <h2 className="ld-section-title ld-grade-title">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 1.5C12.8 7.5 16.5 11.2 22.5 12 16.5 12.8 12.8 16.5 12 22.5 11.2 16.5 7.5 12.8 1.5 12 7.5 11.2 11.2 7.5 12 1.5z" />
            </svg>
            {ld.chooseLevelTitle}
          </h2>
          <div className="ld-grade-grid">
            {ld.grades.map((g) => (
              <button
                key={g.key}
                className={`ld-grade-card${selectedGrade === g.key ? ' selected' : ''}`}
                style={{ '--grade-color': g.color }}
                onClick={() => {
                  setSelectedGrade(g.key);
                  setSelectedLang(null);
                }}
                aria-pressed={selectedGrade === g.key}
              >
                <img
                  className="ld-grade-icon"
                  src={GRADE_ASSETS[g.key]}
                  alt=""
                  aria-hidden="true"
                />
                <span className="ld-grade-copy">
                  <span className="ld-grade-label">{g.label}</span>
                  <span className="ld-grade-sublabel">{g.sublabel}</span>
                </span>
                {selectedGrade === g.key && (
                  <span className="ld-grade-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Language selection */}
        {selectedGrade && (
          <section
            key={selectedGrade}
            ref={languageSectionRef}
            className="ld-section ld-reveal"
            aria-label="Language selection"
          >
            <h3 className="ld-lang-label">{ld.langLabel}</h3>
            <div className="ld-lang-grid">
              <button
                className={`ld-lang-btn ld-reveal-item${selectedLang === 'id' ? ' selected' : ''}`}
                onClick={() => setSelectedLang('id')}
                aria-pressed={selectedLang === 'id'}
              >
                🇮🇩 Bahasa Indonesia
              </button>
              <button
                className={`ld-lang-btn ld-reveal-item${selectedLang === 'en' ? ' selected' : ''}`}
                onClick={() => setSelectedLang('en')}
                aria-pressed={selectedLang === 'en'}
              >
                🇬🇧 English
              </button>
            </div>
          </section>
        )}

        {/* Two-path selection */}
        {selectedGrade && selectedLang && (
        <section
          key={`${selectedGrade}-${selectedLang}`}
          ref={pathSectionRef}
          className="ld-paths ld-reveal"
          aria-label="Choose learning path"
        >
          {/* Learn path */}
          <div className="ld-path-card ld-path-card--learn ld-reveal-item">
            <img className="ld-path-image" src={learnAsset} alt="" aria-hidden="true" />
            <h3 className="ld-path-title">{ld.pathLearn.title}</h3>
            <p className="ld-path-desc">{ld.pathLearn.desc}</p>
            <button
              className="btn btn-primary ld-path-btn"
              onClick={() => handleStart('learn')}
            >
              {ld.pathLearn.btn.replace(/\s*→\s*$/, '')}
              <strong className="ld-path-btn-arrow" aria-hidden="true">→</strong>
            </button>
          </div>

          {/* Game path */}
          <div className="ld-path-card ld-path-card--game ld-reveal-item">
            <img className="ld-path-image" src={gameAsset} alt="" aria-hidden="true" />
            <h3 className="ld-path-title">{ld.pathGame.title}</h3>
            <p className="ld-path-desc">{ld.pathGame.desc}</p>
            <button
              className="btn btn-coral ld-path-btn"
              onClick={() => handleStart('game')}
            >
              {ld.pathGame.btn.replace(/\s*→\s*$/, '')}
              <strong className="ld-path-btn-arrow" aria-hidden="true">→</strong>
            </button>
          </div>
        </section>
        )}
      </div>
    </main>
  );
}

export default LessonDetailPage;

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { setGrade as saveGrade, setLanguage as saveLang } from '../data/progress';
import './LessonDetailPage.css';

const LESSON_META = {
  'logic-algorithms': {
    icon: '🧠',
    colorBg: '#C7EF8E',
    colorAccent: '#C7EF8E',
    // Bilingual quick descriptions
    desc: {
      id: 'Belajar berpikir seperti programmer — pola, urutan, keputusan, dan debugging.',
      en: 'Learn to think like a programmer — patterns, sequences, decisions, and debugging.',
    },
    titleKey: 'LOGIKA & ALGORITMA',
    titleKeyEn: 'LOGIC & ALGORITHMS',
  },
  'basic-coding': {
    icon: '💻',
    colorBg: '#CCF6FF',
    colorAccent: '#FFD1F3',
    desc: {
      id: 'Mulai perjalananmu di dunia coding — beri perintah, susun kode, kendalikan karakter!',
      en: 'Start your coding journey — give commands, arrange code, and control characters!',
    },
    titleKey: 'CODING DASAR',
    titleKeyEn: 'BASIC CODING',
  },
  'creative-coding': {
    icon: '🎨',
    colorBg: '#FFD1F3',
    colorAccent: '#FFD1F3',
    desc: {
      id: 'Gunakan coding untuk berkreasi — buat karakter, cerita, dan game-mu sendiri!',
      en: 'Use coding to create — make your own characters, stories, and games!',
    },
    titleKey: 'CODING KREATIF & PROYEK',
    titleKeyEn: 'CREATIVE CODING & PROJECTS',
  },
};

function LessonDetailPage({ t, lang: appLang }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const meta = LESSON_META[lessonId];
  const ld = t.lessonDetail;

  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedLang, setSelectedLang] = useState(appLang || 'id');

  if (!meta) {
    return (
      <main className="lesson-detail-page container">
        <h1>Lesson not found</h1>
        <Link to="/lessons" className="btn btn-primary">← Back to Lessons</Link>
      </main>
    );
  }

  const title = appLang === 'en' ? meta.titleKeyEn : meta.titleKey;
  const description = meta.desc[appLang] || meta.desc.id;

  const handleStart = (path) => {
    if (!selectedGrade) {
      alert(appLang === 'en' ? 'Please choose your grade first!' : 'Pilih kelas dulu ya!');
      return;
    }
    saveGrade(selectedGrade);
    saveLang(selectedLang);
    // Route to learning or game (placeholder — to be built in next phases)
    navigate(`/lessons/${lessonId}/${path}?grade=${selectedGrade}&lang=${selectedLang}`);
  };

  return (
    <main id="main-content" className="lesson-detail-page">
      {/* Hero banner */}
      <div
        className="ld-banner"
        style={{ '--card-color': meta.colorBg }}
      >
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{ld.breadcrumbHome}</Link>
            <span aria-hidden="true"> → </span>
            <Link to="/lessons">{ld.breadcrumbLessons}</Link>
            <span aria-hidden="true"> → </span>
            <span>{title}</span>
          </nav>

          <div className="ld-banner-content">
            <div className="ld-banner-text">
              <div className="ld-banner-icon">{meta.icon}</div>
              <h1 className="ld-banner-title">{title}</h1>
              <p className="ld-banner-desc">{description}</p>
            </div>
            <div className="ld-banner-deco" aria-hidden="true">
              <span className="ld-deco-star">⭐</span>
              <span className="ld-deco-plus">+</span>
              <span className="ld-deco-spark">✦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="ld-body container">
        {/* Grade selection */}
        <section className="ld-section" aria-label="Grade selection">
          <h2 className="ld-section-title">{ld.chooseLevelTitle}</h2>
          <div className="ld-grade-grid">
            {ld.grades.map((g) => (
              <button
                key={g.key}
                className={`ld-grade-card${selectedGrade === g.key ? ' selected' : ''}`}
                style={{ '--grade-color': g.color }}
                onClick={() => setSelectedGrade(g.key)}
                aria-pressed={selectedGrade === g.key}
              >
                <span className="ld-grade-icon">{g.icon}</span>
                <span className="ld-grade-label">{g.label}</span>
                <span className="ld-grade-sublabel">{g.sublabel}</span>
                {selectedGrade === g.key && (
                  <span className="ld-grade-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Language selection */}
        <section className="ld-section" aria-label="Language selection">
          <h3 className="ld-lang-label">{ld.langLabel}</h3>
          <div className="ld-lang-grid">
            <button
              className={`ld-lang-btn${selectedLang === 'id' ? ' selected' : ''}`}
              onClick={() => setSelectedLang('id')}
              aria-pressed={selectedLang === 'id'}
            >
              🇮🇩 Bahasa Indonesia
            </button>
            <button
              className={`ld-lang-btn${selectedLang === 'en' ? ' selected' : ''}`}
              onClick={() => setSelectedLang('en')}
              aria-pressed={selectedLang === 'en'}
            >
              🇬🇧 English
            </button>
          </div>
        </section>

        {/* Two-path selection */}
        <section className="ld-paths" aria-label="Choose learning path">
          {/* Learn path */}
          <div className="ld-path-card ld-path-card--learn">
            <div className="ld-path-icon">{ld.pathLearn.icon}</div>
            <h3 className="ld-path-title">{ld.pathLearn.title}</h3>
            <p className="ld-path-desc">{ld.pathLearn.desc}</p>
            <button
              className="btn btn-primary ld-path-btn"
              onClick={() => handleStart('learn')}
            >
              {ld.pathLearn.btn}
            </button>
          </div>

          {/* Game path */}
          <div className="ld-path-card ld-path-card--game">
            <div className="ld-path-icon">{ld.pathGame.icon}</div>
            <h3 className="ld-path-title">{ld.pathGame.title}</h3>
            <p className="ld-path-desc">{ld.pathGame.desc}</p>
            <button
              className="btn btn-coral ld-path-btn"
              onClick={() => handleStart('game')}
            >
              {ld.pathGame.btn}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LessonDetailPage;

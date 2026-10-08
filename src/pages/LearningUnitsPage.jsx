import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import HeroStarfield from '../components/Hero/HeroStarfield';
import { getLearningUnits } from '../lessons';
import { getProgress } from '../data/progress';
import './LearningUnitsPage.css';

const SUBTOPIC_STYLE = {
  'logic-g12-urutan': { icon: '📋', color: 'var(--blossom)', difficulty: 'easy' },
  'logic-g12-pola': { icon: '🧩', color: 'var(--summer-sky)', difficulty: 'easy' },
  'logic-g12-arah': { icon: '🧭', color: 'var(--sour-apple)', difficulty: 'medium' },
  'logic-g12-perulangan': { icon: '🔁', color: 'var(--sour-apple)', difficulty: 'medium' },
  'logic-g12-debugging': { icon: '🔍', color: '#FFC9B8', difficulty: 'medium' },
  'basic-g12-apa-itu-coding': { icon: '💻', color: 'var(--blossom)', difficulty: 'easy' },
  'basic-g12-blok-perintah': { icon: '🧩', color: 'var(--summer-sky)', difficulty: 'easy' },
  'basic-g12-menjalankan-program': { icon: '▶️', color: 'var(--sour-apple)', difficulty: 'easy' },
  'basic-g12-gerakkan-karakter': { icon: '🤖', color: 'var(--summer-sky)', difficulty: 'medium' },
  'basic-g12-ulangi-blok': { icon: '🔁', color: 'var(--blossom)', difficulty: 'medium' },
  'creative-g12-warnai-panggung': { icon: '🎭', color: 'var(--blossom)', difficulty: 'easy' },
  'creative-g12-menggambar-kode': { icon: '✏️', color: 'var(--summer-sky)', difficulty: 'easy' },
  'creative-g12-animasi': { icon: '🎞️', color: 'var(--sour-apple)', difficulty: 'medium' },
  'creative-g12-bunyi-musik': { icon: '🎵', color: 'var(--summer-sky)', difficulty: 'easy' },
  'creative-g12-cerita-interaktif': { icon: '📖', color: 'var(--blossom)', difficulty: 'medium' },
};

function LearningUnitsPage({ t, lang }) {
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const grade = searchParams.get('grade') || getProgress().grade || '1-2';
  const units = getLearningUnits(lessonId, grade);
  const savedStars = getProgress().lessonStars;
  const gradeLabel = t.lessonDetail.grades.find((item) => item.key === grade)?.label || t.learning.gradeLabel(grade);
  const backLabel = lang === 'en' ? 'Back' : 'Kembali';
  const stepLabel = lang === 'en' ? '6 steps · 10 min' : '6 tahap · 10 menit';
  const difficultyLabels = lang === 'en'
    ? { easy: 'Easy', medium: 'Medium' }
    : { easy: 'Mudah', medium: 'Sedang' };

  return (
    <main id="main-content" className="learning-units-page">
      <HeroStarfield className="learning-units-starfield" />
      <div className="learning-units-shell">
        <Link
          className="learning-units-back"
          to={`/lessons/${lessonId}?grade=${encodeURIComponent(grade)}&lang=${encodeURIComponent(lang)}`}
          aria-label={backLabel}
        >
          ← {backLabel}
        </Link>
        {units.length > 0 ? (
          <section className="learning-units-grid" aria-label={lang === 'en' ? 'Lesson topics' : 'Daftar subtema'}>
            {units.map((unit, index) => {
              const style = SUBTOPIC_STYLE[unit.id] || { icon: '📚', color: 'var(--summer-sky)', difficulty: 'easy' };
              const starCount = Math.max(0, Math.min(3, Number(savedStars[unit.id]) || 0));
              const unitTitle = unit.title[lang] || unit.title.id;
              const params = new URLSearchParams({ grade, lang, unit: unit.id });
              return (
                <button
                  type="button"
                  key={unit.id}
                  className="learning-unit-card"
                  style={{ '--unit-color': style.color }}
                  onClick={() => navigate(`/lessons/${lessonId}/learn?${params.toString()}`)}
                  aria-label={`${index + 1}. ${unitTitle}, ${difficultyLabels[style.difficulty]}, ${starCount} ${lang === 'en' ? 'of 3 stars' : 'dari 3 bintang'}`}
                >
                  <span className="learning-unit-icon" aria-hidden="true">{style.icon}</span>
                  <span className="learning-unit-copy">
                    <span className="learning-unit-tags">
                      <span>{gradeLabel}</span>
                      <span className={style.difficulty}>{difficultyLabels[style.difficulty]}</span>
                    </span>
                    <span className="learning-unit-title">{index + 1}. {unitTitle}</span>
                    <span className="learning-unit-meta">{stepLabel}</span>
                    <span className="learning-unit-stars" aria-label={`${starCount} ${lang === 'en' ? 'of 3 stars' : 'dari 3 bintang'}`}>
                      {[0, 1, 2].map((star) => (
                        <svg key={star} className={star < starCount ? '' : 'is-off'} viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
                        </svg>
                      ))}
                    </span>
                  </span>
                  <span className="learning-unit-go" aria-hidden="true">→</span>
                </button>
              );
            })}
          </section>
        ) : (
          <section className="learning-units-empty" role="status">
            <span aria-hidden="true">🪄</span>
            <h2>{lang === 'en' ? 'Lessons coming soon!' : 'Subtema segera hadir!'}</h2>
            <p>{lang === 'en' ? 'We are preparing these learning topics.' : 'Kami sedang menyiapkan subtema belajar ini.'}</p>
          </section>
        )}
      </div>
    </main>
  );
}

export default LearningUnitsPage;

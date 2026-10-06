import { Link, useParams, useSearchParams } from 'react-router-dom';
import './LearningPage.css';

function LearningPage({ t }) {
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const grade = searchParams.get('grade') || '1-2';
  const lang = searchParams.get('lang') || 'id';

  return (
    <main id="main-content" className="learning-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">
            {t.lessonDetail?.breadcrumbHome || 'Home'}
          </Link>
          <span> → </span>
          <Link to="/lessons">
            {t.lessonDetail?.breadcrumbLessons || 'Lessons'}
          </Link>
          <span> → </span>
          <Link to={`/lessons/${lessonId}`}>{lessonId}</Link>
          <span> → </span>
          <span>Learn</span>
        </nav>

        <div className="learning-coming-soon card">
          <div className="lcs-emoji">📚</div>
          <h1 className="lcs-title">
            {lang === 'en' ? 'Learning Mode' : 'Mode Belajar'}
          </h1>
          <p className="lcs-desc">
            {lang === 'en'
              ? `Grade ${grade} learning content for "${lessonId}" is coming in the next phase!`
              : `Konten belajar Kelas ${grade} untuk "${lessonId}" akan hadir di fase berikutnya!`}
          </p>
          <div className="lcs-meta">
            <span className="lcs-badge">📖 {lang === 'en' ? 'Grade' : 'Kelas'} {grade}</span>
            <span className="lcs-badge">🌏 {lang === 'id' ? 'Bahasa Indonesia' : 'English'}</span>
          </div>
          <Link to={`/lessons/${lessonId}`} className="btn btn-primary">
            ← {lang === 'en' ? 'Back to Lesson' : 'Kembali ke Pelajaran'}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LearningPage;

import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AiTutor from './components/AiTutor/AiTutor';
import i18n from './data/i18n';
import { getProgress, setLanguage as saveLang } from './data/progress';
import './styles/global.css';

// Route-level code splitting
const HomePage        = lazy(() => import('./pages/HomePage'));
const LessonsPage     = lazy(() => import('./pages/LessonsPage'));
const LessonDetailPage= lazy(() => import('./pages/LessonDetailPage'));
const LearningPage    = lazy(() => import('./pages/LearningPage'));
const GamesPage       = lazy(() => import('./pages/GamesPage'));
const AboutPage       = lazy(() => import('./pages/AboutPage'));
const NotFoundPage    = lazy(() => import('./pages/NotFoundPage'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Loading spinner
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 800,
        color: 'var(--blossom)',
      }}
    >
      <span style={{ fontSize: '3rem', animation: 'spin 1s linear infinite' }}>⚙️</span>
      <span>Loading...</span>
    </div>
  );
}

function AppInner() {
  const progress = getProgress();
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLang] = useState(() => {
    const routeLanguage = new URLSearchParams(window.location.search).get('lang');
    return routeLanguage === 'en' || routeLanguage === 'id'
      ? routeLanguage
      : progress.language || 'id';
  });

  const t = i18n[lang] || i18n.id;

  const handleLangChange = (newLang) => {
    setLang(newLang);
    saveLang(newLang);
    if (location.pathname.endsWith('/learn') || location.pathname.endsWith('/game')) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('lang', newLang);
      navigate(
        { pathname: location.pathname, search: `?${searchParams.toString()}`, hash: location.hash },
        { replace: true },
      );
    }
  };

  return (
    <>
      {/* Skip to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <ScrollToTop />

      <Navbar t={t} lang={lang} onLangChange={handleLangChange} />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                            element={<HomePage t={t} />} />
          <Route path="/lessons"                     element={<LessonsPage t={t} />} />
          <Route path="/lessons/:lessonId"           element={<LessonDetailPage t={t} lang={lang} onLangChange={handleLangChange} />} />
          <Route path="/lessons/:lessonId/learn"     element={<LearningPage t={t} lang={lang} />} />
          <Route path="/lessons/:lessonId/game"      element={<LearningPage t={t} lang={lang} isGame />} />
          <Route path="/games"                       element={<GamesPage t={t} />} />
          <Route path="/games/:gameId"               element={<GamesPage t={t} />} />
          <Route path="/about"                       element={<AboutPage t={t} />} />
          <Route path="*"                            element={<NotFoundPage t={t} />} />
        </Routes>
      </Suspense>

      <Footer t={t} lang={lang} onLangChange={handleLangChange} />

      {/* Global floating AI Tutor */}
      <AiTutor t={t} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
import { useState, useLayoutEffect, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import i18n from './data/i18n';
import { getProgress, setLanguage as saveLang } from './data/progress';
import './styles/global.css';

// Lazy-load AiTutor — it's a floating panel not needed for initial render
const AiTutor = lazy(() => import('./components/AiTutor/AiTutor'));

// Route-level code splitting
const HomePage         = lazy(() => import('./pages/HomePage'));
const LessonsPage      = lazy(() => import('./pages/LessonsPage'));
const LessonDetailPage = lazy(() => import('./pages/LessonDetailPage'));
const LearningUnitsPage = lazy(() => import('./pages/LearningUnitsPage'));
const LearningPage     = lazy(() => import('./pages/LearningPage'));
const GamesPage        = lazy(() => import('./pages/GamesPage'));
const AboutPage        = lazy(() => import('./pages/AboutPage'));
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage'));

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  useLayoutEffect(() => {
    if (!location.hash) {
      const scrollBehavior = location.state?.scrollBehavior === 'instant'
        ? 'instant'
        : navigationType === 'POP' ? 'instant' : 'smooth';
      window.scrollTo({ top: 0, behavior: scrollBehavior });
    }
  }, [location.key, location.hash, location.state?.scrollBehavior, navigationType]);
  return null;
}

// Loading spinner for route transitions
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
  const navigationType = useNavigationType();
  const isFocusedActivity = location.pathname.endsWith('/learn')
    || /^\/games\/[^/]+$/.test(location.pathname);

  // Track back-navigation with a ref to avoid setState-during-render anti-pattern.
  // navEntryRef holds the previous {key, type}; isBackNavigation state is updated
  // in a useEffect (after commit) rather than during render.
  const navEntryRef = useRef({ key: location.key, type: null });
  const [isBackNavigation, setIsBackNavigation] = useState(false);

  useEffect(() => {
    const prev = navEntryRef.current;
    if (prev.key !== location.key) {
      navEntryRef.current = { key: location.key, type: navigationType };
      setIsBackNavigation(navigationType === 'POP');
    }
  }, [location.key, navigationType]);

  const [selectedLang, setSelectedLang] = useState(() => progress.language || 'id');
  const routeLanguage = new URLSearchParams(location.search).get('lang');
  const lang = routeLanguage === 'en' || routeLanguage === 'id'
    ? routeLanguage
    : selectedLang;

  const t = i18n[lang] || i18n.id;
  const routeParams = new URLSearchParams(location.search);
  const learningSessionKey = [
    routeParams.get('grade') || '',
    routeParams.get('unit') || '',
  ].join('|');

  const handleLangChange = (newLang) => {
    setSelectedLang(newLang);
    saveLang(newLang);
    if (
      location.pathname.endsWith('/learn')
      || location.pathname.endsWith('/game')
      || location.pathname.startsWith('/games/')
    ) {
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
          <Route path="/lessons/:lessonId"           element={<LessonDetailPage t={t} lang={lang} onLangChange={handleLangChange} isBackNavigation={isBackNavigation} />} />
          <Route path="/lessons/:lessonId/units"     element={<LearningUnitsPage t={t} lang={lang} />} />
          <Route path="/lessons/:lessonId/learn"     element={<LearningPage key={learningSessionKey} t={t} lang={lang} />} />
          <Route path="/lessons/:lessonId/game"      element={<GamesPage t={t} />} />
          <Route path="/games"                       element={<GamesPage t={t} />} />
          <Route path="/games/:gameId"               element={<GamesPage t={t} />} />
          <Route path="/about"                       element={<AboutPage t={t} />} />
          <Route path="*"                            element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {(!isFocusedActivity || location.pathname === '/about') && (
        <Footer t={t} lang={lang} onLangChange={handleLangChange} />
      )}

      {/* Global floating AI Tutor — lazy-loaded after main page is interactive */}
      <Suspense fallback={null}>
        <AiTutor t={t} lang={lang} compact={isFocusedActivity} />
      </Suspense>
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
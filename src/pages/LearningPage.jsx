import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getLearningUnit } from '../lessons';
import {
  ActivityStep,
  ExampleStep,
  FeedbackStep,
  MaterialStep,
  ProgressBar,
  QuizStep,
  RewardStep,
} from '../lessons/LearningSteps';
import { completeUnit, getProgress, rewardCorrectAnswer } from '../data/progress';
import './LearningPage.css';

const STEPS = ['material', 'example', 'activity', 'quiz', 'feedback', 'reward'];

function LearningPage({ t, lang, isGame = false }) {
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const grade = searchParams.get('grade') || getProgress().grade || '1-2';
  const unitId = searchParams.get('unit');
  const learning = t.learning;
  const unit = isGame ? null : getLearningUnit(lessonId, grade, unitId);
  const stepParam = searchParams.get('step');
  const parsedStep = Number(stepParam || 0);
  const currentStep = Number.isInteger(parsedStep) && parsedStep >= 0 && parsedStep < STEPS.length ? parsedStep : 0;
  const [progress, setProgress] = useState(getProgress);
  const [earnedQuestionIds, setEarnedQuestionIds] = useState([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);
  const [saveFailed, setSaveFailed] = useState(false);

  const stepLabels = STEPS.map((id, index) => ({ id, label: learning.steps[index] }));
  const badge = unit ? t.badges.find((item) => item.id === unit.badgeId) : null;

  function updateStep(nextStep) {
    const params = new URLSearchParams(searchParams);
    params.set('step', String(nextStep));
    params.set('grade', grade);
    params.set('lang', lang);
    navigate({ pathname: `/lessons/${lessonId}/learn`, search: `?${params.toString()}` });
  }

  function goToStep(nextStep) {
    if (nextStep < 0 || nextStep >= STEPS.length) return;
    updateStep(nextStep);
  }

  function handleCorrect(questionId) {
    if (earnedQuestionIds.includes(questionId)) return;
    const result = rewardCorrectAnswer();
    setProgress(result.progress);
    setSaveFailed((failed) => failed || !result.saved);
    setEarnedQuestionIds((ids) => [...ids, questionId]);
    setXpEarned((total) => total + 10);
    setStarsEarned((total) => total + 1);
  }

  function finishQuiz() {
    const totalStars = 1 + earnedQuestionIds.length;
    const result = completeUnit(unit.id, unit.badgeId, totalStars);
    setProgress(result.progress);
    setSaveFailed((failed) => failed || !result.saved);
    setStarsEarned(totalStars);
    goToStep(4);
  }

  function resetUnit() {
    setEarnedQuestionIds([]);
    setXpEarned(0);
    setStarsEarned(0);
    setSaveFailed(false);
    const params = new URLSearchParams({ grade, lang });
    if (unit) params.set('unit', unit.id);
    navigate({ pathname: `/lessons/${lessonId}/learn`, search: `?${params.toString()}` }, { replace: true });
  }

  return (
    <main id="main-content" className="learning-page">
      <div className="learning-shell">
        <Link
          to={`/lessons/${lessonId}/units?grade=${encodeURIComponent(grade)}&lang=${encodeURIComponent(lang)}`}
          className="learning-back-btn"
          aria-label={lang === 'en' ? 'Back to topics' : 'Kembali ke subtema'}
        >
          {lang === 'en' ? '← Back to topics' : '← Kembali ke subtema'}
        </Link>
        <header className="learning-header">
          <div className="learning-header-title">
            <span className="learning-header-icon" aria-hidden="true">📚</span>
            <div>
              <p>{learning.modeLabel}</p>
              {unit && <h1>{unit.title[lang] || unit.title.id}</h1>}
            </div>
          </div>
          <div className="learning-header-meta">
            <span className="learning-grade-chip">{learning.gradeLabel(grade)}</span>
            <span className="learning-score-chip" aria-label={`${learning.xpLabel}: ${progress.xp}`}>
              ⚡ {progress.xp} {learning.xpLabel}
            </span>
            <span className="learning-score-chip" aria-label={`${learning.starsLabel}: ${progress.stars}`}>
              ⭐ {progress.stars}
            </span>
          </div>
        </header>

        {unit ? (
          <>
            <ProgressBar
              steps={stepLabels}
              currentStep={currentStep}
              label={learning.progressLabel}
              onStepChange={goToStep}
            />
            {saveFailed && <p className="learning-save-warning" role="status">{learning.saveWarning}</p>}
            <div className="learning-stage" key={`${unit.id}-${STEPS[currentStep]}`}>
              {currentStep === 0 && (
                <MaterialStep unit={unit} lang={lang} />
              )}
              {currentStep === 1 && (
                <ExampleStep unit={unit} lang={lang} title={learning.steps[1]} />
              )}
              {currentStep === 2 && (
                <ActivityStep
                  activity={unit.activity}
                  lang={lang}
                  labels={learning}
                  onContinue={() => goToStep(3)}
                />
              )}
              {currentStep === 3 && (
                <QuizStep
                  questions={unit.questions}
                  lang={lang}
                  labels={learning}
                  onCorrect={handleCorrect}
                  onComplete={finishQuiz}
                />
              )}
              {currentStep === 4 && (
                <FeedbackStep
                  labels={learning}
                  correctCount={earnedQuestionIds.length}
                  questionCount={unit.questions.length}
                  onContinue={() => goToStep(5)}
                />
              )}
              {currentStep === 5 && (
                <RewardStep
                  labels={learning}
                  xpEarned={xpEarned}
                  starsEarned={starsEarned}
                  badgeName={badge?.name || learning.badgeName}
                  onNext={() => navigate('/lessons')}
                  onRetry={resetUnit}
                  onBack={() => navigate(`/lessons/${lessonId}`)}
                />
              )}
            </div>
            <div className="learning-step-footer">
              <button className="btn btn-secondary" type="button" disabled={currentStep === 0} onClick={() => goToStep(currentStep - 1)} aria-label="Sebelumnya">
                ← Sebelumnya
              </button>
              <button className="btn btn-primary" type="button" disabled={currentStep === STEPS.length - 1} onClick={() => goToStep(currentStep + 1)} aria-label="Lanjut">
                Lanjut →
              </button>
            </div>
          </>
        ) : (
          <section className="learning-card learning-coming-soon" aria-labelledby="learning-coming-title">
            <div className="learning-coming-illustration" aria-hidden="true">{isGame ? '🎮' : '🪄'}</div>
            <h1 id="learning-coming-title" className="learning-step-title">
              {isGame ? learning.gameComingTitle : learning.comingTitle}
            </h1>
            <p>{isGame ? learning.gameComingBody : learning.comingBody}</p>
            <div className="learning-coming-meta">
              <span className="learning-grade-chip">{learning.gradeLabel(grade)}</span>
              <span className="learning-grade-chip">{lang === 'id' ? learning.languageName : learning.alternateLanguageName}</span>
            </div>
            <Link to="/lessons" className="btn btn-primary">{learning.chooseLesson}</Link>
          </section>
        )}
      </div>
    </main>
  );
}

export default LearningPage;

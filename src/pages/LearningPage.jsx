import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getLearningUnit } from '../lessons';
import iosLightning from '../assets/IOS Petir.webp';
import iosStar from '../assets/IOS Star.webp';
import PastelBackdrop from '../components/PastelBackdrop';
import {
  ActivityStep,
  FeedbackStep,
  LessonIntroStep,
  ProgressBar,
  QuizStep,
  RewardStep,
} from '../lessons/LearningSteps';
import { completeUnit, getProgress, rewardCorrectAnswer } from '../data/progress';
import './LearningPage.css';

const STEPS = ['intro', 'activity', 'quiz', 'feedback', 'reward'];

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
  const backTarget = currentStep > 0
    ? {
        pathname: `/lessons/${lessonId}/learn`,
        search: `?${new URLSearchParams({
          ...Object.fromEntries(searchParams),
          step: String(currentStep - 1),
        }).toString()}`,
      }
    : `/lessons/${lessonId}/units?grade=${encodeURIComponent(grade)}&lang=${encodeURIComponent(lang)}`;
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
    if (nextStep < 0 || nextStep >= STEPS.length || nextStep > currentStep + 1) return;
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
    goToStep(3);
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
      <PastelBackdrop />
      <div className="learning-shell">
        <div className="learning-topbar">
          <Link
            to={backTarget}
            className="learning-back-btn"
            aria-label={learning.back}
          >
            ← {learning.back}
          </Link>
          <div className="learning-header-meta">
            <span className="learning-grade-chip">{learning.gradeLabel(grade)}</span>
            <span className="learning-score-chip" aria-label={`${learning.xpLabel}: ${progress.xp}`}>
              <img className="learning-score-icon" src={iosLightning} alt="" aria-hidden="true" />
              {progress.xp} {learning.xpLabel}
            </span>
            <span className="learning-score-chip" aria-label={`${learning.starsLabel}: ${progress.stars}`}>
              <img className="learning-score-icon" src={iosStar} alt="" aria-hidden="true" />
              {progress.stars}
            </span>
          </div>
        </div>

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
                <LessonIntroStep unit={unit} lang={lang} labels={learning} goToStep={goToStep} />
              )}
              {currentStep === 1 && (
                <ActivityStep
                  activity={unit.activity}
                  lang={lang}
                  labels={learning}
                  onContinue={() => goToStep(2)}
                />
              )}
              {currentStep === 2 && (
                <QuizStep
                  questions={unit.questions}
                  lang={lang}
                  labels={learning}
                  onCorrect={handleCorrect}
                  onComplete={finishQuiz}
                />
              )}
              {currentStep === 3 && (
                <FeedbackStep
                  labels={learning}
                  correctCount={earnedQuestionIds.length}
                  questionCount={unit.questions.length}
                  onContinue={() => goToStep(4)}
                />
              )}
              {currentStep === 4 && (
                <RewardStep
                  labels={learning}
                  xpEarned={xpEarned}
                  starsEarned={starsEarned}
                  badgeName={badge?.name || learning.badgeName}
                  onNext={() => navigate(
                    `/lessons/${lessonId}/units?grade=${encodeURIComponent(grade)}&lang=${encodeURIComponent(lang)}`,
                  )}
                  onRetry={resetUnit}
                />
              )}
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

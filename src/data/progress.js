// Progress data stored in localStorage
const STORAGE_KEY = 'cfk_progress';

const defaults = {
  xp: 0,
  stars: 0,
  badges: [],
  completedLessons: [],
  completedUnits: [],
  completedGames: [],
  highScores: {},
  grade: null,
  language: 'id',
};

export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const stored = parsed && typeof parsed === 'object' ? parsed : {};
    return {
      ...defaults,
      ...stored,
      xp: Number.isFinite(stored.xp) && stored.xp >= 0 ? stored.xp : defaults.xp,
      stars: Number.isFinite(stored.stars) && stored.stars >= 0 ? stored.stars : defaults.stars,
      badges: Array.isArray(stored.badges) ? stored.badges : [],
      completedUnits: Array.isArray(stored.completedUnits) ? stored.completedUnits : [],
      language: stored.language === 'en' ? 'en' : 'id',
    };
  } catch (error) {
    console.error('Unable to read learning progress from localStorage.', error);
    return { ...defaults };
  }
}

export function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    console.error('Unable to save learning progress to localStorage.');
    return false;
  }
}

export function addXP(amount) {
  const p = getProgress();
  p.xp += amount;
  saveProgress(p);
  return p;
}

export function addStar() {
  const p = getProgress();
  p.stars += 1;
  saveProgress(p);
  return p;
}

export function rewardCorrectAnswer() {
  const progress = getProgress();
  progress.xp += 10;
  progress.stars += 1;
  const saved = saveProgress(progress);
  return { progress, saved };
}

export function awardBadge(badgeId) {
  const p = getProgress();
  if (!p.badges.includes(badgeId)) {
    p.badges.push(badgeId);
    saveProgress(p);
  }
  return p;
}

export function setGrade(grade) {
  const p = getProgress();
  p.grade = grade;
  saveProgress(p);
  return p;
}

export function setLanguage(lang) {
  const p = getProgress();
  p.language = lang;
  saveProgress(p);
  return p;
}

export function completeLesson(lessonId) {
  const p = getProgress();
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId);
  }
  saveProgress(p);
  return p;
}

export function completeUnit(unitId, badgeId) {
  const progress = getProgress();
  if (!progress.completedUnits.includes(unitId)) {
    progress.completedUnits.push(unitId);
  }
  if (badgeId && !progress.badges.includes(badgeId)) {
    progress.badges.push(badgeId);
  }
  const saved = saveProgress(progress);
  return { progress, saved };
}

export function setHighScore(gameId, score) {
  const p = getProgress();
  p.highScores[gameId] = Math.max(p.highScores[gameId] || 0, score);
  saveProgress(p);
  return p;
}

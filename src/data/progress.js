// Progress data stored in localStorage
const STORAGE_KEY = 'cfk_progress';

const defaults = {
  xp: 0,
  stars: 0,
  badges: [],
  completedLessons: [],
  completedGames: [],
  highScores: {},
  grade: null,
  language: 'id',
};

export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

export function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // silently fail if localStorage unavailable
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

export function setHighScore(gameId, score) {
  const p = getProgress();
  p.highScores[gameId] = Math.max(p.highScores[gameId] || 0, score);
  saveProgress(p);
  return p;
}

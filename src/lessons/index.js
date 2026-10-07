import patternUnit from './pattern-unit';

const learningUnits = [patternUnit];

export function getLearningUnit(lessonId, grade) {
  return learningUnits.find((unit) => unit.lessonId === lessonId && unit.grade === grade) || null;
}

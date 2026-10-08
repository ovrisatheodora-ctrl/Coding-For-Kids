import learningUnits from './lesson-units';

export function getLearningUnit(lessonId, grade, unitId) {
  return learningUnits.find((unit) => (
    unit.lessonId === lessonId
    && unit.grade === grade
    && (!unitId || unit.id === unitId)
  )) || null;
}

export function getLearningUnits(lessonId, grade) {
  return learningUnits.filter((unit) => (
    unit.lessonId === lessonId
    && unit.grade === grade
    && unit.showInCatalog !== false
  ));
}

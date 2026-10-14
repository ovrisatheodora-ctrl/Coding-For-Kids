import { useEffect, useState } from 'react';
import iosBook from '../assets/IOS BOOK.webp';
import iosEyes from '../assets/IOS Eyes.webp';
import iosLamp from '../assets/IOS Lamp.webp';
import iosLightning from '../assets/IOS Petir.webp';
import iosStar from '../assets/IOS Star.webp';
import iosChampion from '../assets/IOS Champion.webp';
import iosBadgeChampion from '../assets/IOS Badge Champion.webp';
import iosRobot from '../assets/IOS Robot.webp';
import iosPuzzle from '../assets/IOS Puzzle.webp';
import iosGame from '../assets/IOS Game.webp';
import iosPhone from '../assets/IOS Phone.webp';
import iosWriting from '../assets/IOS Writting.webp';
import iosWorld from '../assets/IOS World.webp';
import iosSparkle from '../assets/IOS Sprikle.webp';
import ArrowLabel from '../components/ArrowLabel';
import Feedback from '../components/Feedback';
import { iosCreativeVisualKey } from './creative-coding-enhancements';

function localized(value, lang) {
  if (typeof value === 'string') return value;
  return value?.[lang] || value?.id || '';
}

function activityOptionLabel(option, lang) {
  return typeof option === 'string' ? option : localized(option?.text || option, lang);
}

function activityOptionValue(option, lang) {
  return typeof option === 'string' ? option : option?.id || localized(option?.text || option, lang);
}

function feedbackText(value) {
  return (value || '')
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\p{Emoji_Modifier}/gu, '')
    .replace(/\uFE0F/gu, '')
    .replace(/\u200D/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function activityHint(value, lang, fallback) {
  const hint = feedbackText(localized(value, lang));
  return hint && !/^(hampir|almost|belum tepat|not quite)/i.test(hint) ? hint : fallback;
}

function speakText(text, lang) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
  window.speechSynthesis.speak(utterance);
}

function shuffledEntries(items) {
  const shuffled = items.map((item, originalIndex) => ({ item, originalIndex }));
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  if (shuffled.length > 1 && shuffled.every((entry, index) => entry.originalIndex === index)) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

function shuffledOrder(items, correctOrder) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (shuffled.length > 1 && shuffled.every((item, index) => item === correctOrder[index])) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

const GRID_DIRECTIONS = {
  up: { row: -1, column: 0, symbol: '⬆️' },
  down: { row: 1, column: 0, symbol: '⬇️' },
  left: { row: 0, column: -1, symbol: '⬅️' },
  right: { row: 0, column: 1, symbol: '➡️' },
};

const IOS_VISUALS = {
  robot: iosRobot,
  puzzle: iosPuzzle,
  game: iosGame,
  lamp: iosLamp,
  phone: iosPhone,
  writing: iosWriting,
  eyes: iosEyes,
  world: iosWorld,
  sparkle: iosSparkle,
};

function traceGridPath(activity, path) {
  let [row, column] = activity.start;
  const positions = [[row, column]];
  let blocked = false;
  path.forEach((direction) => {
    const move = GRID_DIRECTIONS[direction];
    row += move.row;
    column += move.column;
    const outsideGrid = row < 0 || column < 0 || row >= activity.grid || column >= activity.grid;
    const onRock = activity.rocks.some(([rockRow, rockColumn]) => rockRow === row && rockColumn === column);
    if (outsideGrid || onRock) blocked = true;
    positions.push([row, column]);
  });
  return { row, column, positions, blocked };
}

function DirectionGrid({ activity, path, labels, className = '' }) {
  const trace = traceGridPath(activity, path);
  const [targetRow, targetColumn] = activity.target;
  const [robotRow, robotColumn] = activity.start;
  const cells = [];
  for (let row = 0; row < activity.grid; row += 1) {
    for (let column = 0; column < activity.grid; column += 1) {
      const pathStep = trace.positions.findIndex(([pathRow, pathColumn], index) =>
        index > 0 && pathRow === row && pathColumn === column);
      const isRobot = row === trace.row && column === trace.column && !trace.blocked;
      const isStart = row === robotRow && column === robotColumn;
      const isTarget = row === targetRow && column === targetColumn;
      const isRock = activity.rocks.some(([rockRow, rockColumn]) => rockRow === row && rockColumn === column);
      cells.push(
        <span
          className={`learning-grid-path-cell${pathStep >= 0 ? ' is-on-path' : ''}`}
          key={`${row}-${column}`}
          aria-label={`${row + 1}, ${column + 1}`}
        >
          {isRock ? '🪨' : isRobot ? '🤖' : isTarget ? '⭐' : pathStep >= 0 ? GRID_DIRECTIONS[path[pathStep - 1]]?.symbol : isStart ? '🤖' : ''}
        </span>,
      );
    }
  }
  return (
    <div
      className={`learning-direction-grid${className ? ` ${className}` : ''}${trace.blocked ? ' has-blocked-path' : ''}`}
      style={{ '--grid-size': activity.grid }}
      role="img"
      aria-label={`${labels.robotAt} ${robotRow + 1}, ${robotColumn + 1}. ${labels.starAt} ${targetRow + 1}, ${targetColumn + 1}.`}
    >
      {cells}
    </div>
  );
}

function DirectionPathActivity({ activity, lang, labels, onContinue, taskPosition }) {
  const [path, setPath] = useState([]);
  const [wrongTries, setWrongTries] = useState(0);
  const [result, setResult] = useState('');
  const trace = traceGridPath(activity, path);
  const isCorrect = result === 'correct';
  const title = localized(activity.title, lang);

  function addDirection(direction) {
    if (isCorrect || path.length >= activity.maxSteps) return;
    setPath((current) => [...current, direction]);
    setResult('');
  }

  function checkPath() {
    if (path.length === 0) return;
    const reachedTarget = trace.row === activity.target[0] && trace.column === activity.target[1];
    const correct = !trace.blocked && reachedTarget;
    setResult(correct ? 'correct' : 'wrong');
    if (correct) return;
    setWrongTries((tries) => tries + 1);
  }

  return (
    <section className="learning-card learning-activity-card" aria-labelledby="learning-step-title">
      <div className="learning-step-kicker" aria-hidden="true">🧩</div>
      {taskPosition && <p className="learning-activity-count">{labels.activityTaskCount(...taskPosition)}</p>}
      <div className="learning-prompt-heading">
        <h1 id="learning-step-title" className="learning-step-title">{title}</h1>
        <button className="learning-speak-button" type="button" onClick={() => speakText(title, lang)} aria-label={labels.readAloud} title={labels.readAloud}>
          <span aria-hidden="true">🔊</span>
        </button>
      </div>
      <DirectionGrid activity={activity} path={path} labels={labels} />
      <p className="learning-direction-step-count">{labels.directionStepCount(path.length, activity.maxSteps)}</p>
      <div className="learning-direction-controls" aria-label={labels.directionControls}>
        {Object.entries(GRID_DIRECTIONS).map(([direction, move]) => (
          <button
            className="learning-direction-button"
            type="button"
            key={direction}
            onClick={() => addDirection(direction)}
            disabled={isCorrect || path.length >= activity.maxSteps}
            aria-label={labels.directionNames[direction]}
          >
            {move.symbol}
          </button>
        ))}
        <button
          className="learning-direction-button learning-direction-button--undo"
          type="button"
          onClick={() => {
            setPath((current) => current.slice(0, -1));
            setResult('');
          }}
          disabled={isCorrect || path.length === 0}
          aria-label={labels.undoDirection}
        >
          ↩️
        </button>
      </div>
      <div className="learning-direction-path" aria-live="polite">
        {path.map((direction, index) => <span key={`${direction}-${index}`}>{GRID_DIRECTIONS[direction].symbol}</span>)}
      </div>
      <Feedback
        key={`path-${result}-${wrongTries}`}
        tipe={result ? (isCorrect ? 'benar' : 'salah') : undefined}
        pesan={isCorrect ? labels.feedbackCorrect : labels.feedbackWrong}
        petunjuk={result === 'wrong' && wrongTries >= 2
          ? localized(activity.firstStepHint, lang) || labels.directionFirstStep(activity.solution[0] && labels.directionNames[activity.solution[0]])
          : undefined}
        labelPetunjuk={labels.feedbackHintButton}
      />
      {isCorrect ? (
        <button className="btn btn-primary learning-activity-action learning-activity-continue" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
      ) : (
        <button className="btn btn-primary learning-activity-action" type="button" onClick={checkPath} disabled={path.length === 0}>
          {labels.check}
        </button>
      )}
    </section>
  );
}

function LoopActivity({ activity, lang, labels, onContinue, taskPosition }) {
  const options = Array.isArray(activity.options) ? activity.options : [];
  const [shuffledOptions] = useState(() => activity.shuffleOptions ? shuffledEntries(options) : options.map((item, originalIndex) => ({ item, originalIndex })));
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState('');
  const [wrongTries, setWrongTries] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const totalIterations = activity.iterations || 0;
  const isCorrect = result === 'correct';
  const title = localized(activity.title, lang);

  useEffect(() => {
    if (!isPlaying || totalIterations <= 0) return undefined;

    const timer = window.setTimeout(() => {
      setLoopCount((count) => {
        const nextCount = count + 1;
        if (nextCount >= totalIterations) {
          setIsPlaying(false);
          return totalIterations;
        }
        return nextCount;
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [isPlaying, totalIterations]);

  function checkAnswer() {
    const selected = shuffledOptions[choice];
    const correct = selected && (selected.item.id === activity.answer || selected.originalIndex === activity.answer);
    setResult(correct ? 'correct' : 'wrong');
    if (!correct) setWrongTries((tries) => tries + 1);
  }

  return (
    <section className="learning-card learning-activity-card" aria-labelledby="learning-step-title">
      <div className="learning-step-kicker" aria-hidden="true">🔁</div>
      {taskPosition && <p className="learning-activity-count">{labels.activityTaskCount(...taskPosition)}</p>}
      <div className="learning-prompt-heading">
        <h1 id="learning-step-title" className="learning-step-title">{title}</h1>
        <button className="learning-speak-button" type="button" onClick={() => speakText(`${title} ${localized(activity.code, lang)}`, lang)} aria-label={labels.readAloud} title={labels.readAloud}>
          <span aria-hidden="true">🔊</span>
        </button>
      </div>
      {activity.code && <p className="learning-loop-code">{localized(activity.code, lang)}</p>}
      {totalIterations > 0 && (
        <div className="learning-loop-demo" aria-live="polite">
          <span className={`learning-loop-action${isPlaying ? ' is-looping' : ''}`} key={loopCount}>
            {activity.actionEmoji || '👏'}
          </span>
          <span className="learning-loop-counter">{loopCount > 0 ? loopCount : '🔁'} / {totalIterations}</span>
          <button
            className="learning-speak-button learning-loop-run-button"
            type="button"
            onClick={() => { setLoopCount(0); setIsPlaying(true); }}
            disabled={isPlaying}
          >
            {labels.runLoop}
          </button>
        </div>
      )}
      <div className="learning-choice-grid">
        {shuffledOptions.map(({ item, originalIndex }, index) => (
          <button
            className={`learning-choice${choice === index ? ' is-selected' : ''}`}
            type="button"
            key={item.id || originalIndex}
            onClick={() => { setChoice(index); setResult(''); }}
            aria-pressed={choice === index}
          >
            {activityOptionLabel(item, lang)}
          </button>
        ))}
      </div>
      <Feedback
        key={`loop-${result}-${wrongTries}`}
        tipe={result ? (isCorrect ? 'benar' : 'salah') : undefined}
        pesan={isCorrect ? labels.feedbackCorrect : labels.feedbackWrong}
        petunjuk={result === 'wrong' && wrongTries >= 2 ? activityHint(activity.hint, lang, labels.activityHint) : undefined}
        labelPetunjuk={labels.feedbackHintButton}
      />
      {isCorrect ? (
        <button className="btn btn-primary learning-activity-action learning-activity-continue" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
      ) : (
        <button className="btn btn-primary learning-activity-action" type="button" onClick={checkAnswer} disabled={choice === null}>{labels.check}</button>
      )}
    </section>
  );
}

function MatchingActivity({ activity, lang, labels, onContinue, taskPosition }) {
  const [value, setValue] = useState({});
  const [result, setResult] = useState('');
  const [wrongTries, setWrongTries] = useState(0);
  const [rightOptions] = useState(() => activity.shuffleOptions
    ? shuffledEntries(activity.right).map(({ item }) => item)
    : activity.right);
  const matchingQuestion = { ...activity, right: rightOptions };
  const isCorrect = result === 'correct';
  const title = localized(activity.title, lang);

  function checkAnswer() {
    const correct = matchesAnswer(activity, value);
    setResult(correct ? 'correct' : 'wrong');
    if (!correct) setWrongTries((tries) => tries + 1);
  }

  return (
    <section className="learning-card learning-activity-card" aria-labelledby="learning-step-title">
      <div className="learning-step-kicker" aria-hidden="true">🧩</div>
      {taskPosition && <p className="learning-activity-count">{labels.activityTaskCount(...taskPosition)}</p>}
      <div className="learning-prompt-heading">
        <h1 id="learning-step-title" className="learning-step-title">{title}</h1>
        <button className="learning-speak-button" type="button" onClick={() => speakText(title, lang)} aria-label={labels.readAloud} title={labels.readAloud}>
          <span aria-hidden="true">🔊</span>
        </button>
      </div>
      <QuestionInput
        question={matchingQuestion}
        lang={lang}
        value={value}
        setValue={(nextValue) => {
          setValue(nextValue);
          setResult('');
        }}
        labels={labels}
      />
      <Feedback
        key={`matching-${result}-${wrongTries}`}
        tipe={result ? (isCorrect ? 'benar' : 'salah') : undefined}
        pesan={isCorrect ? labels.feedbackCorrect : labels.feedbackWrong}
        petunjuk={result === 'wrong' && wrongTries >= 2 ? activityHint(activity.hint, lang, labels.activityHint) : undefined}
        labelPetunjuk={labels.feedbackHintButton}
      />
      {isCorrect ? (
        <button className="btn btn-primary learning-activity-action learning-activity-continue" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
      ) : (
        <button className="btn btn-primary learning-activity-action" type="button" onClick={checkAnswer} disabled={Object.keys(value).length !== activity.left.length}>
          {labels.check}
        </button>
      )}
    </section>
  );
}

function FindBugActivity({ activity, lang, labels, onContinue, taskPosition }) {
  const [selectedBug, setSelectedBug] = useState(null);
  const [wrongTries, setWrongTries] = useState(0);
  const [phase, setPhase] = useState('find');
  const [result, setResult] = useState('');
  const [repairChoice, setRepairChoice] = useState(null);
  const repairOptions = activity.repairOptions || [];
  const [shuffledRepairs] = useState(() => activity.shuffleOptions
    ? shuffledEntries(repairOptions)
    : repairOptions.map((item, originalIndex) => ({ item, originalIndex })));
  const isFixed = phase === 'fixed';
  const title = localized(activity.title, lang);

  function selectItem(index) {
    if (phase !== 'find') return;
    if (index === activity.bugIndex) {
      setSelectedBug(index);
      setPhase(repairOptions.length ? 'repair-choice' : 'repair');
      setResult('found');
    } else {
      setWrongTries((tries) => tries + 1);
      setResult('wrong');
    }
  }

  function chooseRepair(entry, index) {
    const correct = entry.item.id === activity.repairAnswer || entry.originalIndex === activity.repairAnswer;
    setRepairChoice(index);
    if (correct) {
      setPhase('repair');
      setResult('found');
      return;
    }
    setWrongTries((tries) => tries + 1);
    setResult('wrong');
  }

  function restartTask() {
    setSelectedBug(null);
    setRepairChoice(null);
    setWrongTries(0);
    setPhase('find');
    setResult('');
  }

  return (
    <section className="learning-card learning-activity-card" aria-labelledby="learning-step-title">
      <div className="learning-step-kicker" aria-hidden="true">🐞</div>
      {taskPosition && <p className="learning-activity-count">{labels.activityTaskCount(...taskPosition)}</p>}
      <div className="learning-prompt-heading">
        <h1 id="learning-step-title" className="learning-step-title">{title}</h1>
        <button className="learning-speak-button" type="button" onClick={() => speakText(title, lang)} aria-label={labels.readAloud} title={labels.readAloud}>
          <span aria-hidden="true">🔊</span>
        </button>
      </div>
      {activity.code && <p className="learning-loop-code">{localized(activity.code, lang)}</p>}
      <p className="learning-bug-instruction">{labels.tapTheBug}</p>
      <div className="learning-bug-sequence" role="group" aria-label={title}>
        {activity.items.map((item, index) => (
          <button
            className={`learning-bug-step${selectedBug === index ? ' is-bug-selected' : ''}${isFixed && selectedBug === index ? ' is-bug-fixed' : ''}`}
            type="button"
            key={item.id}
            onClick={() => phase === 'find' && selectItem(index)}
            disabled={phase !== 'find'}
            aria-pressed={selectedBug === index}
          >
            <span className="learning-bug-step-emoji" aria-hidden="true">
              {isFixed && selectedBug === index ? '✅' : item.emoji}
            </span>
            <span>{localized(item.label, lang)}</span>
            {selectedBug === index && phase === 'repair' && <span className="learning-bug-marker" aria-hidden="true">🐞</span>}
          </button>
        ))}
      </div>
      {phase === 'repair-choice' && (
        <div className="learning-bug-repair-choices">
          <p>{localized(activity.reason, lang)}</p>
          <div className="learning-choice-grid">
            {shuffledRepairs.map((entry, index) => (
              <button
                className={`learning-choice${repairChoice === index ? ' is-selected' : ''}`}
                type="button"
                key={entry.item.id || entry.originalIndex}
                onClick={() => chooseRepair(entry, index)}
                aria-pressed={repairChoice === index}
              >
                {activityOptionLabel(entry.item, lang)}
              </button>
            ))}
          </div>
        </div>
      )}
      <Feedback
        key={`bug-${result}-${wrongTries}`}
        tipe={result === 'wrong' ? 'salah' : result ? 'benar' : undefined}
        pesan={result === 'wrong' ? labels.feedbackWrong : result === 'found' ? labels.bugFound : isFixed ? labels.bugFixed : undefined}
        petunjuk={result === 'wrong' && wrongTries >= 2 ? activityHint(activity.hint, lang, labels.bugHint) : undefined}
        labelPetunjuk={labels.feedbackHintButton}
      />
      {phase === 'find' ? null : phase === 'repair-choice' ? null : phase === 'repair' ? (
        <button className="btn btn-primary learning-activity-action learning-activity-continue" type="button" onClick={() => { setPhase('fixed'); setResult('fixed'); }}><ArrowLabel>{labels.fixBug}</ArrowLabel></button>
      ) : (
        <div className="learning-bug-actions">
          <button className="btn learning-bug-retry" type="button" onClick={restartTask}>{labels.tryAgain}</button>
          <button className="btn btn-primary learning-activity-action learning-activity-continue" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
        </div>
      )}
    </section>
  );
}

export function ProgressBar({ steps, currentStep, label, onStepChange }) {
  return (
    <nav className="learning-progress" aria-label={label}>
      {steps.map((step, index) => (
        <button
          key={step.id}
          type="button"
          className={`learning-progress__step${index <= currentStep ? ' is-active' : ''}`}
          aria-current={index === currentStep ? 'step' : undefined}
          title={step.label}
          onClick={() => onStepChange?.(index)}
          aria-label={`${step.label} ${index + 1}`}
          disabled={index > currentStep}
        >
          <span className="learning-progress__dot" aria-hidden="true">
            {index < currentStep ? '✓' : index + 1}
          </span>
          <span className="learning-progress__label">{step.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function LessonIntroStep({ unit, lang, labels, goToStep }) {
  const material = unit.material || [];
  const primaryMaterial = material[0];
  const reminder = material[1] || primaryMaterial;
  const keyPoints = material.slice(2);
  const example = unit.example || { sequence: [], caption: { id: '', en: '' } };
  const exampleSequence = example.sequence || [];
  const localize = (value) => (value?.[lang] || value?.id || '');

  return (
    <div className="learning-intro" aria-labelledby="learning-step-title">
      <section className="learning-intro-panel learning-intro-panel--material">
        <div className="learning-intro-tag">
          <span className="learning-intro-tag-icon">
            <img src={iosBook} alt="" aria-hidden="true" />
          </span>
          <span>{labels.materialLabel}</span>
        </div>
        <h1 id="learning-step-title" className="learning-step-title">{localize(unit.title)}</h1>
        {primaryMaterial && <p className="learning-intro-lead">{localize(primaryMaterial.text)}</p>}
        {reminder && (
          <aside className="learning-intro-reminder">
            <span className="learning-intro-reminder-icon">
              <img src={iosLamp} alt="" aria-hidden="true" />
            </span>
            <span>
              <strong>{labels.rememberLabel}</strong>
              <span>{localize(reminder.text)}</span>
            </span>
          </aside>
        )}
        {keyPoints.length > 0 && (
          <div className="learning-intro-points">
            <h2>
              <img src={iosStar} alt="" aria-hidden="true" />
              {labels.keyPointsLabel}
            </h2>
            <ul>
              {keyPoints.map((block) => (
              <li key={block.key}>
                <span aria-hidden="true">✓</span>
                {localize(block.text)}
              </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="learning-intro-panel learning-intro-panel--visual" aria-label={labels.exampleLabel}>
        <div className="learning-intro-tag">
          <span className="learning-intro-tag-icon">
            <img src={iosEyes} alt="" aria-hidden="true" />
          </span>
          <span>{labels.exampleLabel}</span>
        </div>
        <h2 className="learning-intro-example-title">
          {localize(example.heading) || labels.exampleTitle(localize(unit.title))}
        </h2>
        <p className="learning-intro-example-description">
          {localize(example.description) || labels.exampleDescription}
        </p>
        {exampleSequence.length > 0 ? (
          <ol className="learning-intro-steps">
            {exampleSequence.map((item, index) => (
              <li className="learning-intro-step" key={item.id}>
                <span className="learning-intro-step-tile" style={{ '--step-color': ['var(--blossom)', 'var(--summer-sky)', 'var(--sour-apple)', 'var(--banana)'][index % 4] }}>
                  <span className="learning-intro-step-number">{index + 1}</span>
                  <span
                    className={unit.id === 'basic-g12-ulangi-blok' && index === 3 ? 'learning-intro-step-symbol--compact' : undefined}
                    aria-hidden="true"
                  >
                      {item.iosVisualKey ? (
                        <img
                          className="learning-intro-step-art"
                          src={IOS_VISUALS[item.iosVisualKey] || IOS_VISUALS.sparkle}
                          alt=""
                        />
                      ) : unit.lessonId === 'creative-coding' ? (
                        <img className="learning-intro-step-art" src={IOS_VISUALS[iosCreativeVisualKey(index)]} alt="" />
                      ) : item.symbol || '✨'}
                  </span>
                </span>
                <span>{localize(item.label)}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="learning-intro-no-example" role="status">{labels.exampleUnavailable}</div>
        )}
        {example.caption && (
          <p className="learning-intro-example-caption">{localize(example.caption)}</p>
        )}
        {unit.safetyReminder && (
          <aside className="learning-intro-safety-reminder" role="note">
            {localize(unit.safetyReminder)}
          </aside>
        )}
      </section>

      <div className="learning-intro-actions">
        <button
          className="learning-intro-action learning-intro-action--next"
          type="button"
          onClick={() => goToStep?.(1)}
          aria-label={labels.continueActivity}
        >
          {labels.continueActivity}
        </button>
      </div>
    </div>
  );
}

export function ActivityStep({ activity, lang, labels, onContinue }) {
  const tasks = Array.isArray(activity?.tasks) && activity.tasks.length > 0
    ? activity.tasks
    : [activity];
  const [taskIndex, setTaskIndex] = useState(0);
  const currentTask = tasks[taskIndex] || tasks[0];

  return (
    <ActivityTaskStep
      key={currentTask.id || taskIndex}
      activity={currentTask}
      lang={lang}
      labels={labels}
      taskPosition={tasks.length > 1 ? [taskIndex + 1, tasks.length] : null}
      onContinue={() => {
        if (taskIndex < tasks.length - 1) setTaskIndex((index) => index + 1);
        else onContinue?.();
      }}
    />
  );
}

function ActivityTaskStep({ activity, lang, labels, onContinue, taskPosition }) {
  const orderedItems = Array.isArray(activity?.items)
    ? activity.items.map((item) => {
        if (typeof item === 'string') {
          return {
            id: item,
            emoji: '',
            symbol: '',
            label: { id: item, en: item },
            text: { id: item, en: item },
          };
        }

        return {
          ...item,
          label: item.label || item.text || { id: String(item.id ?? ''), en: String(item.id ?? '') },
          text: item.text || item.label || { id: String(item.id ?? ''), en: String(item.id ?? '') },
        };
      })
    : [];
  const normalizedAnswer = Array.isArray(activity?.answer)
    ? activity.answer
    : typeof activity?.answer === 'string'
      ? [activity.answer]
      : [];
  const orderItemIds = orderedItems.map((item) => item.id).filter(Boolean);
  const correctOrder = normalizedAnswer.length > 0 ? normalizedAnswer : orderItemIds;
  const slotCount = Math.max(correctOrder.length || orderItemIds.length || orderedItems.length, 1);
  const [slots, setSlots] = useState(() => Array(slotCount).fill(null));
  const [pool, setPool] = useState(() => shuffledOrder(orderItemIds, correctOrder));
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderResult, setOrderResult] = useState('');
  const [wrongTries, setWrongTries] = useState(0);
  const [locked, setLocked] = useState(false);
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState('');
  const [shuffledChoiceEntries] = useState(() =>
    activity?.shuffleOptions && Array.isArray(activity?.options)
      ? shuffledEntries(activity.options)
      : (activity?.options || []).map((item, originalIndex) => ({ item, originalIndex })),
  );
  const normalizedActivity = activity?.type === 'order'
    ? activity
    : {
        ...activity,
        title: activity?.title || { id: labels.completePattern, en: labels.completePattern },
        type: activity?.type || 'pick',
        sequence: Array.isArray(activity?.sequence) ? activity.sequence : Array.isArray(activity?.items) ? activity.items.map((item) => item.emoji || item.symbol || item.label?.id || item.id) : [],
        options: Array.isArray(activity?.opts) ? activity.opts : Array.isArray(activity?.options) ? activity.options : [],
        answer: activity?.answer ?? activity?.ok ?? 0,
      };

  if (normalizedActivity.type === 'direction-grid') {
    return <DirectionPathActivity activity={normalizedActivity} lang={lang} labels={labels} onContinue={onContinue} taskPosition={taskPosition} />;
  }
  if (normalizedActivity.type === 'matching') {
    return <MatchingActivity activity={normalizedActivity} lang={lang} labels={labels} onContinue={onContinue} taskPosition={taskPosition} />;
  }
  if (normalizedActivity.type === 'loop') {
    return <LoopActivity activity={normalizedActivity} lang={lang} labels={labels} onContinue={onContinue} taskPosition={taskPosition} />;
  }
  if (normalizedActivity.type === 'find-bug') {
    return <FindBugActivity activity={normalizedActivity} lang={lang} labels={labels} onContinue={onContinue} taskPosition={taskPosition} />;
  }

  if (normalizedActivity.type === 'order') {
    function moveItem(itemId, target) {
      if (locked) return;
      const sourceIndex = slots.indexOf(itemId);
      if (target === sourceIndex || (target === 'pool' && sourceIndex === -1)) return;

      const nextSlots = [...slots];
      const nextPool = [...pool];
      if (sourceIndex >= 0) {
        nextSlots[sourceIndex] = null;
      } else {
        const poolIndex = nextPool.indexOf(itemId);
        if (poolIndex < 0) return;
        nextPool.splice(poolIndex, 1);
      }

      if (target === 'pool') {
        nextPool.push(itemId);
      } else {
        const displacedItem = nextSlots[target];
        nextSlots[target] = itemId;
        if (displacedItem) {
          if (sourceIndex >= 0) nextSlots[sourceIndex] = displacedItem;
          else nextPool.push(displacedItem);
        }
      }

      setSlots(nextSlots);
      setPool(nextPool);
      setSelectedItem(null);
      setOrderResult('');
    }

    function handleDrop(event, target) {
      event.preventDefault();
      const itemId = event.dataTransfer.getData('text/plain');
      if (itemId) moveItem(itemId, target);
    }

    function handleCheck() {
      if (slots.some((slot) => slot === null)) {
        setOrderResult('incomplete');
        return;
      }

      const isCorrect = slots.every((value, index) => value === correctOrder[index]);
      setOrderResult(isCorrect ? 'correct' : 'wrong');
      if (!isCorrect) setWrongTries((tries) => tries + 1);
      setLocked(isCorrect);
    }

    function renderOption(itemId) {
      const item = orderedItems.find((entry) => entry.id === itemId);
      if (!item) return null;
      return (
        <button
          key={item.id}
          className={`learning-order-option${selectedItem === item.id ? ' is-selected' : ''}`}
          type="button"
          draggable={!locked}
          aria-pressed={selectedItem === item.id}
          onClick={(event) => {
            event.stopPropagation();
            if (!locked) setSelectedItem(selectedItem === item.id ? null : item.id);
          }}
          onDragStart={(event) => {
            event.currentTarget.classList.add('is-dragging');
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', item.id);
          }}
          onDragEnd={(event) => event.currentTarget.classList.remove('is-dragging')}
        >
          <span className="learning-order-option-emoji" aria-hidden="true">{item.emoji || item.symbol || '✨'}</span>
          <span className="learning-order-option-label">{localized(item.label || item.text, lang) || item.id}</span>
        </button>
      );
    }

    return (
      <section className="learning-card learning-activity-card" aria-labelledby="learning-step-title">
        <div className="learning-step-kicker">🧩</div>
        {taskPosition && (
          <p className="learning-activity-count">
            {labels.activityTaskCount(taskPosition[0], taskPosition[1])}
          </p>
        )}
        <h1 id="learning-step-title" className="learning-step-title">{localized(normalizedActivity.title, lang)}</h1>
        <div className="learning-order-board" aria-label={labels.orderActivityBoardLabel}>
          <div className="learning-order-slots">
            {slots.map((slotValue, index) => {
              const item = orderedItems.find((entry) => entry.id === slotValue);
              return (
                <div
                  key={`slot-${index}`}
                  className={`learning-order-slot${slotValue ? ' is-filled' : ''}${orderResult === 'wrong' && slotValue ? ' has-error' : ''}${orderResult === 'correct' ? ' is-correct' : ''}`}
                  data-slot={index}
                  role={slotValue ? 'group' : 'button'}
                  tabIndex={slotValue ? -1 : 0}
                  aria-label={`${index + 1}. ${slotValue ? localized(item?.label, lang) : labels.itemNumber(index + 1)}`}
                  onClick={() => {
                    if (selectedItem) moveItem(selectedItem, index);
                    else if (slotValue) moveItem(slotValue, 'pool');
                  }}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget || !['Enter', ' '].includes(event.key)) return;
                    event.preventDefault();
                    if (selectedItem) moveItem(selectedItem, index);
                    else if (slotValue) moveItem(slotValue, 'pool');
                  }}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, index)}
                >
                  <span className="learning-order-slot-number" aria-hidden="true">{index + 1}</span>
                  {item && renderOption(item.id)}
                </div>
              );
            })}
          </div>
          <p className="learning-order-instructions">{labels.orderActivityInstructions}</p>
          <div
            className="learning-order-pool"
            onClick={() => selectedItem && moveItem(selectedItem, 'pool')}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, 'pool')}
            aria-label={labels.orderActivityInstructions}
          >
            {pool.map(renderOption)}
            {pool.length === 0 && <span className="learning-order-pool-empty">{labels.emptyOrderPool}</span>}
          </div>
        </div>
        <Feedback
          key={`order-${orderResult}-${wrongTries}`}
          tipe={orderResult === 'correct' ? 'benar' : orderResult ? 'salah' : undefined}
          pesan={orderResult === 'correct' ? labels.feedbackCorrect : orderResult === 'incomplete' ? labels.fillOrderSlots : labels.feedbackWrong}
          petunjuk={orderResult === 'wrong' && wrongTries >= 2
            ? activityHint(normalizedActivity.hint, lang, labels.orderActivityHint)
            : undefined}
          labelPetunjuk={labels.feedbackHintButton}
        />
        {locked ? (
          <button className="btn btn-primary learning-activity-action learning-activity-continue" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
        ) : (
          <button className="btn btn-primary learning-activity-action learning-order-check-action" type="button" onClick={handleCheck}>
            {labels.check}
          </button>
        )}
      </section>
    );
  }

  const isCorrect = result === 'correct';

  function checkChoice() {
    const selectedEntry = shuffledChoiceEntries[choice];
    const answerIndex = Number.isInteger(normalizedActivity.answer)
      ? normalizedActivity.answer
      : Number.isInteger(normalizedActivity.ok)
        ? normalizedActivity.ok
        : null;
    const selectedOption = selectedEntry?.item;
    const selectedValue = activityOptionValue(selectedOption, lang);
    const isAnswerCorrect = answerIndex === null
      ? selectedValue === normalizedActivity.answer
      : selectedEntry?.originalIndex === answerIndex;
    setResult(isAnswerCorrect ? 'correct' : 'wrong');
    if (!isAnswerCorrect) setWrongTries((tries) => tries + 1);
  }

  return (
    <section className="learning-card learning-activity-card" aria-labelledby="learning-step-title">
      <div className="learning-step-kicker">🧩</div>
      {taskPosition && (
        <p className="learning-activity-count">
          {labels.activityTaskCount(taskPosition[0], taskPosition[1])}
        </p>
      )}
      <h1 id="learning-step-title" className="learning-step-title">{localized(normalizedActivity.title, lang)}</h1>
      <div className="learning-activity-sequence" aria-label={labels.activitySequenceLabel}>
        {normalizedActivity.sequence.map((item, index) => {
          const sequenceLabel = typeof item === 'string' ? item : localized(item, lang);
          const emojiCount = [...sequenceLabel.matchAll(/\p{Extended_Pictographic}/gu)].length;
          const tileClass = emojiCount > 1
            ? ' learning-activity-tile--emoji-pair'
            : /^[\d\s]+$/u.test(sequenceLabel)
              ? ' learning-activity-tile--number'
              : /[\p{L}\p{N}<>!=≤≥…]/u.test(sequenceLabel)
                ? ' learning-activity-tile--text'
                : '';
          return (
            <span
              className={`learning-activity-tile${tileClass}`}
              key={`${sequenceLabel}-${index}`}
              aria-hidden="true"
            >
              {sequenceLabel}
            </span>
          );
        })}
      </div>
      <div className="learning-choice-grid">
        {shuffledChoiceEntries.map(({ item: option, originalIndex }, index) => (
          <button
            className={`learning-choice learning-choice--large${choice === index ? ' is-selected' : ''}`}
            type="button"
            key={typeof option === 'string' ? option : option.id || originalIndex}
            onClick={() => {
              setChoice(index);
              setResult('');
            }}
            aria-pressed={choice === index}
          >
            {activityOptionLabel(option, lang)}
          </button>
        ))}
      </div>
      <Feedback
        key={`activity-${result}-${wrongTries}`}
        tipe={result ? (isCorrect ? 'benar' : 'salah') : undefined}
        pesan={isCorrect ? labels.feedbackCorrect : labels.feedbackWrong}
        petunjuk={result === 'wrong' && wrongTries >= 2
          ? activityHint(normalizedActivity.hint, lang, labels.activityHint)
          : undefined}
        labelPetunjuk={labels.feedbackHintButton}
      />
      {isCorrect ? (
        <button className="btn btn-primary learning-activity-action learning-activity-continue" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
      ) : (
        <button className="btn btn-primary learning-activity-action" type="button" onClick={checkChoice} disabled={choice === null}>
          {labels.check}
        </button>
      )}
    </section>
  );
}

function moveItem(order, from, to) {
  if (from === to) return order;
  const next = [...order];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function QuestionInput({ question, lang, value, setValue, labels }) {
  const [selectedLeft, setSelectedLeft] = useState('');
  const [draggedId, setDraggedId] = useState('');

  if (question.type === 'multiple-choice' || question.type === 'pattern') {
    return (
      <div className="learning-choice-grid">
        {question.options.map((option) => (
          <button
            className={`learning-choice${value === option.id ? ' is-selected' : ''}`}
            type="button"
            key={option.id}
            onClick={() => setValue(option.id)}
            aria-pressed={value === option.id}
          >
            {localized(option.text, lang)}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'path-choice') {
    return (
      <div className="learning-choice-grid learning-path-choice-grid">
        {question.options.map((option) => (
          <button
            className={`learning-path-choice${value === option.id ? ' is-selected' : ''}`}
            type="button"
            key={option.id}
            onClick={() => setValue(option.id)}
            aria-label={localized(option.text, lang)}
            aria-pressed={value === option.id}
          >
            <DirectionGrid
              activity={option.grid}
              path={option.path}
              labels={labels}
              className="learning-direction-grid--choice"
            />
            <span>{localized(option.text, lang)}</span>
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'true-false') {
    return (
      <div className="learning-choice-grid learning-choice-grid--two learning-choice-grid--true-false">
        {[true, false].map((answer) => (
          <button
            className={`learning-choice learning-choice--true-false${value === answer ? ' is-selected' : ''}`}
            type="button"
            key={String(answer)}
            onClick={() => setValue(answer)}
            aria-pressed={value === answer}
          >
            {answer ? labels.true : labels.false}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'sequence') {
    const order = value.length ? value : question.items.map((item) => item.id);

    function reorder(fromIndex, toIndex) {
      setValue(moveItem(order, fromIndex, toIndex));
    }

    return (
      <ol className="learning-sequence-list" aria-label={labels.sequenceInstructions}>
        {order.map((id, index) => {
          const item = question.items.find((entry) => entry.id === id);
          return (
            <li
              className="learning-sequence-item"
              key={id}
              draggable
              onDragStart={(event) => {
                setDraggedId(id);
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', id);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const draggedItem = event.dataTransfer.getData('text/plain') || draggedId;
                const fromIndex = order.indexOf(draggedItem);
                if (fromIndex >= 0) reorder(fromIndex, index);
                setDraggedId('');
              }}
              onDragEnd={() => setDraggedId('')}
            >
              <span className="learning-sequence-grip" aria-hidden="true">⠿</span>
              <span>{localized(item.text, lang)}</span>
              <span className="learning-sequence-controls">
                <button
                  type="button"
                  aria-label={`${labels.moveUp}, ${labels.itemNumber(index + 1)}: ${localized(item.text, lang)}`}
                  onClick={() => index > 0 && reorder(index, index - 1)}
                  disabled={index === 0}
                >↑</button>
                <button
                  type="button"
                  aria-label={`${labels.moveDown}, ${labels.itemNumber(index + 1)}: ${localized(item.text, lang)}`}
                  onClick={() => index < order.length - 1 && reorder(index, index + 1)}
                  disabled={index === order.length - 1}
                >↓</button>
              </span>
            </li>
          );
        })}
      </ol>
    );
  }

  if (question.type === 'matching') {
    const matches = value || {};
    return (
      <div className="learning-match-area">
        <p className="learning-match-instructions">{labels.matchInstructions}</p>
        <div className="learning-match-columns">
          <div className="learning-match-column">
            {question.left.map((item, index) => {
              const isConnected = Boolean(matches[item.id]);
              const isSelected = selectedLeft === item.id;
              const pairClass = isConnected || isSelected ? ` is-match-color-${index % 6}` : '';
              return (
                <button
                  type="button"
                  className={`learning-match-item${isSelected ? ' is-selected' : ''}${isConnected ? ' is-connected' : ''}${pairClass}`}
                  key={item.id}
                  onClick={() => setSelectedLeft(item.id)}
                  aria-pressed={selectedLeft === item.id}
                >
                  {localized(item.text, lang)}
                  {isConnected && <span className="learning-match-connected">✓</span>}
                </button>
              );
            })}
          </div>
          <div className="learning-match-column">
            {question.right.map((item) => {
              const connectedLeftId = Object.keys(matches).find((leftId) => matches[leftId] === item.id);
              const pairIndex = connectedLeftId
                ? question.left.findIndex((leftItem) => leftItem.id === connectedLeftId)
                : -1;
              return (
                <button
                  type="button"
                  className={`learning-match-item${pairIndex >= 0 ? ` is-connected is-match-color-${pairIndex % 6}` : ''}`}
                  key={item.id}
                  aria-pressed={pairIndex >= 0}
                  onClick={() => {
                    if (!selectedLeft) return;
                    setValue({ ...matches, [selectedLeft]: item.id });
                    setSelectedLeft('');
                  }}
                  aria-label={`${labels.matchTo}: ${localized(item.text, lang)}`}
                >
                  {localized(item.text, lang)}
                  {pairIndex >= 0 && <span className="learning-match-connected">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function matchesAnswer(question, value) {
  if (question.type === 'sequence') {
    return Array.isArray(value) && value.length === question.answer.length
      && value.every((item, index) => item === question.answer[index]);
  }
  if (question.type === 'matching') {
    return Object.entries(question.answer).every(([left, right]) => value?.[left] === right);
  }
  return value === question.answer;
}

function formatAnswer(question, lang, labels) {
  if (question.type === 'sequence') {
    return question.answer
      .map((id) => localized(question.items.find((item) => item.id === id).text, lang))
      .join(' → ');
  }
  if (question.type === 'matching') {
    return Object.entries(question.answer)
      .map(([leftId, rightId]) => {
        const left = question.left.find((item) => item.id === leftId);
        const right = question.right.find((item) => item.id === rightId);
        return `${localized(left.text, lang)} → ${localized(right.text, lang)}`;
      })
      .join(' · ');
  }
  if (question.type === 'true-false') {
    return question.answer ? labels.true : labels.false;
  }
  return localized(question.options.find((option) => option.id === question.answer).text, lang);
}

function localizedMessage(question, name, lang) {
  return localized(question[name], lang);
}

function normalizeQuizQuestion(question, index) {
  if (!Array.isArray(question)) {
    return question;
  }

  const [prompt, options, answerIndex = 0] = question;
  return {
    id: `quiz-${index}`,
    type: 'multiple-choice',
    prompt: typeof prompt === 'string' ? { id: prompt, en: prompt } : prompt,
    options: (Array.isArray(options) ? options : []).map((option, optionIndex) => {
      const optionId = `option-${optionIndex}`;
      if (typeof option === 'string') {
        return { id: optionId, text: { id: option, en: option } };
      }
      return {
        id: option?.id || optionId,
        text: option?.text || { id: String(option), en: String(option) },
      };
    }),
    answer: `option-${Number(answerIndex) || 0}`,
    hint: { id: 'Coba pikirkan lagi.', en: 'Try again.' },
    explanation: { id: 'Yuk cek kembali langkahnya.', en: 'Let’s review the steps again.' },
  };
}

export function QuizStep({ questions, lang, labels, onCorrect, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [value, setValue] = useState('');
  const [wrongTries, setWrongTries] = useState(0);
  const [outcome, setOutcome] = useState('');
  const [optionOrders] = useState(() => questions.map((entry, index) => {
    const normalized = normalizeQuizQuestion(entry, index);
    if (!Array.isArray(normalized.options)) return [];
    return normalized.shuffleOptions
      ? shuffledEntries(normalized.options)
      : normalized.options.map((item, originalIndex) => ({ item, originalIndex }));
  }));
  const baseQuestion = normalizeQuizQuestion(questions[questionIndex], questionIndex);
  const question = {
    ...baseQuestion,
    options: (optionOrders[questionIndex] || []).map(({ item }) => item),
  };
  const revealed = outcome === 'revealed';

  function checkAnswer() {
    if (matchesAnswer(question, value)) {
      setOutcome('correct');
      if (!question.practice) onCorrect(question.id);
      return;
    }
    const nextWrongTries = wrongTries + 1;
    setWrongTries(nextWrongTries);
    setOutcome(nextWrongTries >= 2 ? 'revealed' : 'wrong');
  }

  function goNext() {
    if (questionIndex === questions.length - 1) {
      onComplete();
      return;
    }
    setQuestionIndex((index) => index + 1);
    setValue('');
    setWrongTries(0);
    setOutcome('');
  }

  return (
    <section className="learning-card learning-quiz-card" aria-labelledby="learning-step-title">
      <div className="learning-quiz-count">
        {labels.questionCount(questionIndex + 1, questions.length)}
        {question.practice && <span className="learning-practice-label">{labels.practiceQuestion}</span>}
      </div>
      <div className="learning-prompt-heading">
        <h1 id="learning-step-title" className="learning-step-title">{localized(question.prompt, lang)}</h1>
        <button className="learning-speak-button" type="button" onClick={() => speakText(localized(question.prompt, lang), lang)} aria-label={labels.readAloud} title={labels.readAloud}>
          <span aria-hidden="true">🔊</span>
        </button>
      </div>
      {outcome !== 'correct' && !revealed && (
        <QuestionInput
          question={question}
          lang={lang}
          value={value}
          setValue={setValue}
          labels={labels}
        />
      )}
      <Feedback
        key={`${question.id}-${wrongTries}-${outcome}`}
        tipe={outcome ? (outcome === 'correct' ? 'benar' : 'salah') : undefined}
        pesan={outcome === 'correct' ? labels.feedbackCorrect : labels.feedbackWrong}
        xp={outcome === 'correct' && !question.practice ? 10 : undefined}
        bintang={outcome === 'correct' && !question.practice ? 1 : undefined}
        petunjuk={wrongTries >= 2 && outcome !== 'correct'
          ? feedbackText(localizedMessage(question, 'hint', lang)) || labels.quizHint
          : undefined}
        labelPetunjuk={labels.feedbackHintButton}
      />
      {revealed && (
        <p className="learning-answer-reveal">
          <strong>{labels.correctAnswer}</strong> {formatAnswer(question, lang, labels)}
          {' — '}{localizedMessage(question, 'explanation', lang)}
        </p>
      )}
      {outcome === 'correct' || revealed ? (
        <button className="btn btn-primary learning-continue-btn" type="button" onClick={goNext}><ArrowLabel>{labels.continue}</ArrowLabel></button>
      ) : (
        <button className="btn btn-primary" type="button" onClick={checkAnswer} disabled={value === '' || (question.type === 'matching' && Object.keys(value || {}).length !== question.left.length)}>
          {labels.check}
        </button>
      )}
    </section>
  );
}

export function FeedbackStep({ labels, correctCount, questionCount, onContinue }) {
  return (
    <section className="learning-card learning-feedback-card" aria-labelledby="learning-step-title">
      <div className="learning-feedback-illustration" aria-hidden="true">🎉</div>
      <h1 id="learning-step-title" className="learning-step-title">{labels.feedbackTitle}</h1>
      <p>{labels.feedbackBody(correctCount, questionCount)}</p>
      <button className="btn btn-primary learning-continue-btn" type="button" onClick={onContinue}><ArrowLabel>{labels.continue}</ArrowLabel></button>
    </section>
  );
}

export function RewardStep({ labels, xpEarned, starsEarned, badgeName, onNext, onRetry }) {
  return (
    <section className="learning-card learning-reward-card" aria-labelledby="learning-step-title">
      <p className="learning-reward-kicker">{labels.unitComplete}</p>
      <h1 id="learning-step-title" className="learning-step-title">
        <img className="learning-reward-title-icon" src={iosChampion} alt="" aria-hidden="true" />
        {labels.rewardTitle}
      </h1>
      <div className="learning-reward-totals">
        <span>
          <img className="learning-reward-total-icon" src={iosStar} alt="" aria-hidden="true" />
          <span>{labels.starsEarned(starsEarned)}</span>
        </span>
        <span>
          <img className="learning-reward-total-icon learning-reward-total-icon--lightning" src={iosLightning} alt="" aria-hidden="true" />
          <span>{labels.xpEarned(xpEarned)}</span>
        </span>
      </div>
      {badgeName && (
        <div className="learning-badge-sticker">
          <img className="learning-badge-sticker-icon" src={iosBadgeChampion} alt="" aria-hidden="true" />
          {badgeName}
        </div>
      )}
      <div className="learning-reward-actions">
        <button className="btn learning-reward-next" type="button" onClick={onNext}>{labels.next}</button>
        <button className="btn learning-reward-retry" type="button" onClick={onRetry}>{labels.tryAgain}</button>
      </div>
    </section>
  );
}

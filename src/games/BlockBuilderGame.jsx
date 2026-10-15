import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import robotAsset from '../assets/IOS Robot.webp';
import starAsset from '../assets/IOS Star.webp';
import Feedback from '../components/Feedback';
import { BLOCK_BUILDER_LEVELS } from './blockBuilderLevels';
import { countProgramBlocks, simulateBlockProgram } from './blockBuilderEngine';
import '../pages/GamePlayer.css';
import './BlockBuilderGame.css';

const REPEAT_MIN = 2;
const REPEAT_MAX = 20;
const sameCell = (a, b) => a[0] === b[0] && a[1] === b[1];
const pathKey = (path) => path.join('-');

function BlockBuilderGame({ text, onComplete }) {
  const [searchParams] = useSearchParams();
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [levelIndex, setLevelIndex] = useState(0);
  const [program, setProgram] = useState([]);
  const [position, setPosition] = useState(null);
  const [robotDirection, setRobotDirection] = useState(BLOCK_BUILDER_LEVELS.levels[0].direction);
  const [activePath, setActivePath] = useState('');
  const [running, setRunning] = useState(false);
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [levelStars, setLevelStars] = useState([]);
  const nextId = useRef(0);
  const level = BLOCK_BUILDER_LEVELS.levels[levelIndex];
  const blockCount = countProgramBlocks(program);
  const lessonId = searchParams.get('fromLesson');
  const grade = searchParams.get('grade') || '1-2';
  const lang = searchParams.get('lang') || 'id';
  const backTo = lessonId
    ? `/lessons/${lessonId}/game?grade=${encodeURIComponent(grade)}&lang=${encodeURIComponent(lang)}`
    : '/games';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  function updateProgram(updater) {
    setProgram((current) => {
      const next = updater(current);
      if (countProgramBlocks(next) > level.blockLimit) return current;
      return next;
    });
  }

  function appendBlock(type, parentPath = []) {
    if (running || solved) return;
    const newBlock = type === 'repeat'
      ? { type, count: REPEAT_MIN, children: [] }
      : { type };
    newBlock.id = `block-${nextId.current}`;
    nextId.current += 1;
    updateProgram((current) => {
      if (parentPath.length === 0) return [...current, newBlock];
      const next = structuredClone(current);
      let target = next[parentPath[0]];
      for (const index of parentPath.slice(1)) target = target.children[index];
      target.children.push(newBlock);
      return next;
    });
    setFeedback(null);
  }

  function removeBlock(path) {
    updateProgram((current) => {
      const next = structuredClone(current);
      const index = path[path.length - 1];
      const parentPath = path.slice(0, -1);
      const siblings = parentPath.length
        ? parentPath.reduce((items, part) => items[part].children, next)
        : next;
      siblings.splice(index, 1);
      return next;
    });
    setFeedback(null);
  }

  function moveBlock(path, offset) {
    updateProgram((current) => {
      const next = structuredClone(current);
      const index = path[path.length - 1];
      const parentPath = path.slice(0, -1);
      const siblings = parentPath.length
        ? parentPath.reduce((items, part) => items[part].children, next)
        : next;
      const target = index + offset;
      [siblings[index], siblings[target]] = [siblings[target], siblings[index]];
      return next;
    });
    setFeedback(null);
  }

  function changeRepeat(path, amount) {
    updateProgram((current) => {
      const next = structuredClone(current);
      const block = path.reduce((items, part) => items[part].children, next);
      block.count = Math.max(REPEAT_MIN, Math.min(REPEAT_MAX, block.count + amount));
      return next;
    });
    setFeedback(null);
  }

  function resetLevel() {
    setProgram([]);
    setPosition(null);
    setRobotDirection(level.direction);
    setActivePath('');
    setSolved(false);
    setFeedback(null);
  }

  function starsForProgram(count) {
    if (count === level.optimalBlockCount) return 3;
    if (count <= level.optimalBlockCount + 1) return 2;
    return 1;
  }

  async function runProgram() {
    if (!program.length || running || solved) return;
    setRunning(true);
    setFeedback(null);
    setRobotDirection(level.direction);
    const result = simulateBlockProgram(
      level,
      program,
      BLOCK_BUILDER_LEVELS.maxExecutionSteps,
      BLOCK_BUILDER_LEVELS.boardSize,
    );
    setPosition(level.start);

    for (const frame of result.frames) {
      if (frame.path) setActivePath(pathKey(frame.path));
      setPosition([frame.x, frame.y]);
      setRobotDirection(frame.direction ?? level.direction);
      if (!reduceMotion) {
        await new Promise((resolve) => window.setTimeout(resolve, 350));
      }
    }

    setActivePath('');
    if (result.reachedGoal) {
      const earnedStars = starsForProgram(blockCount);
      const nextStars = [...levelStars, earnedStars];
      setLevelStars(nextStars);
      setSolved(true);
      const message = levelIndex === BLOCK_BUILDER_LEVELS.levels.length - 1
        ? text.blockBuilderComplete
        : text.blockBuilderSuccess;
      setFeedback({ tipe: 'benar', pesan: message, bintang: earnedStars });
      if (levelIndex === BLOCK_BUILDER_LEVELS.levels.length - 1) {
        onComplete(nextStars.reduce((total, stars) => total + stars, 0));
      }
    } else if (result.executionLimitReached) {
      setFeedback({ tipe: 'salah', pesan: text.blockBuilderStepLimit });
    } else {
      setFeedback({ tipe: 'salah', pesan: text.blockBuilderFailure });
    }
    setRunning(false);
  }

  function nextLevel() {
    if (!solved || levelIndex >= BLOCK_BUILDER_LEVELS.levels.length - 1) return;
    const nextLevelIndex = levelIndex + 1;
    setLevelIndex(nextLevelIndex);
    setProgram([]);
    setPosition(null);
    setRobotDirection(BLOCK_BUILDER_LEVELS.levels[nextLevelIndex].direction);
    setActivePath('');
    setSolved(false);
    setFeedback(null);
  }

  function restartGame() {
    setLevelIndex(0);
    setLevelStars([]);
    setRobotDirection(BLOCK_BUILDER_LEVELS.levels[0].direction);
    resetLevel();
  }

  function renderBlock(block, path, siblings) {
    const key = pathKey(path);
    const isRepeat = block.type === 'repeat';
    const labels = {
      forward: text.blockBuilderForward,
      left: text.blockBuilderLeft,
      right: text.blockBuilderRight,
    };
    const label = isRepeat ? text.blockBuilderRepeat(block.count) : labels[block.type];

    return (
      <li className={`block-builder-item${activePath === key ? ' is-active' : ''}`} key={block.id} data-block-path={key}>
        <div className="block-builder-item-main">
          <span className="block-builder-block-label">{label}</span>
          {isRepeat && (
            <span className="block-builder-repeat-count">
              <button
                type="button"
                aria-label={text.blockBuilderRepeatLess}
                disabled={running || solved || block.count <= REPEAT_MIN}
                onClick={() => changeRepeat(path, -1)}
              >−</button>
              <button
                type="button"
                aria-label={text.blockBuilderRepeatMore}
                disabled={running || solved || block.count >= REPEAT_MAX}
                onClick={() => changeRepeat(path, 1)}
              >+</button>
            </span>
          )}
        </div>
        <div className="block-builder-item-actions">
          <button type="button" aria-label={text.blockBuilderMoveUp.replace('{number}', String(path[path.length - 1] + 1))} disabled={running || solved || path[path.length - 1] === 0} onClick={() => moveBlock(path, -1)}>↑</button>
          <button type="button" aria-label={text.blockBuilderMoveDown.replace('{number}', String(path[path.length - 1] + 1))} disabled={running || solved || path[path.length - 1] === siblings.length - 1} onClick={() => moveBlock(path, 1)}>↓</button>
          <button type="button" aria-label={text.blockBuilderRemove.replace('{number}', String(path[path.length - 1] + 1))} disabled={running || solved} onClick={() => removeBlock(path)}>×</button>
        </div>
        {isRepeat && (
          <div className="block-builder-repeat-body">
            <ol aria-label={text.blockBuilderAddInside}>
              {block.children.map((child, index) => renderBlock(child, [...path, index], block.children))}
            </ol>
            <div className="block-builder-nested-controls" aria-label={text.blockBuilderAddInside}>
              {['forward', 'left', 'right'].map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-label={text[`blockBuilderAdd${type[0].toUpperCase()}${type.slice(1)}`]}
                  disabled={running || solved || blockCount >= level.blockLimit}
                  onClick={() => appendBlock(type, path)}
                >
                  {labels[type]}
                </button>
              ))}
            </div>
          </div>
        )}
      </li>
    );
  }

  const currentPosition = position || level.start;

  return (
    <section className="game-player-card block-builder-card" aria-labelledby="game-player-title">
      <div className="block-builder-heading">
        <h1 id="game-player-title">{text.blockBuilderTitle}</h1>
        <p>{text.blockBuilderInstructions}</p>
        <span className="block-builder-level">{text.blockBuilderLevelLabel(levelIndex + 1, BLOCK_BUILDER_LEVELS.levels.length)}</span>
      </div>
      <div className="block-builder-board-wrap">
        <div className="block-builder-board" role="img" aria-label={text.blockBuilderBoardLabel(levelIndex + 1)}>
          {Array.from({ length: BLOCK_BUILDER_LEVELS.boardSize ** 2 }, (_, cellIndex) => {
            const cell = [cellIndex % BLOCK_BUILDER_LEVELS.boardSize, Math.floor(cellIndex / BLOCK_BUILDER_LEVELS.boardSize)];
            const isCharacter = sameCell(currentPosition, cell);
            const isGoal = sameCell(level.goal, cell);
            const showTogether = isCharacter && isGoal;
            const robotRotation = (robotDirection - 1) * 90;
            return (
              <div className={`block-builder-cell${isGoal ? ' is-goal' : ''}`} key={cellIndex}>
                {showTogether ? (
                  <div className="block-builder-goal-scene">
                    <img className="block-builder-character" src={robotAsset} alt="" aria-hidden="true" style={{ transform: `rotate(${robotRotation}deg)` }} />
                    <img className="block-builder-star" src={starAsset} alt="" aria-hidden="true" />
                  </div>
                ) : (
                  <>
                    {isCharacter && <img className="block-builder-character" src={robotAsset} alt="" aria-hidden="true" style={{ transform: `rotate(${robotRotation}deg)` }} />}
                    {isGoal && <img className="block-builder-star" src={starAsset} alt="" aria-hidden="true" />}
                  </>
                )}
              </div>
            );
          })}
        </div>
        <p className="block-builder-goal">{text.blockBuilderGoal}</p>
      </div>
      <div className="block-builder-editor">
        <div className="block-builder-section">
          <h2>{text.blockBuilderPalette}</h2>
          <div className="block-builder-palette">
            {level.allowedBlocks.map((type) => {
              const label = type === 'forward' ? text.blockBuilderAddForward
                : type === 'left' ? text.blockBuilderAddLeft
                  : type === 'right' ? text.blockBuilderAddRight
                    : text.blockBuilderAddRepeat;
              const shown = type === 'forward' ? text.blockBuilderForward
                : type === 'left' ? text.blockBuilderLeft
                  : type === 'right' ? text.blockBuilderRight
                    : text.blockBuilderRepeat(REPEAT_MIN);
              return (
                <button
                  key={type}
                  type="button"
                  aria-label={label}
                  disabled={running || solved || blockCount >= level.blockLimit}
                  onClick={() => appendBlock(type)}
                >
                  {shown}
                </button>
              );
            })}
          </div>
        </div>
        <div className="block-builder-section">
          <div className="block-builder-program-heading">
            <h2>{text.blockBuilderProgram}</h2>
            <span>{text.blockBuilderBlockCount(blockCount, level.blockLimit)}</span>
          </div>
          <ol className="block-builder-program" aria-label={text.blockBuilderProgram}>
            {program.length
              ? program.map((block, index) => renderBlock(block, [index], program))
              : <li className="block-builder-empty">{text.blockBuilderEmpty}</li>}
          </ol>
        </div>
      </div>
      <Feedback
        key={`${levelIndex}-${feedback?.tipe || 'empty'}-${feedback?.pesan || ''}`}
        tipe={feedback?.tipe}
        pesan={feedback?.pesan}
        bintang={feedback?.bintang}
        labelPetunjuk={text.feedbackHintButton}
      />
      <div className="block-builder-actions">
        {!solved ? (
          <>
            <button className="btn btn-secondary" type="button" disabled={running || !program.length} onClick={resetLevel}>{text.blockBuilderReset}</button>
            <button className="btn btn-primary" type="button" disabled={running || !program.length} onClick={runProgram}>{text.blockBuilderRun}</button>
          </>
        ) : levelIndex < BLOCK_BUILDER_LEVELS.levels.length - 1 ? (
          <button className="btn btn-primary" type="button" onClick={nextLevel}>{text.blockBuilderNext}</button>
        ) : (
          <>
            <Link className="btn btn-secondary btn--wide" to={backTo}>{text.blockBuilderBack}</Link>
            <button className="btn btn-primary" type="button" onClick={restartGame}>{text.blockBuilderAgain}</button>
          </>
        )}
      </div>
    </section>
  );
}

export default BlockBuilderGame;

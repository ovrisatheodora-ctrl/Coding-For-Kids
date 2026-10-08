import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { addStar, addXP, completeGame, getProgress } from '../data/progress';
import patternAsset from '../assets/Card Pattern Finder.svg';
import robotAsset from '../assets/Robot Delivery.png';
import './GamePlayer.css';

const PATTERN_LEVELS = [
  { sequence: ['🍎', '🍌', '🍎', '?'], answer: '🍌', options: ['🍌', '🍇', '🍎'] },
  { sequence: ['🐱', '🐱', '🐶', '🐱', '🐱', '?'], answer: '🐶', options: ['🐱', '🐶', '🐰'] },
  { sequence: ['🔺', '🔵', '🟩', '🔺', '🔵', '?'], answer: '🟩', options: ['🔵', '🟩', '🔺'] },
  { sequence: ['⭐', '⭐', '🌙', '⭐', '⭐', '?'], answer: '🌙', options: ['☀️', '🌙', '⭐'] },
  { sequence: ['🟣', '🟡', '🟡', '🟣', '🟡', '🟡', '?'], answer: '🟣', options: ['🟣', '🟡', '🔵'] },
];

const ROBOT_LEVELS = [
  { start: [0, 2], direction: 1, package: [2, 2], destination: [4, 2], obstacles: [[1, 1], [3, 3]] },
  { start: [0, 4], direction: 1, package: [2, 4], destination: [2, 1], obstacles: [[1, 2], [4, 2]] },
  { start: [0, 0], direction: 1, package: [2, 0], destination: [4, 3], obstacles: [[4, 1], [1, 3]] },
  { start: [4, 4], direction: 3, package: [2, 4], destination: [0, 1], obstacles: [[3, 2], [0, 3]] },
  { start: [0, 4], direction: 1, package: [3, 4], destination: [3, 0], obstacles: [[1, 3], [4, 2], [1, 1]] },
];

const DIRECTIONS = [
  { x: 0, y: -1, symbol: '↑' },
  { x: 1, y: 0, symbol: '→' },
  { x: 0, y: 1, symbol: '↓' },
  { x: -1, y: 0, symbol: '←' },
];

const sameCell = (a, b) => a[0] === b[0] && a[1] === b[1];
const cellKey = (x, y) => `${x}-${y}`;

function GamePlayer({ t, lang }) {
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const copy = t.gamesPage;
  const text = copy.gamePlay;
  const [levelIndex, setLevelIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [commands, setCommands] = useState([]);
  const [robotState, setRobotState] = useState(null);
  const [carryingPackage, setCarryingPackage] = useState(false);
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rewarded, setRewarded] = useState(false);
  const isPatternGame = gameId === 'pattern-adventure';
  const levels = isPatternGame ? PATTERN_LEVELS : ROBOT_LEVELS;
  const level = levels[levelIndex];
  const gameCopy = copy.content[gameId];
  const lessonId = searchParams.get('fromLesson');
  const grade = searchParams.get('grade') || '1-2';
  const routeLang = searchParams.get('lang') || lang;
  const backTo = lessonId
    ? `/lessons/${lessonId}/game?grade=${encodeURIComponent(grade)}&lang=${encodeURIComponent(routeLang)}`
    : '/games';

  function finishGame(successMessage = text.levelComplete) {
    setSolved(true);
    setFeedback(successMessage);
    if (levelIndex === levels.length - 1 && !rewarded) {
      const alreadyCompleted = getProgress().completedGames.includes(gameId);
      completeGame(gameId);
      if (!alreadyCompleted) {
        addXP(50);
        addStar();
      }
      setRewarded(true);
    }
  }

  function nextLevel() {
    if (!solved || levelIndex === levels.length - 1) return;
    setLevelIndex((index) => index + 1);
    setSelectedAnswer('');
    setCommands([]);
    setRobotState(null);
    setCarryingPackage(false);
    setSolved(false);
    setFeedback('');
  }

  function submitPattern() {
    if (!selectedAnswer) return;
    if (selectedAnswer === level.answer) {
      finishGame();
      return;
    }
    setFeedback(text.tryAgain);
  }

  function appendCommand(command) {
    if (solved) return;
    setCommands((current) => [...current, command]);
    setFeedback('');
    setRobotState(null);
  }

  function runRobotProgram() {
    let [x, y] = level.start;
    let direction = level.direction;
    let hasPackage = false;

    for (const command of commands) {
      if (command === 'left') {
        direction = (direction + 3) % 4;
      } else if (command === 'right') {
        direction = (direction + 1) % 4;
      } else {
        const nextX = x + DIRECTIONS[direction].x;
        const nextY = y + DIRECTIONS[direction].y;
        if (
          nextX < 0 || nextX > 4 || nextY < 0 || nextY > 4
          || level.obstacles.some((obstacle) => sameCell(obstacle, [nextX, nextY]))
        ) {
          setRobotState({ x, y, direction });
          setCarryingPackage(hasPackage);
          setFeedback(text.robotBlocked);
          return;
        }
        x = nextX;
        y = nextY;
        if (sameCell([x, y], level.package)) hasPackage = true;
      }

      if (hasPackage && sameCell([x, y], level.destination)) {
        setRobotState({ x, y, direction });
        setCarryingPackage(true);
        finishGame(text.robotDelivered);
        return;
      }
    }

    setRobotState({ x, y, direction });
    setCarryingPackage(hasPackage);
    setFeedback(text.robotNotDelivered);
  }

  function retryLevel() {
    setCommands([]);
    setRobotState(null);
    setCarryingPackage(false);
    setSelectedAnswer('');
    setSolved(false);
    setFeedback('');
  }

  function restartGame() {
    setLevelIndex(0);
    setRewarded(false);
    retryLevel();
  }

  const backLink = (
    <Link className="game-player-back" to={backTo}>
      ← {lessonId ? copy.backToLesson : text.backToGames}
    </Link>
  );

  return (
    <main id="main-content" className="game-player-page">
      <div className="game-player-shell">
        {backLink}
        <header className="game-player-header">
          <img src={isPatternGame ? patternAsset : robotAsset} alt="" />
          <div>
            <p>{text.levelLabel(levelIndex + 1, levels.length)}</p>
            <h1>{gameCopy.title}</h1>
          </div>
        </header>

        {isPatternGame ? (
          <section className="game-player-card" aria-labelledby="game-player-title">
            <h2 id="game-player-title">{text.patternGoal}</h2>
            <p>{text.patternInstructions}</p>
            <ol className="pattern-board" aria-label={text.patternGoal}>
              {level.sequence.map((symbol, index) => (
                <li key={`${levelIndex}-${index}`} className={symbol === '?' ? 'pattern-missing' : ''}>
                  {symbol}
                </li>
              ))}
            </ol>
            <div className="pattern-choices" role="group" aria-label={text.choosePattern}>
              {level.options.map((option) => (
                <button
                  key={option}
                  className={`pattern-choice${selectedAnswer === option ? ' is-selected' : ''}`}
                  type="button"
                  disabled={solved}
                  aria-pressed={selectedAnswer === option}
                  onClick={() => {
                    setSelectedAnswer(option);
                    setFeedback('');
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            {feedback && <p className={`game-player-feedback${solved ? ' is-success' : ''}`} role="status">{feedback}</p>}
            <div className="game-player-actions">
              {!solved ? (
                <button className="btn btn-primary" type="button" disabled={!selectedAnswer} onClick={submitPattern}>
                  {text.check}
                </button>
              ) : levelIndex < levels.length - 1 ? (
                <button className="btn btn-primary" type="button" onClick={nextLevel}>{text.nextLevel}</button>
              ) : (
                <button className="btn btn-primary" type="button" onClick={restartGame}>{text.playAgain}</button>
              )}
            </div>
          </section>
        ) : (
          <section className="game-player-card" aria-labelledby="game-player-title">
            <h2 id="game-player-title">{text.robotGoal}</h2>
            <p>{text.robotInstructions}</p>
            <div className="robot-board" role="img" aria-label={text.robotMapLabel}>
              {Array.from({ length: 25 }, (_, index) => {
                const x = index % 5;
                const y = Math.floor(index / 5);
                const cell = [x, y];
                const isRobot = robotState
                  ? robotState.x === x && robotState.y === y
                  : sameCell(level.start, cell);
                const isObstacle = level.obstacles.some((obstacle) => sameCell(obstacle, cell));
                const isPackage = sameCell(level.package, cell);
                const isDestination = sameCell(level.destination, cell);
                const direction = robotState?.direction ?? level.direction;
                return (
                  <div className={`robot-cell${isObstacle ? ' is-obstacle' : ''}`} key={cellKey(x, y)}>
                    {isRobot && <span aria-hidden="true">{DIRECTIONS[direction].symbol}</span>}
                    {!isRobot && isPackage && !carryingPackage && <span aria-hidden="true">📦</span>}
                    {!isRobot && isDestination && <span aria-hidden="true">🏁</span>}
                    {!isRobot && isObstacle && <span aria-hidden="true">🪨</span>}
                  </div>
                );
              })}
            </div>
            <div className="robot-command-controls" role="group" aria-label={text.robotCommands}>
              <button type="button" disabled={solved} onClick={() => appendCommand('forward')}>{text.moveForward}</button>
              <button type="button" disabled={solved} onClick={() => appendCommand('left')}>{text.turnLeft}</button>
              <button type="button" disabled={solved} onClick={() => appendCommand('right')}>{text.turnRight}</button>
            </div>
            <ol className="robot-program" aria-label={text.robotProgram}>
              {commands.length ? commands.map((command, index) => (
                <li key={`${command}-${index}`}>{text.commands[command]}</li>
              )) : <li className="is-empty">{text.emptyProgram}</li>}
            </ol>
            {feedback && <p className={`game-player-feedback${solved ? ' is-success' : ''}`} role="status">{feedback}</p>}
            <div className="game-player-actions">
              {!solved ? (
                <>
                  <button className="btn btn-secondary" type="button" disabled={!commands.length} onClick={() => setCommands((current) => current.slice(0, -1))}>{text.undo}</button>
                  <button className="btn btn-secondary" type="button" disabled={!commands.length} onClick={retryLevel}>{text.clear}</button>
                  <button className="btn btn-primary" type="button" disabled={!commands.length} onClick={runRobotProgram}>{text.runProgram}</button>
                </>
              ) : levelIndex < levels.length - 1 ? (
                <button className="btn btn-primary" type="button" onClick={nextLevel}>{text.nextLevel}</button>
              ) : (
                <button className="btn btn-primary" type="button" onClick={restartGame}>{text.playAgain}</button>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default GamePlayer;

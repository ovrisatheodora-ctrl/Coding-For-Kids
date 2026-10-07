import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import gameIllustration from '../assets/Game.png';
import mascotIllustration from '../assets/Maskot_Coding_For_Kids.png';
import grade12Asset from '../assets/Grade 1-2.png';
import grade34Asset from '../assets/Grade 3-4.png';
import brainAsset from '../assets/Brain.png';
import lockAsset from '../assets/lock.png';
import robotDeliveryAsset from '../assets/Robot Delivery.png';
import algorithmAsset from '../assets/Algorithm.png';
import decisionAsset from '../assets/Decision.png';
import loopAsset from '../assets/Loop.png';
import bugHunterAsset from '../assets/Bug Hunter.png';
import { getProgress } from '../data/progress';
import './GamesPage.css';

const CATEGORIES = [
  { id: 'logic', color: '#C7EF8E', icon: { asset: brainAsset }, games: [
    { id: 'pattern-adventure', grade: '1-2', difficulty: 'easy', icon: { asset: grade12Asset }, playable: true },
    { id: 'robot-delivery', grade: '1-2', difficulty: 'easy', icon: { asset: robotDeliveryAsset }, playable: true },
    { id: 'algorithm-quest', grade: '3-4', difficulty: 'medium', icon: { asset: algorithmAsset } },
    { id: 'decision-forest', grade: '3-4', difficulty: 'medium', icon: { asset: decisionAsset } },
    { id: 'loop-runner', grade: '3-4', difficulty: 'medium', icon: { asset: loopAsset } },
    { id: 'bug-hunter', grade: '3-4', difficulty: 'hard', icon: { asset: bugHunterAsset } },
  ] },
  { id: 'coding', color: '#CCF6FF', icon: { asset: grade34Asset }, games: [
    { id: 'code-the-robot', grade: '3-4', difficulty: 'easy', icon: '🤖' },
    { id: 'robot-maze', grade: '3-4', difficulty: 'easy', icon: '🌀' },
    { id: 'code-block-factory', grade: '3-4', difficulty: 'medium', icon: '🏭' },
    { id: 'event-hero', grade: '3-4', difficulty: 'medium', icon: '⚡' },
    { id: 'ifelse-adventure', grade: '3-4', difficulty: 'hard', icon: '🔀' },
    { id: 'code-rescue', grade: '3-4', difficulty: 'hard', icon: '🚑' },
  ] },
  { id: 'creative', color: '#FFD1F3', icon: '🎨', games: [
    { id: 'character-creator', grade: '5-6', difficulty: 'easy', icon: '🧑‍🎨' },
    { id: 'make-it-move', grade: '5-6', difficulty: 'medium', icon: '💃' },
    { id: 'story-quest', grade: '5-6', difficulty: 'hard', icon: '📖' },
    { id: 'mini-game-builder', grade: '5-6', difficulty: 'medium', icon: '🎮' },
    { id: 'score-master', grade: '5-6', difficulty: 'medium', icon: '🏆' },
    { id: 'game-creator', grade: '5-6', difficulty: 'hard', icon: '🌟' },
  ] },
];

const readCompletedGames = () => {
  const completed = getProgress().completedGames;
  return Array.isArray(completed) ? completed : [];
};

function GamesPage({ t }) {
  const { gameId } = useParams();
  const copy = t.gamesPage;
  const [completedGames, setCompletedGames] = useState(readCompletedGames);
  const totalGames = CATEGORIES.reduce((total, category) => total + category.games.length, 0);
  const knownGameIds = new Set(CATEGORIES.flatMap((category) => category.games.map((game) => game.id)));
  const completedCount = new Set(completedGames.filter((id) => knownGameIds.has(id))).size;

  useEffect(() => {
    const refreshProgress = () => setCompletedGames(readCompletedGames());
    window.addEventListener('focus', refreshProgress);
    window.addEventListener('storage', refreshProgress);
    return () => {
      window.removeEventListener('focus', refreshProgress);
      window.removeEventListener('storage', refreshProgress);
    };
  }, []);

  const selectedGame = CATEGORIES.flatMap((category) => category.games)
    .find((game) => game.id === gameId);

  return (
    <main id="main-content" className="games-page">
      <div className="games-page-shell container">
        <section className="games-banner" aria-labelledby="games-title">
          <img className="games-banner-art games-banner-art--left" src={gameIllustration} alt="" aria-hidden="true" />
          <div className="games-banner-content">
            <div className="games-banner-deco" aria-hidden="true">
              <span>🎮</span>
              <img src={grade12Asset} alt="" />
              <span>🏆</span>
            </div>
            <h1 id="games-title" className="games-title">{copy.title}</h1>
            <p className="games-subtitle">{copy.subtitle}</p>
            <div
              className="games-progress"
              role="img"
              aria-label={copy.progressLabel(completedCount, totalGames)}
            >
              <img className="games-progress-star" src={grade12Asset} alt="" aria-hidden="true" />
              <strong>{copy.progressLabel(completedCount, totalGames)}</strong>
              <span className="games-progress-track" aria-hidden="true">
                <span
                  className="games-progress-fill"
                  style={{ width: `${completedCount ? Math.max(4, (completedCount / totalGames) * 100) : 0}%` }}
                />
              </span>
            </div>
          </div>
          <img className="games-banner-art games-banner-art--right" src={mascotIllustration} alt="" aria-hidden="true" />
        </section>

        {selectedGame && !selectedGame.playable && (
          <p className="games-selection-message" role="status">{copy.comingSoonMessage}</p>
        )}

        <div className="games-body">
          {CATEGORIES.map((category) => (
            <section
              key={category.id}
              className="games-category"
              aria-labelledby={`games-category-${category.id}`}
            >
              <div className="games-cat-header">
                <h2
                  id={`games-category-${category.id}`}
                  className="games-cat-title"
                  style={{ '--category-color': category.color }}
                >
                  <span className="games-cat-icon" aria-hidden="true">
                    {category.icon.asset ? (
                      <img src={category.icon.asset} alt="" />
                    ) : category.icon}
                  </span>
                  {copy.categories[category.id]}
                </h2>
                <span className="games-cat-count">
                  {copy.gameCount(category.games.length)}
                </span>
              </div>

              <div className="games-grid">
                {category.games.map((game) => {
                  const gameCopy = copy.content[game.id];
                  const isComplete = completedGames.includes(game.id);
                  const cardContent = (
                    <>
                      <span className="game-card-art" aria-hidden="true">
                        {game.icon.asset ? <img src={game.icon.asset} alt="" /> : game.icon}
                      </span>
                      <span className="game-card-info">
                        <span className="game-card-tags">
                          <span className="game-grade">{copy.grades[game.grade]}</span>
                          <span className={`game-difficulty game-difficulty--${game.difficulty}`}>
                            {copy.difficulties[game.difficulty]}
                          </span>
                        </span>
                        <h3 className="game-card-title">{gameCopy.title}</h3>
                        <span className="game-card-desc">{gameCopy.description}</span>
                        {game.playable ? (
                          <span className="game-action">
                            {isComplete ? copy.playAgain : copy.play}
                          </span>
                        ) : (
                          <span className="game-action game-action--soon">
                            <img src={lockAsset} alt="" aria-hidden="true" />
                            {copy.comingSoon}
                          </span>
                        )}
                      </span>
                    </>
                  );

                  return game.playable ? (
                    <Link
                      key={game.id}
                      to={`/games/${game.id}`}
                      className={`game-card${isComplete ? ' game-card--complete' : ''}`}
                      style={{ '--card-color': category.color }}
                    >
                      {cardContent}
                    </Link>
                  ) : (
                    <article
                      key={game.id}
                      className="game-card game-card--soon"
                      style={{ '--card-color': category.color }}
                    >
                      {cardContent}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default GamesPage;

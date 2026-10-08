import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import HeroStarfield from '../components/Hero/HeroStarfield';
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
import animationPartyAsset from '../assets/Card Animation Party.svg';
import blockBuilderAsset from '../assets/Card Block Builder.svg';
import catMazeAsset from '../assets/Card Cat Maze.svg';
import codeTranslatorAsset from '../assets/Card Code Translator.svg';
import colorStudioAsset from '../assets/Card Color Studio.svg';
import eventArcadeAsset from '../assets/Card Event Arcade.svg';
import functionFactoryAsset from '../assets/Card Function Factory.svg';
import guessTheNumberAsset from '../assets/Card Gues The Number.svg';
import magicPenAsset from '../assets/Card Magic Pen.svg';
import patternAdventureAsset from '../assets/Card Pattern Finder.svg';
import quizMakerAsset from '../assets/Card Quiz Marker.svg';
import webPageMakerAsset from '../assets/Card Web Page Maker.svg';
import variableVaultAsset from '../assets/Variable Vault.svg';
import { getProgress } from '../data/progress';
import GamePlayer from './GamePlayer';
import './GamesPage.css';
import './LearningUnitsPage.css';

const CATEGORIES = [
  { id: 'logic', color: '#C7EF8E', icon: { asset: brainAsset }, games: [
    { id: 'pattern-adventure', grade: '1-2', difficulty: 'easy', icon: { asset: patternAdventureAsset }, artScale: 1.2, artOffsetX: 5, artOffsetY: -5, playable: true },
    { id: 'robot-delivery', grade: '1-2', difficulty: 'easy', icon: { asset: robotDeliveryAsset }, playable: true },
    { id: 'algorithm-quest', grade: '3-4', difficulty: 'medium', icon: { asset: algorithmAsset }, playable: false },
    { id: 'decision-forest', grade: '3-4', difficulty: 'medium', icon: { asset: decisionAsset }, artOffsetX: 3, playable: false },
    { id: 'loop-runner', grade: '5-6', difficulty: 'medium', icon: { asset: loopAsset }, artOffsetY: 4, playable: false },
    { id: 'bug-hunter', grade: '5-6', difficulty: 'hard', icon: { asset: bugHunterAsset }, artOffsetX: 3, playable: false },
  ] },
  { id: 'coding', color: '#CCF6FF', icon: { asset: grade34Asset }, games: [
    { id: 'block-builder', grade: '1-2', difficulty: 'easy', icon: { asset: blockBuilderAsset }, playable: false },
    { id: 'cat-maze', grade: '1-2', difficulty: 'easy', icon: { asset: catMazeAsset }, playable: false },
    { id: 'variable-vault', grade: '3-4', difficulty: 'medium', icon: { asset: variableVaultAsset }, playable: false },
    { id: 'event-arcade', grade: '3-4', difficulty: 'medium', icon: { asset: eventArcadeAsset }, playable: false },
    { id: 'code-translator', grade: '5-6', difficulty: 'medium', icon: { asset: codeTranslatorAsset }, playable: false },
    { id: 'function-factory', grade: '5-6', difficulty: 'hard', icon: { asset: functionFactoryAsset }, artScale: 1.12, playable: false },
  ] },
  { id: 'creative', color: '#FFD1F3', icon: { asset: colorStudioAsset }, games: [
    { id: 'color-studio', grade: '1-2', difficulty: 'easy', icon: { asset: colorStudioAsset }, playable: false },
    { id: 'magic-pen', grade: '1-2', difficulty: 'easy', icon: { asset: magicPenAsset }, artOffsetX: 3, playable: false },
    { id: 'animation-party', grade: '3-4', difficulty: 'medium', icon: { asset: animationPartyAsset }, playable: false },
    { id: 'quiz-maker', grade: '3-4', difficulty: 'medium', icon: { asset: quizMakerAsset }, playable: false },
    { id: 'web-page-maker', grade: '5-6', difficulty: 'medium', icon: { asset: webPageMakerAsset }, playable: false },
    { id: 'guess-the-number', grade: '5-6', difficulty: 'hard', icon: { asset: guessTheNumberAsset }, playable: false },
  ] },
];

const readCompletedGames = () => {
  const completed = getProgress().completedGames;
  return Array.isArray(completed) ? completed : [];
};

function GamesPage({ t }) {
  const { gameId, lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const copy = t.gamesPage;
  const grade = searchParams.get('grade') || '1-2';
  const lang = searchParams.get('lang') || 'id';
  const lessonCategory = {
    'logic-algorithms': 'logic',
    'basic-coding': 'coding',
    'creative-coding': 'creative',
  }[lessonId];
  const isLessonGameList = Boolean(lessonCategory);
  const [completedGames, setCompletedGames] = useState(readCompletedGames);

  useEffect(() => {
    const refreshProgress = () => setCompletedGames(readCompletedGames());
    window.addEventListener('focus', refreshProgress);
    window.addEventListener('storage', refreshProgress);
    return () => {
      window.removeEventListener('focus', refreshProgress);
      window.removeEventListener('storage', refreshProgress);
    };
  }, []);

  const visibleCategories = isLessonGameList
    ? CATEGORIES
      .filter((category) => category.id === lessonCategory)
      .map((category) => ({
        ...category,
        games: category.games.filter((game) => game.grade === grade),
      }))
      .filter((category) => category.games.length > 0)
    : CATEGORIES;

  const selectedGame = visibleCategories.flatMap((category) => category.games)
    .find((game) => game.id === gameId) || CATEGORIES.flatMap((category) => category.games)
    .find((game) => game.id === gameId);
  const visibleGameIds = visibleCategories.flatMap((category) => category.games.map((game) => game.id));
  const totalGames = visibleGameIds.length;
  const completedCount = new Set(completedGames.filter((id) => visibleGameIds.includes(id))).size;

  if (selectedGame?.playable) {
    return <GamePlayer key={gameId} t={t} lang={lang} />;
  }

  if (isLessonGameList) {
    const games = visibleCategories.flatMap((category) => category.games);
    const backLabel = copy.backToLesson;
    const levelLabel = lang === 'en' ? '5 levels' : '5 level';

    return (
      <main id="main-content" className="learning-units-page games-units-page">
        <HeroStarfield className="learning-units-starfield" />
        <div className="learning-units-shell">
          <Link
            className="learning-units-back"
            to={`/lessons/${lessonId}?grade=${encodeURIComponent(grade)}&lang=${encodeURIComponent(lang)}`}
          >
            ← {backLabel}
          </Link>
          {games.length > 0 ? (
            <section
              className="learning-units-grid"
              data-game-count={games.length}
              aria-label={lang === 'en' ? 'Available games' : 'Daftar game'}
            >
              {games.map((game, index) => {
                const gameCopy = copy.content[game.id];
                const isComplete = completedGames.includes(game.id);
                const Card = game.playable ? Link : 'article';
                const gameParams = new URLSearchParams({ lang });
                if (isLessonGameList) {
                  gameParams.set('fromLesson', lessonId);
                  gameParams.set('grade', grade);
                }
                const cardProps = game.playable
                  ? { to: `/games/${game.id}?${gameParams.toString()}` }
                  : {};
                return (
                  <Card
                    {...cardProps}
                    key={game.id}
                    className={`learning-unit-card game-unit-card${game.playable ? '' : ' game-unit-card--soon'}`}
                    style={{ '--unit-color': visibleCategories[0].color }}
                    aria-label={game.playable
                      ? `${index + 1}. ${gameCopy.title}`
                      : `${index + 1}. ${gameCopy.title}, ${copy.comingSoon}`}
                  >
                    <span className="learning-unit-icon" aria-hidden="true">
                      {game.icon.asset ? <img src={game.icon.asset} alt="" loading="lazy" decoding="async" /> : game.icon}
                    </span>
                    <span className="learning-unit-copy">
                      <span className="learning-unit-tags">
                        <span>{copy.grades[game.grade]}</span>
                        <span className={game.difficulty}>
                          {copy.difficulties[game.difficulty]}
                        </span>
                      </span>
                      <span className="learning-unit-title">{index + 1}. {gameCopy.title}</span>
                      <span className="learning-unit-meta">{gameCopy.description}</span>
                      {game.playable ? (
                        <span
                          className="learning-unit-stars"
                          aria-label={`${isComplete ? 3 : 0} ${lang === 'en' ? 'of 3 stars' : 'dari 3 bintang'}`}
                        >
                          {[0, 1, 2].map((star) => (
                            <svg key={star} className={isComplete ? '' : 'is-off'} viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2 3.7-6.2-3.7 1.6-7L2 9.2l7.1-.6z" />
                            </svg>
                          ))}
                        </span>
                      ) : (
                        <span className="game-unit-coming-soon">
                          <img src={lockAsset} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                          {copy.comingSoon}
                        </span>
                      )}
                    </span>
                    {game.playable && <span className="learning-unit-go" aria-hidden="true">→</span>}
                    {game.playable && <span className="game-unit-levels">{levelLabel}</span>}
                  </Card>
                );
              })}
            </section>
          ) : (
            <section className="learning-units-empty" role="status">
              <span aria-hidden="true">🎮</span>
              <h2>{copy.noGamesTitle}</h2>
              <p>{copy.noGamesBody}</p>
            </section>
          )}
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="games-page">
      <div className="games-page-shell container">
        {isLessonGameList && (
          <Link
            className="games-back-link"
            to={`/lessons/${lessonId}?grade=${encodeURIComponent(grade)}&lang=${encodeURIComponent(lang)}`}
          >
            ← {copy.backToLesson}
          </Link>
        )}
        <section className="games-banner" aria-labelledby="games-title">
          <img className="games-banner-art games-banner-art--left" src={gameIllustration} alt="" aria-hidden="true" />
          <div className="games-banner-content">
            <div className="games-banner-deco" aria-hidden="true">
              <span>🎮</span>
              <img src={grade12Asset} alt="" />
              <span>🏆</span>
            </div>
            <h1 id="games-title" className="games-title">
              {isLessonGameList ? copy.chooseGameTitle : copy.title}
            </h1>
            <p className="games-subtitle">
              {isLessonGameList
                ? copy.chooseGameSubtitle(copy.categories[lessonCategory])
                : copy.subtitle}
            </p>
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
          {visibleCategories.map((category) => (
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
                        {game.icon.asset ? <img src={game.icon.asset} alt="" loading="lazy" decoding="async" /> : game.icon}
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
                      style={{
                        '--card-color': category.color,
                        '--game-art-scale': game.artScale || 1,
                        '--game-art-offset-x': `${game.artOffsetX || 0}px`,
                        '--game-art-offset-y': `${game.artOffsetY || 0}px`,
                      }}
                    >
                      {cardContent}
                    </Link>
                  ) : (
                    <article
                      key={game.id}
                      className="game-card game-card--soon"
                      style={{
                        '--card-color': category.color,
                        '--game-art-scale': game.artScale || 1,
                        '--game-art-offset-x': `${game.artOffsetX || 0}px`,
                        '--game-art-offset-y': `${game.artOffsetY || 0}px`,
                      }}
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

import { Link } from 'react-router-dom';
import './GamesPage.css';

const GAMES = [
  // Logic & Algorithms
  { id: 'pattern-adventure', title: 'Pattern Adventure', category: 'Logic', color: '#C7EF8E', icon: '⭐', desc: 'Discover and complete amazing patterns!', comingSoon: false },
  { id: 'robot-delivery', title: 'Robot Delivery', category: 'Logic', color: '#C7EF8E', icon: '🤖', desc: 'Guide the robot to deliver the package!', comingSoon: false },
  { id: 'algorithm-quest', title: 'Algorithm Quest', category: 'Logic', color: '#C7EF8E', icon: '🗺️', desc: 'Solve problems step by step!', comingSoon: true },
  { id: 'decision-forest', title: 'Decision Forest', category: 'Logic', color: '#C7EF8E', icon: '🌲', desc: 'Make smart decisions to find your path!', comingSoon: true },
  { id: 'loop-runner', title: 'Loop Runner', category: 'Logic', color: '#CCF6FF', icon: '🔁', desc: 'Use loops to run faster!', comingSoon: true },
  { id: 'bug-hunter', title: 'Bug Hunter', category: 'Logic', color: '#FFD1F3', icon: '🐞', desc: 'Find and fix all the bugs!', comingSoon: true },
  // Basic Coding
  { id: 'code-the-robot', title: 'Code the Robot', category: 'Coding', color: '#CCF6FF', icon: '🤖', desc: 'Program the robot with code commands!', comingSoon: true },
  { id: 'robot-maze', title: 'Robot Maze', category: 'Coding', color: '#FFD1F3', icon: '🌀', desc: 'Help the robot escape the maze!', comingSoon: true },
  { id: 'code-block-factory', title: 'Code Block Factory', category: 'Coding', color: '#CCF6FF', icon: '🏭', desc: 'Build programs with code blocks!', comingSoon: true },
  { id: 'event-hero', title: 'Event Hero', category: 'Coding', color: '#FFD1F3', icon: '⚡', desc: 'Trigger events to save the day!', comingSoon: true },
  { id: 'ifelse-adventure', title: 'IF/ELSE Adventure', category: 'Coding', color: '#FFD1F3', icon: '🔀', desc: 'Make decisions with IF and ELSE!', comingSoon: true },
  { id: 'code-rescue', title: 'Code Rescue', category: 'Coding', color: '#CCF6FF', icon: '🚑', desc: 'Debug the code and save the day!', comingSoon: true },
  // Creative Coding
  { id: 'character-creator', title: 'Character Creator', category: 'Creative', color: '#FFD1F3', icon: '🎨', desc: 'Design your own coding character!', comingSoon: true },
  { id: 'make-it-move', title: 'Make It Move', category: 'Creative', color: '#C7EF8E', icon: '💃', desc: 'Animate your character with code!', comingSoon: true },
  { id: 'story-quest', title: 'Story Quest', category: 'Creative', color: '#C7EF8E', icon: '📖', desc: 'Create an interactive coding story!', comingSoon: true },
  { id: 'mini-game-builder', title: 'Mini Game Builder', category: 'Creative', color: '#C7EF8E', icon: '🎮', desc: 'Build your very own mini game!', comingSoon: true },
  { id: 'score-master', title: 'Score Master', category: 'Creative', color: '#CCF6FF', icon: '🏆', desc: 'Learn variables by keeping score!', comingSoon: true },
  { id: 'game-creator', title: 'Game Creator', category: 'Creative', color: '#FFD1F3', icon: '🌟', desc: 'Create your ultimate coding game!', comingSoon: true },
];

const CATEGORY_COLORS = {
  Logic: '#C7EF8E',
  Coding: '#CCF6FF',
  Creative: '#FFD1F3',
};

function GamesPage({ t }) {
  const categories = ['Logic', 'Coding', 'Creative'];
  const categoryLabels = {
    Logic: t === t ? 'Logika & Algoritma' : 'Logic & Algorithms',
    Coding: 'Basic Coding',
    Creative: t === t ? 'Coding Kreatif' : 'Creative Coding',
  };

  return (
    <main id="main-content" className="games-page">
      {/* Hero banner */}
      <div className="games-banner">
        <div className="container">
          <div className="games-banner-deco" aria-hidden="true">
            <span>🎮</span>
            <span>⭐</span>
            <span>🏆</span>
          </div>
          <h1 className="games-title">CODING ADVENTURE</h1>
          <p className="games-subtitle">Complete levels, collect stars, and become a Coding Hero!</p>
        </div>
      </div>

      {/* Games by category */}
      <div className="games-body container">
        {categories.map((cat) => (
          <section key={cat} className="games-category" aria-label={categoryLabels[cat]}>
            <div className="games-cat-header">
              <div
                className="games-cat-badge"
                style={{ background: CATEGORY_COLORS[cat] }}
              >
                {categoryLabels[cat]}
              </div>
            </div>

            <div className="games-grid">
              {GAMES.filter((g) => g.category === cat).map((game) => (
                <div
                  key={game.id}
                  className={`game-card${game.comingSoon ? ' coming-soon' : ''}`}
                  style={{ '--card-color': game.color }}
                >
                  <div className="game-card-icon">{game.icon}</div>
                  <h3 className="game-card-title">{game.title}</h3>
                  <p className="game-card-desc">{game.desc}</p>
                  {game.comingSoon ? (
                    <span className="game-soon-badge">🔒 Coming Soon</span>
                  ) : (
                    <Link
                      to={`/games/${game.id}`}
                      className="btn game-play-btn"
                    >
                      PLAY →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default GamesPage;

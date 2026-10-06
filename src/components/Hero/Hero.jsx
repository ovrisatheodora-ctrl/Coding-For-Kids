import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RobotMascot from '../RobotMascot/RobotMascot';
import './Hero.css';

function Hero({ t }) {
  const h = t.hero;
  const titleRef = useRef(null);

  // Simple stagger animation on mount (GSAP-free fallback using CSS classes)
  useEffect(() => {
    const words = titleRef.current?.querySelectorAll('.hero-word');
    words?.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12}s`;
      el.classList.add('animate-in');
    });
  }, [t]);

  return (
    <section className="hero" aria-label="Hero section">
      {/* Decorative BG elements */}
      <div className="hero-bg-deco" aria-hidden="true">
        <span className="bg-deco bg-deco--arrow1">→</span>
        <span className="bg-deco bg-deco--arrow2">↓</span>
        <span className="bg-deco bg-deco--plus1">+</span>
        <span className="bg-deco bg-deco--plus2">+</span>
        <span className="bg-deco bg-deco--star1">⭐</span>
        <span className="bg-deco bg-deco--star2">✦</span>
        <span className="bg-deco bg-deco--star3">✦</span>
        <span className="bg-deco bg-deco--hash">#</span>
        <span className="bg-deco bg-deco--bracket">{'{ }'}</span>
      </div>

      <div className="hero-inner container">
        {/* Left: content */}
        <div className="hero-content">
          <div className="hero-content-panel">
            <div className="hero-badge">
              🎮 &nbsp;Coding for Kids
            </div>

            <h1 className="hero-title" ref={titleRef}>
              {/* Line 1 */}
              <span className="hero-line">
                {h.line1.split(' ').map((w, i) => (
                  <span key={i} className="hero-word">{w}&nbsp;</span>
                ))}
              </span>
              {/* Line 2 — colored word */}
              <span className="hero-line">
                <span className="hero-word hero-word--blossom">{h.line2}</span>
              </span>
              {/* Line 3 */}
              <span className="hero-line">
                {h.line3.split(' ').map((w, i) => {
                  const clean = w.replace('.', '').replace(',', '');
                  const isPlay = clean.toUpperCase() === 'PLAY' || clean.toUpperCase() === 'BERMAIN';
                  const isCreate = clean.toUpperCase() === 'CREATE.' || clean.toUpperCase() === 'CREATE' || clean.toUpperCase() === 'KREATIF.' || clean.toUpperCase() === 'KREATIF';
                  return (
                    <span
                      key={i}
                      className={`hero-word${isPlay ? ' hero-word--summer-sky' : ''}${isCreate ? ' hero-word--sour-apple' : ''}`}
                    >
                      {w}&nbsp;
                    </span>
                  );
                })}
              </span>
            </h1>

            <p className="hero-description">{h.description}</p>

            <div className="hero-buttons">
              <Link to="/lessons" className="btn btn-primary hero-btn-primary">
                {h.btnPrimary}
              </Link>
              <Link to="/lessons" className="btn btn-secondary hero-btn-secondary">
                {h.btnSecondary}
              </Link>
            </div>

            {/* Mini stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">3</span>
                <span className="hero-stat-label">Topik</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">18</span>
                <span className="hero-stat-label">Games</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">7</span>
                <span className="hero-stat-label">Badge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: mascot */}
        <div className="hero-mascot">
          <RobotMascot />
        </div>
      </div>
    </section>
  );
}

export default Hero;

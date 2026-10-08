import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ArrowLabel from '../ArrowLabel';
import RobotMascot from '../RobotMascot/RobotMascot';
import HeroStarfield from './HeroStarfield';
import { scrollToHomeLessons } from '../../utils/scrollToHomeLessons';
import './Hero.css';

function Hero({ t }) {
  const h = t.hero;
  const titleRef = useRef(null);

  // Reveal title words without overriding their individual rotations.
  useEffect(() => {
    const words = titleRef.current?.querySelectorAll('.hero-word');
    words?.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12}s`;
      el.classList.add('animate-in');
    });
  }, [t]);

  return (
    <section className="hero" aria-label="Hero section">
      <HeroStarfield />

      {/* Decorative BG elements */}
      <div className="hero-bg-deco" aria-hidden="true">
        <span className="bg-deco bg-deco--arrow1">→</span>
        <span className="bg-deco bg-deco--arrow2">↓</span>
        <span className="bg-deco bg-deco--plus1">+</span>
        <span className="bg-deco bg-deco--plus2">+</span>
        <span className="bg-deco bg-deco--hash">#</span>
        <span className="bg-deco bg-deco--bracket">{'{ }'}</span>
      </div>

      <div className="hero-inner container">
        {/* Left: content */}
        <div className="hero-content hero-stage">
          <div className="hero-card-tilt">
            <div className="hero-card-shape">
              <i className="hero-card-layer hero-card-layer--shade" aria-hidden="true" />
              <i className="hero-card-layer hero-card-layer--edge" aria-hidden="true" />
              <section className="hero-content-panel">
                <h1 className="hero-title" ref={titleRef}>
                  <span className="hero-line hero-line--learn">
                    <span className="hero-word">{h.line1}</span>
                  </span>
                  <span className="hero-line hero-line--code">
                    <span className="hero-word">{h.line2}</span>
                  </span>
                  <span className="hero-line hero-line--play-create">
                    {h.line3.split(' ').map((w, i) => {
                      const clean = w.replace('.', '').replace(',', '');
                      const isPlay = clean.toUpperCase() === 'PLAY' || clean.toUpperCase() === 'BERMAIN';
                      const isCreate = clean.toUpperCase() === 'CREATE' || clean.toUpperCase() === 'KREATIF';
                      return (
                        <span
                          key={i}
                          className={`hero-word${isPlay ? ' hero-word--play' : ''}${isCreate ? ' hero-word--create' : ''}`}
                        >
                          {w}
                        </span>
                      );
                    })}
                  </span>
                  <span className="hero-line hero-line--fun">
                    <span className="hero-word">{h.line4}</span>
                  </span>
                </h1>

                <p className="hero-description">{h.description}</p>

                <div className="hero-buttons">
                  <Link
                    to="/#lessons"
                    className="btn btn-primary hero-btn-primary"
                    onClick={(event) => {
                      if (window.location.pathname === '/') {
                        event.preventDefault();
                        scrollToHomeLessons();
                      }
                    }}
                  >
                    <ArrowLabel>{h.btnPrimary}</ArrowLabel>
                  </Link>
                  <Link to="/lessons" className="btn btn-secondary hero-btn-secondary">
                    <ArrowLabel>{h.btnSecondary}</ArrowLabel>
                  </Link>
                </div>
              </section>
            </div>
          </div>

          <svg className="hero-sticker hero-sticker--star1" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2 15 8.6 22 9.2 16.6 14l1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.2l7-.6z" fill="var(--banana)" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <svg className="hero-sticker hero-sticker--star2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2 15 8.6 22 9.2 16.6 14l1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.2l7-.6z" fill="var(--banana)" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <svg className="hero-sticker hero-sticker--star3" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2 15 8.6 22 9.2 16.6 14l1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.2l7-.6z" fill="var(--banana)" stroke="#111111" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <svg className="hero-sticker hero-sticker--badge" viewBox="0 0 80 80" aria-hidden="true">
            <rect x="6" y="8" width="68" height="66" rx="12" fill="#111111" />
            <rect x="3" y="4" width="68" height="66" rx="12" fill="#FFD1F3" stroke="#111111" strokeWidth="3" />
            <path d="m28 27-11 12 11 12m22-24 11 12-11 12M44 23l-9 33" fill="none" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="hero-sticker hero-sticker--cursor" viewBox="0 0 60 60" aria-hidden="true">
            <path d="m12 8 36 18-15 5-5 15z" fill="#111111" transform="translate(3 3)" />
            <path d="m12 8 36 18-15 5-5 15z" fill="#CCF6FF" stroke="#111111" strokeWidth="3" strokeLinejoin="round" />
            <path d="m33 31 9 12" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <svg className="hero-sticker hero-sticker--plus" viewBox="0 0 100 100" aria-hidden="true">
            <path d="M36 4h28v32h32v28H64v32H36V64H4V36h32z" fill="#111111" transform="translate(-6 6)" />
            <path d="M36 4h28v32h32v28H64v32H36V64H4V36h32z" fill="#C7EF8E" stroke="#111111" strokeWidth="3" strokeLinejoin="round" />
          </svg>
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

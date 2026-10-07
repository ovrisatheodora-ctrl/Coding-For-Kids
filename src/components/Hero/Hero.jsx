import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RobotMascot from '../RobotMascot/RobotMascot';
import './Hero.css';

const heroStars = [
  { x: 10.5, y: 6, size: 26, rotate: -14, fill: '#8BCB8B', line: '#3E8E41' },
  { x: 16.6, y: 8, size: 20, rotate: 20, fill: '#8BCB8B', line: '#3E8E41' },
  { x: 5.5, y: 14, size: 52, rotate: -12, fill: '#8BCB8B', line: '#3E8E41', hatched: true },
  { x: 9, y: 24, size: 28, rotate: 12, fill: '#FFD27A', line: '#E8A100' },
  { x: 5, y: 29, size: 42, rotate: -8, fill: '#FFC24B', line: '#E8A100' },
  { x: 7.5, y: 38, size: 28, rotate: 15, fill: '#6FA6EE', line: '#2F6FD0' },
  { x: 5, y: 47, size: 46, rotate: 25, fill: '#5B9BE8', line: '#2F6FD0' },
  { x: 8, y: 55, size: 26, rotate: -10, fill: '#B79BDD', line: '#7B55B5' },
  { x: 5.2, y: 64, size: 50, rotate: 18, fill: '#B79BDD', line: '#7B55B5', hatched: true },
  { x: 8.4, y: 71, size: 24, rotate: -20, fill: '#F28C80', line: '#D6392B' },
  { x: 4.6, y: 77, size: 34, rotate: 10, fill: '#F28C80', line: '#D6392B' },
  { x: 4.8, y: 84, size: 26, rotate: -15, fill: '#6CCFC4', line: '#1FA79B' },
  { x: 7.3, y: 92, size: 42, rotate: 22, fill: '#6CCFC4', line: '#1FA79B' },
  { x: 13.4, y: 94, size: 20, rotate: -8, fill: '#6CCFC4', line: '#1FA79B' },
  { x: 15.9, y: 8, size: 20, rotate: 12, fill: '#6CCFC4', line: '#1FA79B', right: true },
  { x: 10.4, y: 6, size: 22, rotate: -18, fill: '#6CCFC4', line: '#1FA79B', right: true },
  { x: 5, y: 9, size: 40, rotate: 8, fill: '#6CCFC4', line: '#1FA79B', right: true },
  { x: 5, y: 19, size: 30, rotate: -15, fill: '#8BCB8B', line: '#3E8E41', right: true },
  { x: 8, y: 26, size: 46, rotate: 20, fill: '#8BCB8B', line: '#3E8E41', right: true },
  { x: 4.7, y: 33, size: 28, rotate: -10, fill: '#FFD27A', line: '#E8A100', right: true },
  { x: 7, y: 40, size: 38, rotate: 14, fill: '#FFC24B', line: '#E8A100', right: true },
  { x: 4.9, y: 48, size: 26, rotate: -12, fill: '#6FA6EE', line: '#2F6FD0', right: true },
  { x: 7.4, y: 57, size: 40, rotate: 20, fill: '#5B9BE8', line: '#2F6FD0', right: true },
  { x: 5.6, y: 63, size: 24, rotate: -8, fill: '#F28C80', line: '#D6392B', right: true },
  { x: 6.7, y: 74, size: 40, rotate: 16, fill: '#F28C80', line: '#D6392B', right: true },
  { x: 5.2, y: 83, size: 24, rotate: -14, fill: '#8AD3F3', line: '#2DA0DB', right: true },
  { x: 7, y: 90.5, size: 46, rotate: 10, fill: '#8AD3F3', line: '#2DA0DB', right: true, hatched: true },
  { x: 12, y: 93.6, size: 18, rotate: -6, fill: '#8AD3F3', line: '#2DA0DB', right: true },
];

const starShape = 'M50 6 L61.8 35.8 L91.8 38.4 L68.1 57.9 L77.6 90 L50 73 L24.7 86.8 L32.9 57.6 L7.2 38.1 L38.2 35.8 Z';

const STAR_SIDE_LAYOUT = {
  left: { insetScale: 0.65, verticalOffset: -4 },
  right: { insetScale: 0.5, verticalOffset: -2 },
};

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
      <div className="hero-edge-background" aria-hidden="true">
        {heroStars.map((star, index) => {
          const clipId = `hero-star-clip-${index}`;
          const sideLayout = star.right ? STAR_SIDE_LAYOUT.right : STAR_SIDE_LAYOUT.left;
          const positionStyle = {
            [star.right ? 'right' : 'left']: `${star.x * sideLayout.insetScale}%`,
            top: `${Math.max(star.y + sideLayout.verticalOffset, 0)}%`,
            '--star-size': `${star.size}px`,
            '--star-rotate': `${star.rotate}deg`,
            '--star-fill': star.fill,
            '--star-line': star.line,
          };

          return (
            <svg
              className={`hero-paper-star${star.right ? ' hero-paper-star--right' : ''}`}
              key={`${star.x}-${star.y}-${index}`}
              viewBox="0 0 100 100"
              style={positionStyle}
            >
              {star.hatched && (
                <defs>
                  <clipPath id={clipId}>
                    <path d={starShape} />
                  </clipPath>
                </defs>
              )}
              <path
                d={starShape}
                fill={star.fill}
                stroke={star.hatched ? 'none' : star.line}
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {star.hatched && (
                <>
                  <g clipPath={`url(#${clipId})`} stroke={star.line} strokeWidth="2" opacity="0.55">
                    <path d="M0 24H100M0 36H100M0 48H100M0 60H100M0 72H100M0 84H100" />
                  </g>
                  <path d={starShape} fill="none" stroke={star.line} strokeWidth="3.5" strokeLinejoin="round" />
                </>
              )}
            </svg>
          );
        })}
      </div>

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
                  <Link to="/lessons" className="btn btn-primary hero-btn-primary">
                    {h.btnPrimary}
                  </Link>
                  <Link to="/lessons" className="btn btn-secondary hero-btn-secondary">
                    {h.btnSecondary}
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

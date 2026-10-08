import './HeroStarfield.css';

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

function HeroStarfield({ className = 'hero-edge-background' }) {
  return (
    <div className={className} aria-hidden="true">
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
  );
}

export default HeroStarfield;

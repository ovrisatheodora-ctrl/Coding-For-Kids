import './PastelBackdrop.css';

const SPARKLES = [
  { x: 52, y: 1, size: 28, delay: 0.2 },
  { x: 88, y: 3, size: 44, delay: 1.1 },
  { x: 19, y: 14, size: 22, delay: 0.7 },
  { x: 4, y: 21, size: 26, delay: 1.8 },
  { x: 19, y: 26, size: 16, delay: 2.4 },
  { x: 77, y: 14, size: 24, delay: 0.4, large: true },
  { x: 7, y: 82, size: 24, delay: 1.3, large: true },
  { x: 88, y: 90, size: 22, delay: 0.9, large: true },
  { x: 85, y: 93, size: 20, delay: 1.6 },
  { x: 97, y: 94, size: 26, delay: 0.3 },
  { x: 4, y: 97, size: 34, delay: 2.1 },
  { x: 67, y: 96, size: 30, delay: 1 },
  { x: 17, y: 91, size: 12, delay: 2.8 },
];

function PastelBackdrop() {
  return (
    <div className="pastel-backdrop" aria-hidden="true">
      <svg className="pastel-backdrop__symbols" xmlns="http://www.w3.org/2000/svg">
        <symbol id="pastel-small-sparkle" viewBox="0 0 24 24">
          <path d="M12 0C12.7 8 16 11.3 24 12 16 12.7 12.7 16 12 24 11.3 16 8 12.7 0 12 8 11.3 11.3 8 12 0z" />
        </symbol>
        <symbol id="pastel-large-sparkle" viewBox="0 0 96 96">
          <path d="M48 36C48.4 43 53 47.6 60 48 53 48.4 48.4 53 48 60 47.6 53 43 48.4 36 48 43 47.6 47.6 43 48 36z" />
          <circle cx="48" cy="48" r="5" />
          <g fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity=".75">
            <path d="M8 8L88 88M88 8L8 88M48 4V92M4 48H92" />
          </g>
        </symbol>
      </svg>
      {SPARKLES.map((sparkle) => (
        <svg
          className={`pastel-backdrop__sparkle${sparkle.large ? ' pastel-backdrop__sparkle--large' : ''}`}
          key={`${sparkle.x}-${sparkle.y}`}
          viewBox={sparkle.large ? '0 0 96 96' : '0 0 24 24'}
          style={{
            '--sparkle-x': `${sparkle.x}%`,
            '--sparkle-y': `${sparkle.y}%`,
            '--sparkle-size': `${sparkle.size}px`,
            '--sparkle-delay': `${sparkle.delay}s`,
          }}
        >
          <use href={sparkle.large ? '#pastel-large-sparkle' : '#pastel-small-sparkle'} />
        </svg>
      ))}
    </div>
  );
}

export default PastelBackdrop;

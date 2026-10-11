import { useRef, useEffect } from 'react';
import './Ribbon.css';

function Ribbon({ text }) {
  const items = text.split('✦').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="ribbon-wrapper" aria-label="Animated text ribbon" role="marquee">
      {/* Two copies of ribbon-content are rendered for seamless CSS marquee loop */}
      <div className="ribbon-track">
        {[0, 1].map((copy) => (
          <div className="ribbon-content" key={copy} aria-hidden={copy === 1 || undefined}>
            {items.map((item, i) => (
              <span key={i} className="ribbon-item">
                {item}
                <span className="ribbon-sep" aria-hidden="true">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ribbon;

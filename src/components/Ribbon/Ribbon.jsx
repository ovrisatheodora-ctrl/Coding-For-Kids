import { useLayoutEffect, useRef, useState } from 'react';
import './Ribbon.css';

function Ribbon({ text }) {
  const wrapperRef = useRef(null);
  const firstContentRef = useRef(null);
  const [copies, setCopies] = useState(2);
  const [shift, setShift] = useState('-50%');
  const items = text.split('✦').map((s) => s.trim()).filter(Boolean);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = firstContentRef.current;
    if (!wrapper || !content) return undefined;

    // Use ResizeObserver contentRect directly — avoids forced synchronous layout
    // that happens when reading offsetWidth/getBoundingClientRect after mutations.
    let wrapperWidth = 0;
    let contentWidth = 0;

    const recalc = () => {
      if (!contentWidth || !wrapperWidth) return;
      setCopies(Math.max(2, Math.ceil(wrapperWidth / contentWidth) + 1));
      setShift(`-${contentWidth}px`);
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (!w) continue;
        if (entry.target === wrapper) wrapperWidth = w;
        if (entry.target === content) contentWidth = w;
      }
      recalc();
    });

    observer.observe(wrapper);
    observer.observe(content);
    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={wrapperRef} className="ribbon-wrapper" aria-label="Animated text ribbon" role="marquee">
      <div className="ribbon-track" style={{ '--ribbon-shift': shift }}>
        {Array.from({ length: copies }, (_, copy) => (
          <div
            className="ribbon-content"
            key={copy}
            ref={copy === 0 ? firstContentRef : undefined}
            aria-hidden={copy > 0 || undefined}
          >
            {items.map((item, i) => (
              <span key={i} className="ribbon-item">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ribbon;

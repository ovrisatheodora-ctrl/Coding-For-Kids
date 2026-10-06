import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Ribbon.css';

function Ribbon({ text }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate content for seamless loop
    const clone = track.firstElementChild?.cloneNode(true);
    if (clone) track.appendChild(clone);

    const singleWidth = track.firstElementChild?.offsetWidth || 0;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    tweenRef.current = gsap.to(track, {
      x: -singleWidth,
      duration: singleWidth / 90, // speed ≈ 90px/s
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % singleWidth),
      },
    });

    const wrapper = track.parentElement;
    const pause  = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.play();

    wrapper?.addEventListener('mouseenter', pause);
    wrapper?.addEventListener('mouseleave', resume);

    return () => {
      tweenRef.current?.kill();
      wrapper?.removeEventListener('mouseenter', pause);
      wrapper?.removeEventListener('mouseleave', resume);
    };
  }, [text]);

  const items = text.split('✦').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="ribbon-wrapper" aria-label="Animated text ribbon" role="marquee">
      <div className="ribbon-track" ref={trackRef}>
        <div className="ribbon-content">
          {items.map((item, i) => (
            <span key={i} className="ribbon-item">
              {item}
              <span className="ribbon-sep" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ribbon;

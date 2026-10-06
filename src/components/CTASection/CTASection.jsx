import { Link } from 'react-router-dom';
import './CTASection.css';

function CTASection({ t }) {
  const { headline, description, btn } = t.cta;
  const lines = headline.split('\n');

  return (
    <section className="cta-section" id="cta" aria-label="Call to action">
      {/* Decorative bg doodles */}
      <div className="cta-deco" aria-hidden="true">
        <span className="cta-deco-item cta-deco-item--star1">⭐</span>
        <span className="cta-deco-item cta-deco-item--star2">✦</span>
        <span className="cta-deco-item cta-deco-item--star3">💫</span>
        <span className="cta-deco-item cta-deco-item--plus1">+</span>
        <span className="cta-deco-item cta-deco-item--plus2">+</span>
        <span className="cta-deco-item cta-deco-item--arrow">→</span>
        <span className="cta-deco-item cta-deco-item--code">{'</>'}</span>
      </div>

      <div className="cta-inner container">
        <h2 className="cta-headline">
          {lines.map((line, i) => (
            <span key={i} className="cta-headline-line">{line}</span>
          ))}
        </h2>
        <p className="cta-description">{description}</p>
        <Link to="/lessons" className="btn btn-primary cta-btn">
          {btn}
        </Link>
      </div>
    </section>
  );
}

export default CTASection;

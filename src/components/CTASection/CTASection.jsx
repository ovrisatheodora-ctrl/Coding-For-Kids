import { Link } from 'react-router-dom';
import { scrollToHomeLessons } from '../../utils/scrollToHomeLessons';
import './CTASection.css';

function CTASection({ t }) {
  const { headline, description, btn } = t.cta;

  return (
    <section className="cta-section" id="cta">
      <div className="cta-inner container">
        <div className="cta-deco" aria-hidden="true">
          <span className="cta-deco-item cta-deco-item--star1">★</span>
          <span className="cta-deco-item cta-deco-item--star2">★</span>
          <span className="cta-deco-item cta-deco-item--star3">★</span>
          <span className="cta-deco-item cta-deco-item--star4">★</span>
          <span className="cta-deco-item cta-deco-item--star5">★</span>
        </div>
        <h2 className="cta-headline">{headline}</h2>
        <p className="cta-description">{description}</p>
        <Link
          to="/#lessons"
          className="btn cta-btn"
          onClick={(event) => {
            if (window.location.pathname === '/') {
              event.preventDefault();
              scrollToHomeLessons();
            }
          }}
        >
          {btn}
        </Link>
      </div>
    </section>
  );
}

export default CTASection;

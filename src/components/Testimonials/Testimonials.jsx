import './Testimonials.css';

import user1 from '../../assets/user1.webp';
import user2 from '../../assets/user2.webp';
import user3 from '../../assets/user3.webp';
import user4 from '../../assets/user4.webp';
import user5 from '../../assets/user5.webp';
import user6 from '../../assets/user6.webp';
import user7 from '../../assets/user7.webp';
import user8 from '../../assets/user8.webp';
import user9 from '../../assets/user9.webp';
import user10 from '../../assets/user10.webp';

const AVATARS = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];
const COLORS = ['#C7EF8E', '#CCF6FF', '#FFD1F3'];

function TestimonialCard({ card, color, ratingLabel }) {
  return (
    <article className="testimonial-card" style={{ '--card-color': color }}>
      <div className="testimonial-header">
        <img
          className="testimonial-avatar"
          src={card.image}
          alt=""
          aria-hidden="true"
          width="60"
          height="60"
          loading="lazy"
        />
        <div className="testimonial-author">
          <span className="testimonial-name">{card.name}</span>
          <span className="testimonial-role">{card.role}</span>
        </div>
        <div className="testimonial-stars" role="img" aria-label={ratingLabel}>
          ★★★★★
        </div>
      </div>

      <p className="testimonial-quote">{card.quote}</p>
    </article>
  );
}

function TestimonialMarquee({ cards, duration, ratingLabel, reverse = false }) {
  if (!cards.length) return null;
  const loopCards = [...cards, ...cards];

  return (
    <div className={`testimonial-marquee${reverse ? ' testimonial-marquee--reverse' : ''}`}>
      <div
        className="testimonial-marquee-track"
        style={{ '--duration': `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div
            className="testimonial-marquee-group"
            key={copy}
            aria-hidden={copy === 1 || undefined}
          >
            {loopCards.map((card, index) => (
              <TestimonialCard
                key={`${copy}-${index}-${card.name}`}
                card={card}
                color={COLORS[index % COLORS.length]}
                ratingLabel={ratingLabel}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials({ t }) {
  const { sectionTitle, sectionSubtitle, cards, ratingLabel } = t.testimonials;

  const prepared = cards.map((card, index) => ({
    ...card,
    image: card.image || AVATARS[index % AVATARS.length],
  }));
  const middle = Math.ceil(prepared.length / 2);
  const rows = [prepared.slice(0, middle), prepared.slice(middle)];

  return (
    <section
      className="testimonials-section section-pad"
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <div className="testimonials-header">
          <span className="testimonials-deco testimonials-deco--left" aria-hidden="true">✦</span>
          <h2
            className="section-title testimonials-title-anim"
            id="testimonials-title"
          >
            {sectionTitle}
          </h2>
          <span className="testimonials-deco testimonials-deco--right" aria-hidden="true">↗</span>
          <p className="section-subtitle testimonials-subtitle">{sectionSubtitle}</p>
        </div>
      </div>

      <div className="testimonials-marquees">
        <TestimonialMarquee cards={rows[0]} duration={40} ratingLabel={ratingLabel} />
        <TestimonialMarquee
          cards={rows[1]}
          duration={40}
          ratingLabel={ratingLabel}
          reverse
        />
      </div>
    </section>
  );
}

export default Testimonials;
import { motion, useReducedMotion } from 'motion/react';
import './Testimonials.css';

import user1 from '../../assets/user1.svg';
import user2 from '../../assets/user2.svg';
import user3 from '../../assets/user3.svg';
import user4 from '../../assets/user4.svg';
import user5 from '../../assets/user5.svg';
import user6 from '../../assets/user6.svg';
import user7 from '../../assets/user7.svg';
import user8 from '../../assets/user8.svg';
import user9 from '../../assets/user9.svg';
import user10 from '../../assets/user10.svg';

const AVATARS = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];
const COLORS = ['#C7EF8E', '#CCF6FF', '#FFD1F3'];

function TestimonialCard({ card, color, ratingLabel }) {
  return (
    <article className="testimonial-card" style={{ '--card-color': color }}>
      <img
        className="testimonial-avatar"
        src={card.image}
        alt=""
        aria-hidden="true"
        width="60"
        height="60"
        loading="lazy"
      />
      <p className="testimonial-quote">{card.quote}</p>

      <div className="testimonial-footer">
        <div className="testimonial-author">
          <span className="testimonial-name">{card.name}</span>
          <span className="testimonial-role">{card.role}</span>
        </div>
        <div className="testimonial-stars" role="img" aria-label={ratingLabel}>
          ★★★★★
        </div>
      </div>
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
  const { sectionTitle, cards, ratingLabel } = t.testimonials;
  const shouldReduceMotion = useReducedMotion();

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
          <motion.h2
            className="section-title"
            id="testimonials-title"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {sectionTitle}
          </motion.h2>
          <span className="testimonials-deco testimonials-deco--right" aria-hidden="true">↗</span>
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
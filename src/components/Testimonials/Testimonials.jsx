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

// Jumlah salinan isi kolom. Harus sama dengan angka di CSS (-100% / COPIES)
const COPIES = 4;

function TestimonialCard({ card, color }) {
  return (
    <article className="testimonial-card" style={{ '--card-color': color }}>
      <p className="testimonial-quote">{card.quote}</p>

      <div className="testimonial-footer">
        <img
          className="testimonial-avatar"
          src={card.image}
          alt={`Foto profil ${card.name}`}
          width="44"
          height="44"
          loading="lazy"
        />
        <div className="testimonial-author">
          <span className="testimonial-name">{card.name}</span>
          <span className="testimonial-role">{card.role}</span>
        </div>
        <div className="testimonial-stars" role="img" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }, (_, star) => (
            <svg key={star} viewBox="0 0 20 20" aria-hidden="true">
              <path d="m10 1.5 2.5 5.2 5.7.8-4.1 4 .9 5.7-5-2.7-5 2.7.9-5.7-4.1-4 5.7-.8Z" />
            </svg>
          ))}
        </div>
      </div>
    </article>
  );
}

function TestimonialsColumn({ cards, colOffset, duration, className = '' }) {
  if (!cards.length) return null;

  // Samakan jumlah kartu jadi kelipatan 3 (review boleh berulang),
  // supaya urutan warna tetap berselang-seling sampai ke sambungan loop
  const items = [...cards];
  for (let i = 0; items.length % COLORS.length !== 0; i++) {
    items.push(cards[i % cards.length]);
  }

  return (
    <div className={`testimonials-column ${className}`}>
      <div
        className="testimonials-column-track"
        style={{ '--duration': `${duration}s` }}
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            className="testimonials-column-group"
            key={copy}
            aria-hidden={copy > 0 || undefined}
          >
            {items.map((card, row) => (
              <TestimonialCard
                key={`${copy}-${row}-${card.name}`}
                card={card}
                color={COLORS[(row + colOffset) % COLORS.length]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials({ t }) {
  const { sectionTitle, cards } = t.testimonials;
  const shouldReduceMotion = useReducedMotion();

  // Beri foto user1-10 ke tiap kartu
  const prepared = cards.map((card, index) => ({
    ...card,
    image: card.image || AVATARS[index % AVATARS.length],
  }));

  // Bagi ke 3 kolom bergantian
  const columns = [0, 1, 2].map((col) => prepared.filter((_, i) => i % 3 === col));

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

        <div className="testimonials-columns">
          <TestimonialsColumn cards={columns[0]} colOffset={0} duration={12} />
          <TestimonialsColumn
            cards={columns[1]}
            colOffset={1}
            duration={15}
            className="testimonials-column--md"
          />
          <TestimonialsColumn
            cards={columns[2]}
            colOffset={2}
            duration={13}
            className="testimonials-column--lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
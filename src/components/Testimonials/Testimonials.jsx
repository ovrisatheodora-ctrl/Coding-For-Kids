import './Testimonials.css';

// Optimized avatar pairs: [60w src, 120w for 2× screens]
import u1_60 from '../../assets/optimized/user1-60w.webp';
import u1_120 from '../../assets/optimized/user1-120w.webp';
import u2_60 from '../../assets/optimized/user2-60w.webp';
import u2_120 from '../../assets/optimized/user2-120w.webp';
import u3_60 from '../../assets/optimized/user3-60w.webp';
import u3_120 from '../../assets/optimized/user3-120w.webp';
import u4_60 from '../../assets/optimized/user4-60w.webp';
import u4_120 from '../../assets/optimized/user4-120w.webp';
import u5_60 from '../../assets/optimized/user5-60w.webp';
import u5_120 from '../../assets/optimized/user5-120w.webp';
import u6_60 from '../../assets/optimized/user6-60w.webp';
import u6_120 from '../../assets/optimized/user6-120w.webp';
import u7_60 from '../../assets/optimized/user7-60w.webp';
import u7_120 from '../../assets/optimized/user7-120w.webp';
import u8_60 from '../../assets/optimized/user8-60w.webp';
import u8_120 from '../../assets/optimized/user8-120w.webp';
import u9_60 from '../../assets/optimized/user9-60w.webp';
import u9_120 from '../../assets/optimized/user9-120w.webp';
import u10_60 from '../../assets/optimized/user10-60w.webp';
import u10_120 from '../../assets/optimized/user10-120w.webp';

// Each entry: { src, srcSet } — used for responsive avatar delivery
const AVATARS = [
  { src: u1_60,  srcSet: `${u1_60} 60w, ${u1_120} 120w` },
  { src: u2_60,  srcSet: `${u2_60} 60w, ${u2_120} 120w` },
  { src: u3_60,  srcSet: `${u3_60} 60w, ${u3_120} 120w` },
  { src: u4_60,  srcSet: `${u4_60} 60w, ${u4_120} 120w` },
  { src: u5_60,  srcSet: `${u5_60} 60w, ${u5_120} 120w` },
  { src: u6_60,  srcSet: `${u6_60} 60w, ${u6_120} 120w` },
  { src: u7_60,  srcSet: `${u7_60} 60w, ${u7_120} 120w` },
  { src: u8_60,  srcSet: `${u8_60} 60w, ${u8_120} 120w` },
  { src: u9_60,  srcSet: `${u9_60} 60w, ${u9_120} 120w` },
  { src: u10_60, srcSet: `${u10_60} 60w, ${u10_120} 120w` },
];
const COLORS = ['#C7EF8E', '#CCF6FF', '#FFD1F3'];

function TestimonialCard({ card, color, ratingLabel }) {
  return (
    <article className="testimonial-card" style={{ '--card-color': color }}>
      <div className="testimonial-header">
        <img
          className="testimonial-avatar"
          src={card.image}
          srcSet={card.imageSrcSet || undefined}
          sizes="60px"
          alt=""
          aria-hidden="true"
          width="60"
          height="60"
          loading="lazy"
          decoding="async"
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

  const prepared = cards.map((card, index) => {
    const avatar = AVATARS[index % AVATARS.length];
    return {
      ...card,
      image: card.image || avatar.src,
      imageSrcSet: card.imageSrcSet || avatar.srcSet,
    };
  });
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
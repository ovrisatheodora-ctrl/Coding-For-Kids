import { Link } from 'react-router-dom';
import logo84 from '../../assets/optimized/logo-84w.webp';
import logo162 from '../../assets/optimized/logo-162w.webp';
import instagramLogo72 from '../../assets/optimized/instagram-72w.webp';
import instagramLogo144 from '../../assets/optimized/instagram-144w.webp';
import linkedInLogo72 from '../../assets/optimized/linkedin-72w.webp';
import linkedInLogo144 from '../../assets/optimized/linkedin-144w.webp';
import whatsAppLogo72 from '../../assets/optimized/whatsapp-72w.webp';
import whatsAppLogo144 from '../../assets/optimized/whatsapp-144w.webp';
import starAsset72 from '../../assets/optimized/ios-star-72w.webp';
import starAsset144 from '../../assets/optimized/ios-star-144w.webp';
import './Footer.css';

const FOOTER_LINKS = [
  { path: '/', icon: 'home' },
  { path: '/lessons', icon: 'lessons' },
  { path: '/games', icon: 'games' },
  { path: '/about', icon: 'about' },
];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', image: linkedInLogo72, srcSet: `${linkedInLogo72} 72w, ${linkedInLogo144} 144w`, href: 'https://www.linkedin.com/in/theodora-ovrisa-7221743b0?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { name: 'WhatsApp', image: whatsAppLogo72, srcSet: `${whatsAppLogo72} 72w, ${whatsAppLogo144} 144w`, href: 'https://wa.me/qr/GTMR553NN4DEC1' },
  { name: 'Instagram', image: instagramLogo72, srcSet: `${instagramLogo72} 72w, ${instagramLogo144} 144w`, href: 'https://www.instagram.com/theodoraovri?rpxt=dHF2ZzNkeGdpcjdk' },
];

function FooterNavIcon({ icon }) {
  const paths = {
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 9.5V21h5v-6h4v6h5V9.5" /></>,
    lessons: <><path d="M12 6C10 4.5 7 4 3 4v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2Z" /><path d="M12 6v14" /></>,
    games: <><path d="M7 7h10a5 5 0 0 1 4.8 6.4l-.8 3a2.8 2.8 0 0 1-5.5.6l-1-2h-5l-1 2a2.8 2.8 0 0 1-5.5-.6l-.8-3A5 5 0 0 1 7 7Z" /><path d="M8 10v3m-1.5-1.5h3" /><path d="M16 10.5h.01M18 12.5h.01" /></>,
    about: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6m0-10h.01" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}

function Footer({ t, lang, onLangChange }) {
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner container">
        <div className="footer-grid">
          <div className="footer-column footer-brand">
            <Link to="/" className="footer-brand-lockup">
              <img
                src={logo84}
                srcSet={`${logo84} 84w, ${logo162} 162w`}
                sizes="84px"
                alt=""
                width="84"
                height="84"
                loading="lazy"
                decoding="async"
              />
              <span className="footer-logo">
                <span>{f.logo}</span>
                <span>{f.logoLine2}</span>
              </span>
            </Link>
            <p className="footer-tagline">
              <img
                className="footer-tagline-star"
                src={starAsset72}
                srcSet={`${starAsset72} 72w, ${starAsset144} 144w`}
                sizes="26px"
                alt=""
                aria-hidden="true"
                width="72"
                height="72"
                loading="lazy"
                decoding="async"
              />
              {f.tagline}
            </p>
          </div>

          <nav className="footer-column footer-nav" aria-label={f.exploreLabel}>
            <h2 className="footer-heading footer-heading--explore">{f.exploreLabel}</h2>
            <ul>
              {FOOTER_LINKS.map(({ path, icon }, index) => (
                <li key={path}>
                  <Link to={path} className="footer-link">
                    <FooterNavIcon icon={icon} />
                    {f.links[index]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-column footer-language">
            <h2 className="footer-heading footer-heading--language">{f.langLabel}</h2>
            <div className="footer-language-options" role="group" aria-label={f.langLabel}>
              <button
                className={`footer-lang-btn${lang === 'id' ? ' active' : ''}`}
                type="button"
                onClick={() => onLangChange('id')}
                aria-pressed={lang === 'id'}
              >
                <span aria-hidden="true">🇮🇩</span>
                <b>ID</b>
              </button>
              <button
                className={`footer-lang-btn${lang === 'en' ? ' active' : ''}`}
                type="button"
                onClick={() => onLangChange('en')}
                aria-pressed={lang === 'en'}
              >
                <span aria-hidden="true">🇬🇧</span>
                <b>EN</b>
              </button>
            </div>
          </div>

          <div className="footer-column footer-connect">
            <h2 className="footer-heading footer-heading--connect">{f.connectLabel}</h2>
            <div className="footer-socials">
              {SOCIAL_LINKS.map(({ name, image, srcSet, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className={`footer-social footer-social--${name.toLowerCase()}`}
                >
                  <img
                    src={image}
                    srcSet={srcSet}
                    sizes="48px"
                    alt=""
                    aria-hidden="true"
                    width="72"
                    height="72"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} {f.copyright}
          </p>
          <div className="footer-decorations" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6Z" />
            </svg>
            <svg viewBox="0 0 28 24">
              <path d="m9 6-6 6 6 6m10-12 6 6-6 6M16 4l-4 16" />
            </svg>
            <svg viewBox="0 0 28 24">
              <path d="M8 9v8M4 13h8M21 3v6m-3-3h6" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

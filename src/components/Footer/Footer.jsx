import { Link } from 'react-router-dom';
import './Footer.css';

function Footer({ t, lang, onLangChange }) {
  const f = t.footer;

  const linkPaths = ['/', '/lessons', '/games', '/about'];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner container">
        {/* Logo + tagline */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            {f.logo} <span>⭐</span>
          </Link>
          <p className="footer-tagline">{f.tagline}</p>
        </div>

        {/* Nav links */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <ul>
            {f.links.map((link, i) => (
              <li key={i}>
                <Link to={linkPaths[i] || '/'} className="footer-link">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language selector */}
        <div className="footer-lang">
          <span className="footer-lang-label">{f.langLabel}</span>
          <div className="footer-lang-btns">
            <button
              className={`footer-lang-btn${lang === 'id' ? ' active' : ''}`}
              onClick={() => onLangChange('id')}
              aria-pressed={lang === 'id'}
            >
              🇮🇩 ID
            </button>
            <button
              className={`footer-lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => onLangChange('en')}
              aria-pressed={lang === 'en'}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copy">{f.copyright}</p>
          <div className="footer-badges" aria-hidden="true">
            <span>🎮</span>
            <span>💻</span>
            <span>🎨</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

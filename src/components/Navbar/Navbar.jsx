import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ t, lang, onLangChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.lessons, to: '/lessons' },
    { label: t.nav.games, to: '/games' },
    { label: t.nav.about, to: '/about' },
  ];

  return (
    <header className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`} role="banner">
      <nav className="navbar" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="Coding for Kids Home">
          <span className="navbar-logo-text">{t.nav.logo}</span>
          <span className="navbar-logo-star" aria-hidden="true">⭐</span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar-links" role="list">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `navbar-link${isActive ? ' active' : ''}`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="navbar-right">
          <button
            className="lang-toggle"
            onClick={() => onLangChange(lang === 'id' ? 'en' : 'id')}
            aria-label={`Switch to ${lang === 'id' ? 'English' : 'Bahasa Indonesia'}`}
          >
            {lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
          </button>

          <button
            className="btn btn-purple navbar-cta"
            onClick={() => navigate('/lessons')}
            aria-label={t.nav.startLearning}
          >
            {t.nav.startLearning}
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `mobile-link${isActive ? ' active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                className="btn btn-purple mobile-cta"
                onClick={() => { setMenuOpen(false); navigate('/lessons'); }}
              >
                {t.nav.startLearning}
              </button>
            </li>
            <li>
              <button
                className="lang-toggle"
                onClick={() => { onLangChange(lang === 'id' ? 'en' : 'id'); setMenuOpen(false); }}
              >
                {lang === 'id' ? '🇮🇩 Bahasa Indonesia' : '🇬🇧 English'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ArrowLabel from '../ArrowLabel';
import logo from '../../assets/Logo_Coding.png';
import { scrollToHomeLessons } from '../../utils/scrollToHomeLessons';
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

  const handleStartLearning = () => {
    if (!scrollToHomeLessons()) {
      navigate('/#lessons');
    }
  };

  return (
    <header className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`} role="banner">
      <nav className="navbar" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="Coding for Kids Home">
          <img src={logo} alt="" aria-hidden="true" />
          <span className="navbar-logo-text">{t.nav.logo}</span>
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
            className="navbar-cta"
            onClick={handleStartLearning}
            aria-label={t.nav.startLearning}
          >
            <ArrowLabel>{t.nav.startLearning}</ArrowLabel>
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
                onClick={() => { setMenuOpen(false); handleStartLearning(); }}
              >
                <ArrowLabel>{t.nav.startLearning}</ArrowLabel>
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
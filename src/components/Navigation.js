import React, { useState, useEffect } from 'react';
import './Nav.css';

const NAV_ITEMS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Education',  href: '#education' },
];

function smoothScrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">

        <a
          href="#hero"
          className="nav__logo"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}
        >
          <span className="nav__logo-text">SHA</span>
        </a>

        <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`nav__link ${active === item.href.slice(1) ? 'nav__link--active' : ''}`}
                onClick={e => handleClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="mailto:syedhamzaali978@gmail.com" className="btn btn-primary nav__cta">
              Contact
            </a>
          </li>
        </ul>

        <button
          className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>

      </div>
    </nav>
  );
}

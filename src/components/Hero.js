import React, { useState, useEffect } from 'react';
import './Hero.css';
import data from '../data/portfolio.json';

const ROLES = data.personal.roles;

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12l7 7 7-7"/>
  </svg>
);

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed]  = useState('');
  const [typing, setTyping]        = useState(true);
  const [charIdx, setCharIdx]      = useState(0);

  useEffect(() => {
    const current = ROLES[roleIndex];
    if (typing) {
      if (charIdx < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(i => i + 1);
        }, 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(i => i - 1);
        }, 32);
        return () => clearTimeout(t);
      } else {
        setRoleIndex(i => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [charIdx, typing, roleIndex]);

  const scrollToProjects = e => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = e => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      {/* Main content */}
      <div className="hero__content">
        <div className="hero__label fade-in-up" style={{ animationDelay: '0.05s' }}>
          <span className="hero__dot" />
          Open to full-time opportunities
        </div>

        <h1 className="hero__name fade-in-up" style={{ animationDelay: '0.15s' }}>
          Syed Hamza Ali
        </h1>

        <div className="hero__role fade-in-up" style={{ animationDelay: '0.25s' }}>
          <span className="hero__role-text">{displayed}</span>
          <span className="hero__cursor">|</span>
        </div>

        <p className="hero__bio fade-in-up" style={{ animationDelay: '0.35s' }}>
          Harvard Data Science graduate building end-to-end intelligent systems —
          from PySpark pipelines and fine-tuned LLMs to production MLOps and quantitative research.
        </p>

        <div className="hero__actions fade-in-up" style={{ animationDelay: '0.45s' }}>
          <a href="#projects" className="btn btn-primary" onClick={scrollToProjects}>
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="mailto:syedhamzaali978@gmail.com" className="btn btn-outline">
            Get in Touch
          </a>
        </div>

        <div className="hero__socials fade-in-up" style={{ animationDelay: '0.55s' }}>
          <a href="https://github.com/shamzaali7" target="_blank" rel="noreferrer" className="hero__social-link">
            <GitHubIcon /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/hamza-ali7/" target="_blank" rel="noreferrer" className="hero__social-link">
            <LinkedInIcon /> LinkedIn
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero__stats fade-in-up" style={{ animationDelay: '0.65s' }}>
        {data.stats.map((s, i) => (
          <div key={i} className="hero__stat">
            <span className="hero__stat-value">{s.value}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <a href="#about" className="hero__scroll-cue" onClick={scrollToAbout} aria-label="Scroll down">
        <ArrowDownIcon />
      </a>
    </section>
  );
}

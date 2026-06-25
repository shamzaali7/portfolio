import React from 'react';
import './Projects.css';
import data from '../data/portfolio.json';

const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const DocIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-card__top-bar" />

      <div className="project-card__header">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
      </div>

      <p className="project-card__desc">{project.description}</p>

      {project.doi && (
        <a href={project.links.doi} target="_blank" rel="noreferrer" className="project-card__doi-badge">
          📄 {project.doi} · Harvard Dataverse
        </a>
      )}

      <div className="project-card__metrics">
        {project.metrics.map((m, i) => (
          <div key={i} className="project-metric">
            <span className="project-metric__value">{m.value}</span>
            <span className="project-metric__label">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="project-card__tags">
        {project.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="project-card__links">
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noreferrer" className="project-link">
            <ExternalLinkIcon /> Live Demo
          </a>
        )}
        {project.links.repo && (
          <a href={project.links.repo} target="_blank" rel="noreferrer" className="project-link">
            <GitHubIcon /> GitHub
          </a>
        )}
        {project.links.doi && (
          <a href={project.links.doi} target="_blank" rel="noreferrer" className="project-link">
            <DocIcon /> Harvard Dataverse
          </a>
        )}
        {project.links.huggingface && (
          <a href={project.links.huggingface} target="_blank" rel="noreferrer" className="project-link">
            🤗 Hugging Face
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section-wrap" id="projects">
      <div className="section-header">
        <span className="section-label">What I've Built</span>
        <h2 className="section-title">Featured <span>Projects</span></h2>
      </div>

      <div className="projects__grid">
        {data.projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

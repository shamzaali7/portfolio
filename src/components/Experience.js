import React from 'react';
import './Experience.css';
import data from '../data/portfolio.json';

export default function Experience() {
  return (
    <section className="section-wrap" id="experience">
      <div className="section-header">
        <span className="section-label">Work History</span>
        <h2 className="section-title">Professional <span>Experience</span></h2>
      </div>

      <div className="timeline">
        {data.experience.map((job, i) => (
          <div key={i} className="timeline__item">
            <div className="timeline__marker">
              <div className="timeline__dot" />
              {i < data.experience.length - 1 && <div className="timeline__line" />}
            </div>

            <div className="timeline__card">
              <div className="timeline__header">
                <div className="timeline__title-group">
                  <h3 className="timeline__role">{job.role}</h3>
                  <div className="timeline__company">{job.company}</div>
                </div>
                <div className="timeline__meta">
                  <span className="badge">{job.start} – {job.end}</span>
                  <span className="timeline__location">{job.type}</span>
                </div>
              </div>

              <ul className="timeline__bullets">
                {job.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import './Education.css';
import data from '../data/portfolio.json';

export default function Education() {
  return (
    <section className="section-wrap" id="education">
      <div className="section-header">
        <span className="section-label">Academic Background</span>
        <h2 className="section-title">Education & <span>Certifications</span></h2>
      </div>

      <div className="edu__grid">
        {data.education.map((edu, i) => (
          <div key={i} className="edu-card">
            <div className="edu-card__avatar">{edu.abbr}</div>
            <div className="edu-card__body">
              <h3 className="edu-card__school">{edu.school}</h3>
              <p className="edu-card__degree">{edu.degree}</p>
              <div className="edu-card__meta">
                <span className="badge">{edu.graduated}</span>
                <span className="edu-card__location">{edu.location}</span>
              </div>
              {edu.coursework.length > 0 && (
                <div className="edu-card__coursework">
                  <p className="edu-card__cw-label">Relevant Coursework</p>
                  <div className="edu-card__cw-tags">
                    {edu.coursework.map(c => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="certifications">
        <h3 className="certifications__heading">Certifications</h3>
        <div className="certifications__grid">
          {data.certifications.map((cert, i) => (
            <div key={i} className="cert-card">
              <div className="cert-card__issuer">{cert.issuer}</div>
              <div className="cert-card__name">{cert.name}</div>
              {cert.date && <div className="cert-card__date">{cert.date}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

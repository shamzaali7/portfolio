import React from 'react';
import './Skills.css';
import data from '../data/portfolio.json';

export default function Skills() {
  return (
    <section className="section-wrap" id="skills">
      <div className="section-header">
        <span className="section-label">Capabilities</span>
        <h2 className="section-title">Technical <span>Skills</span></h2>
      </div>

      <div className="skills__grid">
        {data.skills.map(category => (
          <div key={category.category} className="skill-cat">
            <div className="skill-cat__header">
              <span className="skill-cat__icon">{category.icon}</span>
              <h3 className="skill-cat__name">{category.category}</h3>
            </div>
            <div className="skill-cat__items">
              {category.items.map(skill => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

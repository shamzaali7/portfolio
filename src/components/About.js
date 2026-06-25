import React from 'react';
import './About.css';

export default function About() {
  return (
    <section className="section-wrap" id="about">
      <div className="section-header">
        <span className="section-label">Background</span>
        <h2 className="section-title">About <span>Me</span></h2>
      </div>

      <div className="about__layout">
        <div className="about__text-col">
          <p>
            I'm a Harvard Data Science graduate with a passion for building intelligent systems that solve real problems at scale. My background spans the full ML lifecycle — from raw data ingestion and feature engineering all the way to model training, evaluation, and production deployment.
          </p>
          <p>
            Currently I work as an AI/ML Evaluation Engineer at DataAnnotation (SurgeAI), where I benchmark frontier LLMs and multi-step coding agents for clients including Google. My graduate research culminated in a quantitative finance capstone published to the Harvard Dataverse — a Bitcoin exposure & risk forecasting framework that compressed max drawdown from -67% to -21% vs. buy-and-hold.
          </p>
          <p>
            I'm fluent in Python, SQL, R, and Scala, and have shipped production code across the full stack — from PySpark data pipelines on Databricks to BERT models served via Dockerized FastAPI to MERN full-stack applications.
          </p>
          <p>
            I'm actively seeking full-time roles in AI/ML engineering, data science, and quantitative research where I can apply deep technical skills to impactful, high-stakes problems.
          </p>
        </div>

        <div className="about__highlights-col">
          <div className="about__highlight">
            <span className="about__hl-icon">🎓</span>
            <div className="about__hl-body">
              <strong>Harvard University</strong>
              <span>M.L.A. in Data Science · May 2026</span>
            </div>
          </div>
          <div className="about__highlight">
            <span className="about__hl-icon">💼</span>
            <div className="about__hl-body">
              <strong>DataAnnotation (SurgeAI)</strong>
              <span>AI/ML Evaluation Engineer · Present</span>
            </div>
          </div>
          <div className="about__highlight">
            <span className="about__hl-icon">📍</span>
            <div className="about__hl-body">
              <strong>Location</strong>
              <span>Westford, MA · Open to Remote</span>
            </div>
          </div>
          <div className="about__highlight">
            <span className="about__hl-icon">🏆</span>
            <div className="about__hl-body">
              <strong>Certifications</strong>
              <span>MIT · General Assembly · ZTM</span>
            </div>
          </div>
          <div className="about__highlight">
            <span className="about__hl-icon">🌐</span>
            <div className="about__hl-body">
              <strong>Languages</strong>
              <span>English · Urdu · Hindi · Punjabi · Arabic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

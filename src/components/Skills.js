import React from 'react';
import "./Skills.css"

function Skills(){
    return(
        <div className="skills">
            <div className="buff"><span className="">Skills</span></div>
            <div className="box-skills">
                <div className="buff"></div>
                <div className="display-skills">
                    <div className="holder-skills about-description">
                    <p><h6 className="skill-type"><span className="names">LANGUAGES</span> </h6> Javascript, SQL, Python, HTML, CSS, Java</p>
                    <p><h6 className="skill-type"><span className="names">PROFICIENCIES</span></h6> Full-Stack Web Development, Front-End Web Development, Back-End Web Development, React, Node.js, Express, MongoDB, NoSQL, SQL, Django, Git, Mocha, Chai, Heroku, Vercel, Fly, Github Pages, Postgres, Database Architecture, Data Structures, Algorithms, Version Control, REST API, Linux/Unix, Optimization, Agile Scrum Team, Data Analysis, Web Scraping</p> 
                    <p><h6 className="skill-type"><span className="names">TOOLS</span> </h6> Microsoft Excel, Microsoft Word, Microsoft PowerPoint, Windows 10, Github, zsh, Slack</p>
                    <p><h6 className="skill-type"><span className="names">INTERPERSONAL LANGUAGES</span> </h6> Fluent in Urdu, English, Hindi, Conversational in Punjabi and Spanish, and literate in Arabic</p>
                    </div>
                </div>
                <div className="buff"></div>
            </div>
            <div className="buff"></div>
        </div>
    )
}

export default Skills;
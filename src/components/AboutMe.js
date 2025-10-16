import React from 'react';
import "./AboutMe.css";
import { usePortfolioData } from '../context/DataContext';

function AboutMe(){
    const { aboutMe, personal } = usePortfolioData();
    
    return(
        <div className="about-me">
            <div className="buff">About Me</div>
            <div className="container-about-me">
                <div></div>
                <div className="about-des">
                    {aboutMe.sections.map((section, index) => (
                        <div 
                            key={section.id} 
                            className={`about-description ${index % 2 === 0 ?'mr-6' : 'ml-6'} about-des-box`}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{section.content}
                        </div>
                    ))}
                </div>
                <div></div>
            </div>
            <div className="contact-form">
                <span>
                    <div className="about-request">Contact Me!</div>
                    <div>
                        <a href={`mailto:${personal.email}`}>
                            <img 
                                className="mail-img" 
                                alt="mail icon" 
                                src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/null/external-mail-interface-kiranshastry-gradient-kiranshastry.png"
                            />
                        </a>
                    </div>
                    <div></div>
                </span>
            </div>
            <div></div>
        </div>
    )
}

export default AboutMe;
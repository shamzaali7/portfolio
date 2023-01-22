import React from 'react';
import "./AboutMe.css"

function AboutMe(){
    return(
        <div className="about-me">
            <div className="buff"></div>
            <div className="container-about-me">
                <div></div>
                <div className="about-des about-description"><span>About Description</span></div>
                <div></div>
            </div>
            <div className="contact-form"><span>
                <div className="about-request">Contact Me!</div>
                <div>
                    <a href="mailto:hamzaali7@yahoo.com">
                        <img className="mail-img" src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/null/external-mail-interface-kiranshastry-gradient-kiranshastry.png"/>
                    </a>
                </div>
                <div></div>
            </span></div>
            <div></div>
        </div>
    )
}

export default AboutMe;
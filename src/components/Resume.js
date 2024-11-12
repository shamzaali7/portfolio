import React from 'react';
import "./Resume.css"
import resumeImg1 from '../images/Res pdf1.png';
import resumeImg2 from '../images/Res pdf2.png';


function Resume(){
    return(
        <div className="resume">
            <div></div>
            <div className="resume-d">
                <img src={resumeImg1} className="resume-img" alt="resume1/2"/>
                <img src={resumeImg2} className="resume-img" alt="resume2/2"/>
            </div>
            <div></div>
        </div>
    )
}

export default Resume;
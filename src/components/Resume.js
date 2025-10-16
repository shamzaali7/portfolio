import React from 'react';
import "./Resume.css";
import { usePortfolioData } from '../context/DataContext';

// Import resume images dynamically
import resumeImg1 from '../images/Res_pdf1.png';
import resumeImg2 from '../images/Res_pdf2.png';

function Resume(){
    const { resume } = usePortfolioData();
    const resumeImages = [resumeImg1, resumeImg2]; 
    
    return(
        <div className="resume">
            <div></div>
            <div className="resume-d">
                {resumeImages.map((img, index) => (
                    <img 
                        key={index}
                        src={img} 
                        className="resume-img" 
                        alt={`resume${index + 1}/${resume.images.length}`}
                    />
                ))}
            </div>
            <div></div>
        </div>
    )
}

export default Resume;
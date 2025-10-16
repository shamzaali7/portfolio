import React from 'react';
import "./Skills.css";
import { usePortfolioData } from '../context/DataContext';

function Skills(){
    const { skills } = usePortfolioData();
    
    return(
        <div className="skills">
            <div className="buff"><span className="">Skills</span></div>
            <div className="box-skills">
                <div className="buff"></div>
                <div className="display-skills">
                    <div className="holder-skills about-description">
                        {skills.categories.map((category, index) => (
                            <p key={index}>
                                <h6 className="skill-type">
                                    <span className="names">{category.type}</span>
                                </h6> 
                                {category.items.join(", ")}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="buff"></div>
            </div>
            <div className="buff"></div>
        </div>
    )
}

export default Skills;
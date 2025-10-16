import React from 'react';
import "./Footer.css";
import { BsGithub } from 'react-icons/bs';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { usePortfolioData } from '../context/DataContext';

function Footer(){
    const { personal } = usePortfolioData();
    
    return (
        <div className="container-footer">
            <div className="box-links">
                <div className="creator"><span className="sp-creator"></span>Contact Me</div>
                <div className="links">
                    <a href={personal.social.github} target="_blank" rel="noreferrer">
                        <BsGithub/>
                    </a>
                </div>
                <div className="links">
                    <a href={personal.social.linkedin} target="_blank" rel="noreferrer">
                        <AiOutlineLinkedin/>
                    </a>
                </div>
                <div className="links">
                    <a href={`mailto:${personal.email}`} rel="noreferrer">
                        <img 
                            className="w-4 h-4" 
                            alt="mail-icon" 
                            src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/32/null/external-mail-interface-kiranshastry-gradient-kiranshastry.png"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
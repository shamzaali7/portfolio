import React from 'react'
import "./Footer.css"
import { BsGithub } from 'react-icons/bs';
import { AiOutlineLinkedin } from 'react-icons/ai';

function Footer(){

    return (
        <div className="container-footer">
            <div className="box-links">
                <div className="creator"><span className="sp-creator"></span>Contact Me</div>
                <div className="links"><a href="https://github.com/shamzaali7" target="_blank" rel="noreferrer"><BsGithub/></a></div>
                <div className="links"><a href="https://www.linkedin.com/in/hamza-ali7/" target="_blank" rel="noreferrer">< AiOutlineLinkedin/></a></div>
                <div className="links"><a href="mailto:hamzaali7@yahoo.com" rel="noreferrer"><img className="w-4 h-4" alt="mail-icon" src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/32/null/external-mail-interface-kiranshastry-gradient-kiranshastry.png"/></a></div>
            </div>
        </div>
    );
}

export default Footer;
import React from 'react';
import {Link} from 'react-router-dom';
import "./Nav.css"

function Navigation(){
    return(
        <div className="Nav">
            <Link to="/" >
                <div>Home</div>
            </Link>
            <Link to="/projects" >
                <div>Projects</div>
            </Link>
            <Link to="/skills" >
                <div>Skills</div>
            </Link>
            <Link to="/resume" >
                <div>Resume</div>
            </Link>
            <Link to="/about-me" >
                <div>About Me</div>
            </Link>
        </div>
    )
}

export default Navigation;
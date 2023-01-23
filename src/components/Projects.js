import React from 'react';
import "./Projects.css";

function Projects(){
    return(
        <div className="projects">
            <h1 className="project-title">Projects</h1>
            <div className="container-projects">
            <div className="container-one">
                <div className="container-des">
                    <div></div>
                    <div className="project-pic-one ml-5">
                        <img src="https://i.imgur.com/YONhaHV.png" className="pic" alt="Pic of Proshare"/>
                    </div>
                    <div></div>
                </div>
                <div className="last container-des">
                    <div></div>
                    <div className="des about-description">
                        <span className="project-des">
                            <p className="skill-type names">PROSHARE</p>
                            <p>
                                A project sharing platform for developers containing full CRUD functionality and a google-auth based user model joining a front-end built in Javascript and CSS through React on a GitHub Repository, and deployed on AWS Amplify and Netlify incorporating CI/CD. Includes a back-end built in Node.js and Express on a GitHub repository, connected to a MongoDB database and deployed on Heroku.
                            </p>
                            <p><a className="text-lime-400" href="https://main.d2onbrm7luopll.amplifyapp.com" target="_blank" rel="noreferrer">Front-End Deployed |</a>	<a className="text-lime-400" href="https://github.com/shamzaali7/proshare-frontend" target="_blank" rel="noreferrer">Repository</a></p>
                            <p><a className="text-lime-400" href="https://proshare-backend.herokuapp.com/api/projects" target="_blank" rel="noreferrer">Back-End Deployed |</a> <a className="text-lime-400" href="https://github.com/shamzaali7/proshare-backend" target="_blank" rel="noreferrer">Repository</a></p>
                        </span>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="container-two">
                <div className="container-des">
                    <div></div>
                    <div className="des about-description">
                        <span className="project-des">
                            <p className="skill-type names">THE CONNECTIONS KEEPER</p>
                            <p>
                                A virvtual rolodex with a contact interface allowing full CRUD functionality joining a front-end built in Javascript and CSS through React on a GitHub Repository, and deployed on Vercel incorporating CI/CD. Includes a back-end built in Node.js and Express on a GitHub repository, connected to a MongoDB database and deployed on Heroku. 
                            </p>
                            <p><a className="text-lime-400" href="https://connection-frontend-api.vercel.app/main" target="_blank" rel="noreferrer">Front-End Deployed |</a><a className="text-lime-400" href="https://github.com/shamzaali7/connection-frontend-api" target="_blank" rel="noreferrer"> Repository</a></p>
                            <p><a className="text-lime-400" href="https://connection-backend-api.herokuapp.com/api/contact" target="_blank" rel="noreferrer">Back-End Deployed |</a> <a className="text-lime-400" href="https://github.com/shamzaali7/connection-backend-api" target="_blank" rel="noreferrer">Repository</a></p>
                        </span>
                    </div>
                    <div></div>
                </div>
                <div className="container-des">
                    <div></div>
                    <div className="project-pic-two mr-5 last">
                        <img src="https://i.imgur.com/l2w1dzt.png" className="pic" alt="Pic of Connections App"/>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="container-three">
                <div className="container-des">
                    <div></div>
                    <div className="project-pic-three ml-5">
                        <img src="https://i.imgur.com/KtrcGdU.png" className="pic" alt="Pic of NBA Comparison App"/>
                    </div>
                    <div></div>
                </div>
                <div className="last container-des">
                    <div></div>
                    <div className="des about-description">
                        <span className="project-des">
                            <p className="skill-type names">NBA STAT COMPARISON</p>
                            <p>
                                A player comparison app with updated stats incorporating the use of links and routes, and calling REST API’s. Built in Javascript and CSS through React on a GitHub repository, and deployed on Vercel incorporating CI/CD.
                            </p>
                            <p><a className="text-lime-400" href="https://nba-stat-comparison.vercel.app/" target="_blank" rel="noreferrer">Front-End Deployed |</a><a className="text-lime-400" href="https://github.com/shamzaali7/nba-stat-comparison" target="_blank"rel="noreferrer"> Repository</a></p>
                        </span>
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="container-four">
                <div className="container-des">
                    <div></div>
                    <div className="des about-description">
                        <span className="project-des">
                            <p className="skill-type names">SPACEMAN</p>
                            <p>
                                A user-friendly hangman game incorporating audio effects and local storage built in vanilla Javascript, CSS, and HTML through Visual Studio Code on a GitHub repository, and deployed on Github Pages incorporating CI/CD.
                            </p>
                            <p><a className="text-lime-400" href="https://shamzaali7.github.io/spaceman/" target="_blank" rel="noreferrer">Front-End Deployed |</a><a className="text-lime-400" href="https://github.com/shamzaali7/spaceman" target="_blank" rel="noreferrer"> Repository</a></p>
                        </span>
                    </div>
                    <div></div>
                </div>
                <div className="container-des">
                    <div></div>
                    <div className="project-pic-four mr-5 mb-5 last">
                        <img src="https://i.imgur.com/36kenBY.png" className="pic" alt="Pic of Spaceman" target="_blank" rel="noreferrer"/>
                    </div>
                    <div></div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Projects;
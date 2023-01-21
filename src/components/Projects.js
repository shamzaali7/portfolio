import React from 'react';
import "./Projects.css";

function Projects(){
    return(
        <div className="projects">
            <h1 className="project-title">Projects</h1>
            <div className="container-projects">
            <div className="container-one">
                <div className="project-pic-one ml-5">
                    <img src="https://i.imgur.com/YONhaHV.png" className="pic"/>
                </div>
                <div className="last">
                    <span className="project-des about-description">
                        Info on project pic one
                    </span>
                </div>
            </div>
            <div className="container-two">
                <div>
                    <span className="project-des about-description">
                        Info on project pic two
                    </span>
                </div>
                <div className="project-pic-two mr-5 last">
                    <img src="https://i.imgur.com/l2w1dzt.png" className="pic"/>
                </div>
            </div>
            <div className="container-three">
                <div className="project-pic-three ml-5">
                    <img src="https://i.imgur.com/KtrcGdU.png" className="pic"/>
                </div>
                <div className="last">
                    <span className="project-des about-description">
                        Info on project pic three
                    </span>
                </div>
            </div>
            <div className="container-four">
                <div>
                    <span className="project-des about-description">
                        Info on project pic four
                    </span>
                </div>
                <div className="project-pic-four mr-5 mb-5 last">
                    <img src="https://i.imgur.com/36kenBY.png" className="pic"/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Projects;
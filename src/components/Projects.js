import React from 'react';
import "./Projects.css";
import { usePortfolioData } from '../context/DataContext';

function ProjectCard({ project, index }) {
    const containerClass = `container-${['one', 'two', 'three', 'four'][index]}`;
    const isImageLeft = project.imagePosition === 'left';
    
    const imageSection = (
        <div className="container-des">
            <div></div>
            <div className={`project-pic-${['one', 'two', 'three', 'four'][index]} ${isImageLeft ? 'ml-5' : 'mr-5'} ${!isImageLeft ? 'last' : ''}`}>
                <img src={project.image} className="pic" alt={`Pic of ${project.title}`}/>
            </div>
            <div></div>
        </div>
    );
    
    const descriptionSection = (
        <div className={`${isImageLeft ? 'last' : ''} container-des`}>
            <div></div>
            <div className="des about-description">
                <span className="project-des">
                    <p className="skill-type names">{project.title}</p>
                    <p>{project.description}</p>
                    {project.links.frontendDeploy && (
                        <p>
                            <a className="text-lime-400" href={project.links.frontendDeploy} target="_blank" rel="noreferrer">
                                Front-End Deployed |
                            </a>
                            <a className="text-lime-400" href={project.links.frontendRepo} target="_blank" rel="noreferrer">
                                {" "}Repository
                            </a>
                        </p>
                    )}
                    {project.links.backendDeploy && (
                        <p>
                            <a className="text-lime-400" href={project.links.backendDeploy} target="_blank" rel="noreferrer">
                                Back-End Deployed |
                            </a>
                            <a className="text-lime-400" href={project.links.backendRepo} target="_blank" rel="noreferrer">
                                {" "}Repository
                            </a>
                        </p>
                    )}
                </span>
            </div>
            <div></div>
        </div>
    );
    
    return (
        <div className={containerClass}>
            {isImageLeft ? imageSection : descriptionSection}
            {isImageLeft ? descriptionSection : imageSection}
        </div>
    );
}

function Projects(){
    const { projects } = usePortfolioData();
    
    return(
        <div className="projects">
            <h1 className="project-title">Projects</h1>
            <div className="container-projects">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </div>
    )
}

export default Projects;
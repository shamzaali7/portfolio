import React from 'react';
import "./Home.css"

function Home(){
    return(
        <div className="home">
            <div className="home-title mt-10">
                <div className=""></div>
                <div><span className="text-2xl ml-20 name">Syed Hamza Ali</span></div>
                <div></div>
            </div>
            <div className="home-title">
                <div className=""></div>
                <div><span className="change-margin-title text-xs mt-1 name">Junior Software Engineer</span></div>
                <div></div>
            </div>
            <div className="home-picture">
                <div className="buff left"></div>
                <div className="pic">
                    <img src="https://i.imgur.com/hod9FLD.jpg" className="pro-pic image-holder"/>
                </div>
                <div>
                    <h4 className="paragraph">
                        I’m an adaptive full-stack software engineer with knowledge in front-end and back-end development. I have a passion for coding and have completed multiple projects and  certifications in the field from highschool to college that have further developed my technical knowledge. My motivation to pursue this passion was rekindled after taking a Java course last summer and realizing I really enjoy and feel comfortable with coding and all of its aspects. I aspire to pursue an occupation that can assist and progress my understanding of building scalable cloud applications.
                    </h4>
                </div>
                <div className="buff"></div>
            </div>
        </div>
    )
}

export default Home;
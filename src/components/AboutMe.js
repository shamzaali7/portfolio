import React from 'react';
import "./AboutMe.css"

function AboutMe(){
    return(
        <div className="about-me">
            <div className="buff">About Me</div>
            <div className="container-about-me">
                <div></div>
                <div className="about-des">
                    <div className="about-description mr-6 about-des-box">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My first introduction to code was when I enrolled in a computer science course my freshman year of highschool. The main language used was Visual-Basic. In my junior year of highschool I took a Java course that presented to me a more commonly used language and the basic concepts that surround it such as if/switch statements, for/while loops, and functions. This helped build my knowledge of perceiving and understanding code at an early stage and was a good segue into higher-level programming.</div>
                    <div className="about-description ml-6 about-des-box">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The second semester of my freshman year of college I enrolled into a computer science class that taught Java at an upper level. It served as a refresher of the basics as well as introducing class based components and object-oriented programming. This was an important stage in the development of my programming fundamentals.</div>
	                <div className="about-description mr-6 about-des-box">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the summer of 2022, I took a Udemy course on Java that was the perfect refresher to bring me back to pace with everything I had previously learned. The course furthered my knowledge of object oriented programming, and was also my first introduction to API’s and making simple fetch requests. It also provided me with an optimal level of preparation and was a perfect segue into the next step of my pursuit of building a career in software engineering.</div>
	                <div className="about-description ml-6 about-des-box">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;04 October, 2022, I enrolled into a software engineering bootcamp hosted by General Assembly. It was a 3 month long bootcamp with over 420 hours of hands-on experience with the software development lifecycle, full-stack development, multiple languages, frameworks/libraries, version-control system, object-oriented programming, API requests, JSON data, Databases, and other various technologies and deployment platforms. I am confident in my ability to use what I have learned and apply it in a production level setting.</div> 
                </div>
                <div></div>
            </div>
            <div className="contact-form"><span>
                <div className="about-request">Contact Me!</div>
                <div>
                    <a href="mailto:hamzaali7@yahoo.com">
                        <img className="mail-img" alt="mail icon" src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/null/external-mail-interface-kiranshastry-gradient-kiranshastry.png"/>
                    </a>
                </div>
                <div></div>
            </span></div>
            <div></div>
        </div>
    )
}

export default AboutMe;
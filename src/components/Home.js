import React from 'react';
import "./Home.css";
import { usePortfolioData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

function Home(){
    const { personal } = usePortfolioData();
    const navigate = useNavigate();
    
    const handleSecretClick = () => {
        navigate('/secret-game');
    };
    
    return(
        <div className="home">
            <div className="home-title mt-10">
                <div className=""></div>
                <div className="item-title">
                    <span className="text-2xl ml-20 name">{personal.name}</span>
                </div>
                <div></div>
            </div>
            <div className="home-title">
                <div className=""></div>
                <div className="item-title">
                    <span className="change-margin-title text-xs mt-1 name">{personal.title}</span>
                </div>
                <div></div>
            </div>
            <div className="home-picture">
                <div className="buff left"></div>
                <div className="profile-pic">
                    <img 
                        src={personal.profileImage} 
                        className="pro-pic image-holder about-description" 
                        alt={personal.name}
                    />
                </div>
                <div className="box-paragraph">
                    <h4 className="paragraph">{personal.bio}</h4>
                </div>
                <div className="buff"></div>
            </div>
            <button 
                className="secret-game-button" 
                onClick={handleSecretClick}
                aria-hidden="true"
                title="🎮"
            />
        </div>
    )
}

export default Home;
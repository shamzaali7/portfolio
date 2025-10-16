import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import AboutMe from './components/AboutMe';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PlatformerGame from './components/Game/PlatformerGame';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/secret-game" element={<PlatformerGame />} />
        <Route path="*" element={
          <>
            <Navigation/>
            <Footer/>
            <main>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/skills" element={<Skills/>}/>
                <Route path="/resume" element={<Resume/>}/>
                <Route path="/about-me" element={<AboutMe/>}/>
              </Routes>
            </main>
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;

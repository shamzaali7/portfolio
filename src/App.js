import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import AboutMe from './components/AboutMe';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/skills" element={<Skills/>}/>
          <Route path="/resume" element={<Resume/>}/>
          <Route path="/about-me" element={<AboutMe/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;

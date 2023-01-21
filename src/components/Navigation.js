import React, { useState } from "react";
import {Link} from 'react-router-dom'

function Navigation() {

    const [show, setShow] = useState(null);
    const [profile, setProfile] = useState(false);
    return (
        <div className="bg-clr h-full w-full">
            {/* Code block starts */}
            <nav className="nav-bar-pos w-full mx-auto hidden xl:block shadow">
                <div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
                    <div className="h-full flex items-center">
                        <Link to="/">
                            <div className="mr-10 flex items-center">
                                <h3 className="menu-items text-base text-slate-800 text-2xl tracking-normal leading-tight ml-3 hidden lg:block ml-11">
                                    <span className="material-symbols-outlined">home</span>
                                </h3>
                            </div>
                        </Link>
                    </div>
                    <div className="h-full xl:flex items-center justify-end hidden">
                        <ul className="pr-12 xl:flex items-center h-full hidden">
                            <Link to="/projects"> 
                                <li className="menu-items cursor-pointer h-full flex items-center text-lg text-slate-800 tracking-normal border-white">Projects</li>
                            </Link>
                            <Link to="/skills">
                                <li className="menu-items cursor-pointer h-full flex items-center text-lg text-slate-800 mx-10 tracking-normal">Skills</li>
                            </Link>
                            <Link to="/resume">
                                <li className="menu-items cursor-pointer h-full flex items-center text-lg text-slate-800 mr-10 tracking-normal">Resume</li>
                            </Link>
                            <Link to="/about-me">
                                <li className="menu-items cursor-pointer h-full flex items-center text-lg text-slate-800 tracking-normal mr-3">About Me</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="flex items-center justify-end xl:hidden nav-bar-pos">
                        <ul className="p-2 border-r bg-clr absolute rounded top-0 left-0 right-0 shadow mt-16 md:mt-16 hidden">
                            <li className="flex md:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none justify-center">
                                <Link to="/projects">
                                    <div className="flex items-center">
                                        <span className="ml-2 font-bold">Projects</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="flex md:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center">
                                <Link to="/skills">
                                    <div className="flex items-center">
                                        <span className="ml-2 font-bold">Skills</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="flex md:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center">
                                <Link to="/resume">
                                    <div className="flex items-center">
                                        <span className="ml-2 font-bold">Resume</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="border-b border-gray-300 flex md:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                <Link to="/about-me">
                                    <span className="ml-2 font-bold">About Me</span>
                                </Link>
                            </li>
                            <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                <div className="flex items-center">
                                    <div className="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                                        <img className="rounded h-10 w-10 object-cover" src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_1.png" alt="logo" />
                                    </div>
                                    <div className="sm:ml-2 text-white relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down cursor-pointer" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Navbar */}
            <nav>
                <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-clr fixed top-0 z-40">
                    <div>
                        <div id="menu" className="text-white" onClick={() => setShow(!show)}>
                            {show ? (
                                <div className="mt-6"></div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <line x1={4} y1={6} x2={20} y2={6} />
                                    <line x1={4} y1={12} x2={20} y2={12} />
                                    <line x1={4} y1={18} x2={20} y2={18} />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
                {/*Mobile responsive sidebar*/}
                <div className={show ? "absolute xl:hidden w-full h-full transform -translate-x-0 z-40 mt-0" : "absolute xl:hidden w-full h-full transform -translate-x-full z-40 mt-0"} id="mobile-nav">
                    <div className="ovlay opacity-50 w-full h-full" onClick={() => setShow(!show)} />
                    <div className="mobile-nav-down w-64 z-40 fixed overflow-y-auto z-40 top-0 shadow h-full bg-mobile-clr flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                        <div className="px-6 h-full">
                            <div className="flex flex-col justify-between h-full w-full">
                                <div>
                                    <div className="mt-6 flex w-full items-center justify-between">
                                        <div className="flex items-center justify-between w-full text-white">
                                            <Link to="/">
                                                <div className="menu-items ml-3 text-white flex items-center">
                                                    <p className="text-base">Home</p>
                                                </div>
                                            </Link>
                                            <div id="cross" className="text-white" onClick={() => setShow(!show)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <line x1={18} y1={6} x2={6} y2={18} />
                                                    <line x1={6} y1={6} x2={18} y2={18} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="f-m-m">
                                        <Link to="/projects" className="cursor-pointer">
                                            <li className="text-white pt-10">
                                                <div className="menu-items flex items-center">
                                                    <div className=" w-6 h-6 md:w-8 md:h-8">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <rect x={4} y={4} width={6} height={6} rx={1} />
                                                            <rect x={14} y={4} width={6} height={6} rx={1} />
                                                            <rect x={4} y={14} width={6} height={6} rx={1} />
                                                            <rect x={14} y={14} width={6} height={6} rx={1} />
                                                        </svg>
                                                    </div>
                                                    <p className="xl:text-base text-base ml-3">Projects</p>
                                                </div>
                                            </li>
                                        </Link>
                                        <Link to="/skills" className="cursor-pointer">
                                            <li className="text-white pt-8">
                                                <div className="menu-items flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                                            </svg>
                                                        </div>
                                                        <p className="xl:text-base  text-base ml-3">Skills</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                        <Link to="/resume" className="cursor-pointer">
                                            <li className="text-white pt-8">
                                                <div className="menu-items flex items-center">
                                                    <div className="w-6 h-6 md:w-8 md:h-8 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="8 16 10 10 16 8 14 14 8 16" />
                                                            <circle cx={12} cy={12} r={9} />
                                                        </svg>
                                                    </div>
                                                    <p className="xl:text-base  text-base ml-3">Resume</p>
                                                </div>
                                            </li>
                                        </Link>
                                        <Link to="/about-me" className="cursor-pointer">
                                            <li className="text-white pt-8 cursor-pointer">
                                                <div className="menu-items flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <polyline points="7 8 3 12 7 16" />
                                                                <polyline points="17 8 21 12 17 16" />
                                                                <line x1={14} y1={4} x2={10} y2={20} />
                                                            </svg>
                                                        </div>
                                                        <p className="xl:text-base  text-base ml-3">About Me</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Sidebar ends */}

            {/* Code block ends */}
        </div>
    );
}
export default Navigation;
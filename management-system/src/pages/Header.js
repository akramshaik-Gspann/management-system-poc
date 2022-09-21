import React, { useState } from 'react'
import "firebase/compat/firestore";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from '../redux/actions';
import { useNavigate } from "react-router-dom";
import { setUser } from '../redux/actions';
import ims from "../Images/ims.png";

function Header({ profile, setProfile }) {
    
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [navbar, setNavbar] = useState(false);

    const handleAuth = () => {
        if (currentUser) {
            dispatch(logoutInitiate());
            dispatch(setUser(null));
            setProfile();
            console.log("Profile After Logout", profile);

        }
        navigate('/login');

    }
    return (
        <>
            <nav className="w-full shadow head">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <Link to="/">
                                <img className='w-28' src={ims} alt="logo"/>
                            </Link>
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-white-700 rounded-md outline-none"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center mt-8 pb-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                                }`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li className="block text-gray-600 hover:text-blue-600">
                                    {profile && profile._delegate.email ? (<div className='user-logout'>
                                        <Link className='overlay' to="/login" onClick={handleAuth}></Link></div>) : (<Link to="/register">Register</Link>)}
                                </li>
                                <li className="items-center block text-gray-600 hover:text-blue-600">
                                
                                        <>
                                        
                                        {profile && profile._delegate.email ? (<div onClick={handleAuth} className='items-center user-logout flex'>
                                            <span className='text-white pr-3 capitalize font-bold'>
                                        {profile.email.split("@")[0]}
                                        </span>
                                        <div class="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                                            <svg class="image absolute -left-1 w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                        </div>
                                        <Link to="/login" className='overlay'>Logout</Link></div>) : (<Link to="/login">Login</Link>)}
                                        </>
                                    
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header
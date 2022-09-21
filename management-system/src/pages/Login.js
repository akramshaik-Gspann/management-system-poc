import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginInitiate } from '../redux/actions';
// import "../styles/Login.css";
import { logoutInitiate } from '../redux/actions';
import formimg from '../Images/form.png';

const Login = ({ }) => {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const { email, password } = state;
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("current user", currentUser)
        if (currentUser) {
            navigate('/gridtable');
        }
        else {
            navigate('/login')
        }
    }, [currentUser, navigate]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        dispatch(loginInitiate(email, password));
        setState({ email: "", password: "" });
        navigate('/gridtable');
        dispatch(logoutInitiate());
        navigate('/login');
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div className='container'>
            <section className='main-form'>
                <div className="px-0 sm:px-6 h-screen text-gray-800">
                    <div className="flex-none sm:flex xl:justify-center h-screen lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className='form-left hidden lg:block grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0'>
                            <img src={formimg} />
                        </div>
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <form className="w-full px-4 py-6 sm:px-12 md:px-12 lg:px-12 user-form" onSubmit={handleSubmit}>
                                <h1 className='text-center text-2xl sm:text-4xl font-bold mb-3'>Sign In</h1>
                                <p className='text-center mb-3'><span>Don't have an Account yet?</span> <Link to="/register" className='forlogin'>Register</Link></p>
                                <div className="md:items-center mb-6">
                                    <div className="">
                                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                                            Email:
                                        </label>
                                    </div>
                                    <div className="md:w-100">
                                        <input
                                            type="email"
                                            id="inputEmail"
                                            className="form-control block w-full px-2 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder='Email'
                                            name='email'
                                            onChange={handleChange}
                                            value={email}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text- mb-1left md:mb-0 pr-4" for="inline-password">
                                            Password:
                                        </label>
                                    </div>
                                    <div className="md:w-100">
                                        <input
                                            type="password"
                                            id="inputPassword"
                                            className="form-control block w-full px-2 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder='Password'
                                            name='password'
                                            onChange={handleChange}
                                            value={password}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="md:flex md:items-center lg:text-center">
                                    <div className="m-auto w-100">
                                        <button type="submit" className="w-100 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
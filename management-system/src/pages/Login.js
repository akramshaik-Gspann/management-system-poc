import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginInitiate } from '../redux/actions';
// import "../styles/Login.css";
import { logoutInitiate } from '../redux/actions';

const Login = ({ cabinData }) => {
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
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form className="w-full pb-24 pl-12 pr-12" onSubmit={handleSubmit}>
                                <h5 className='text-center text-xl'>Sign In</h5>
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                            Email:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input
                                            type="email"
                                            id="inputEmail"
                                            className="form-control block w-full px-4 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder='Email'
                                            name='email'
                                            onChange={handleChange}
                                            value={email}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                                            Password:
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input
                                            type="password"
                                            id="inputPassword"
                                            className="form-control block w-full px-4 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder='Password'
                                            name='password'
                                            onChange={handleChange}
                                            value={password}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="md:flex md:items-center lg:text-center">
                                    <div className="m-auto">
                                        <button type="submit" className="inline-block px-7 py-3 text-black font-medium text-sm leading-snug capitalise border border-solid border-gray-300 rounded shadow-md  hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
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
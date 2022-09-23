import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerInitiate } from '../redux/actions';
import formimg from '../Images/form.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REGISTER_SUCCESS } from '../redux/actionTypes';

const Register = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        error: ""
    });

    const [err, setErr] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        err: ""

    })

    

    const { currentUser, registerFail, error } = useSelector((state) => state.user);
    // const history = useHistory();
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (currentUser) {
    //         navigate("/gridtable")
    //     }
    // }, [currentUser, navigate]);

    const dispatch = useDispatch();

    const { email, password, passwordConfirm } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.user !== currentUser && password !== passwordConfirm) {
            return;
        }
        dispatch(registerInitiate(email, password));
        setState({ email: "", password: "", passwordConfirm: "" });
        toast("Registration Successful!");
        dispatch(registerFail(error.message))
        dispatch(registerInitiate(email, password));
        navigate('/login');
        // navigate('/register');
    };
    // const notify = () => {
    //     if(REGISTER_SUCCESS === false){
    //         toast("Registration Failed!");
    //     }else{
    //         toast("Registration Successful!");
    //     }
        
    // }
    const handleChange = (e) => {
        let { name, value } = e.target;
        // setState({ ...state, [name]: value });
        setState(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);
    }

    const validateInput = e => {
        let { name, value } = e.target;
        setErr(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "email":
                    if (!value) {
                        stateObj[name] = "Please enter email.";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter password.";
                    } else if (state.confirmPassword && value !== state.confirmPassword) {
                        stateObj["passwordConfirm"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["passwordConfirm"] = state.passwordConfirm ? "" : err.passwordConfirm;
                    }
                    break;

                case "passwordConfirm":
                    if (!value) {
                        stateObj[name] = "Please enter confirm password.";
                    } else if (state.password && value !== state.password) {
                        stateObj[name] = "Password and Confirm password does not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }

    return (
        <div className='container'>
            <section className="main-form">
                <div className="px-0 sm:px-6 h-screen text-gray-800">
                    <div className="flex-none sm:flex xl:justify-center h-screen lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className='form-left hidden lg:block grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0'>
                            <img src={formimg} />
                        </div>
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <form className="w-full px-4 py-6 sm:px-12 md:px-12 lg:px-12 user-form" onSubmit={handleSubmit}>
                                <h1 className='text-center text-2xl sm:text-4xl font-bold mb-3'>Sign Up</h1>
                                <p className='text-center mb-3'><span>Already a member?</span> <Link to="/login" className='forlogin'>Login</Link></p>
                                <div className="md:items-center mb-6">
                                    <div className="md:w-100">
                                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                                            Email:
                                        </label>

                                    </div>
                                    <div className="md:w-100">
                                        <input
                                            type="email"
                                            id="user-email"
                                            className="form-control block w-full px-2 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder='Email Address'
                                            name='email'
                                            onChange={handleChange}
                                            value={email}
                                            onBlur={validateInput}
                                        />
                                        {err.email && <span className='err bg-red-100 border border-red-400 text-red-700 text-s inline-block mt-1 px-4 py-2 rounded'>{err.email}</span>}
                                        <p className="errorMsg">{error ? "Email address already in use" : ""}</p>
                                    </div>
                                </div>
                                <div className="md:items-center mb-6">
                                    <div className="md:w-100">
                                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-password">
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
                                            onBlur={validateInput}
                                        />
                                        {err.password && <span className='err bg-red-100 border border-red-400 text-red-700 text-s inline-block mt-1 px-4 py-2 rounded'>{err.password}</span>}
                                    </div>
                                </div>
                                <div className="md:items-center mb-6">
                                    <div className="md:w-100">
                                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-password">
                                            Confirm Password:
                                        </label>
                                    </div>
                                    <div className="md:w-100">
                                        <input
                                            type="password"
                                            id="passwordConfirm"
                                            className="form-control block w-full px-2 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder='Repeat Password'
                                            name='passwordConfirm'
                                            onChange={handleChange}
                                            value={passwordConfirm}
                                            onBlur={validateInput}
                                        />
                                        {err.passwordConfirm && <span className='err bg-red-100 border border-red-400 text-s text-red-700 inline-block mt-1 px-4 py-2 rounded'>{err.passwordConfirm}</span>}
                                    </div>
                                </div>
                                <div className="md:flex md:items-center lg:text-center">
                                    <div className="m-auto w-100">
                                        <button type="submit" onClick={handleSubmit} className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 transition duration-150 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ... ">
                                            Create an Account
                                        </button>
                                        <ToastContainer />
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

export default Register

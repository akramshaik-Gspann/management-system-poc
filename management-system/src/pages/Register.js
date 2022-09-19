import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerInitiate } from '../redux/actions';
import formimg from '../Images/form.png';

const Register = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const { currentUser } = useSelector((state) => state.user);
    // const history = useHistory();
    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser) {
            navigate("/")
        }
    }, [currentUser, navigate]);

    const dispatch = useDispatch();

    const { email, password, passwordConfirm } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            return;
        }
        dispatch(registerInitiate(email, password));
        setState({ email: "", password: "", passwordConfirm: "" });
        navigate('/login');
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div className='container'>

            <section className="">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className='form-left'>
                            <img src={formimg} />
                        </div>
                        <div className="mb-12 md:mb-0">
                            <form className="w-full pb-24 pl-12 pr-12 user-form" onSubmit={handleSubmit}>
                                <h1 className='text-center text-4xl font-bold mb-3'>Sign Up</h1>
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
                                            className="form-control block w-full px-4 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder='Email Address'
                                            name='email'
                                            onChange={handleChange}
                                            value={email}
                                            required
                                        />
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
                                            className="form-control block w-full px-4 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder='Password'
                                            name='password'
                                            onChange={handleChange}
                                            value={password}
                                            required
                                        />
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
                                            className="form-control block w-full px-4 py-2 text-s font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder='Repeat Password'
                                            name='passwordConfirm'
                                            onChange={handleChange}
                                            value={passwordConfirm}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="md:flex md:items-center lg:text-center">
                                    <div className="m-auto">
                                        <button type="submit" className="inline-block px-7 py-3 text-black font-medium text-sm leading-snug capitalise border border-solid border-gray-300 rounded shadow-md  hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                            Create
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

export default Register

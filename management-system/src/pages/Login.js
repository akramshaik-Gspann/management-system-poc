import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginInitiate } from '../redux/actions';
import "../styles/Login.css";
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
        // if (currentUser && cabinData._id) {
        //     navigate('/cabinconfirmation');
        // }
        // else {
        //     navigate('/login')
        // }
    }, [currentUser, navigate]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        dispatch(loginInitiate(email, password));
        setState({ email: "", password: "" });
        navigate('/xyz');
        dispatch(logoutInitiate());
        navigate('/');
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div className='container'>
            <div id="logreg-forms">
                <form className='form-signin' onSubmit={handleSubmit}>
                    <h1 className='h3 mb-3 font-weight-normal' style={{ textAlign: "center" }}>
                        Sign in
                    </h1>
                    <p style={{ textAlign: "center" }}>OR</p>
                    <input
                        type="email"
                        id="inputEmail"
                        className='form-control'
                        placeholder='Email Address'
                        name='email'
                        onChange={handleChange}
                        value={email}
                        required
                    />
                    <input
                        type="password"
                        id="inputPassword"
                        className='form-control'
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={password}
                        required
                    />
                    <div className='text-center'>
                        <button className='btn btn-block signinb' type='submit'>
                            <i className=''></i> Sign In</button>
                    </div>
                    <hr />
                    <center>
                    <p>Don't have an account ?</p>
                    </center>
                    <Link to="/register">
                        <div className='text-center'>
                            <button className='btn btn-block signupb' type='button' id='btn-signup'>
                                <i className=''></i>Sign up New Account</button>
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login
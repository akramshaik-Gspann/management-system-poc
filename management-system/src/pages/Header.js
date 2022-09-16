import React, { useState } from 'react'
import "../styles/Header.css";
import "firebase/compat/firestore";
// import Menu from '../Images/svg/bars-solid.svg'
// import Close from '../Images/svg/times-solid.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from '../redux/actions';
import { useNavigate } from "react-router-dom";

function Header({ profile, setProfile }) {
    const [toggle, setToggle] = useState(false);
    const menuToggle = () => {
        setToggle(true);
    }
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAuth = () => {
        if (currentUser) {
            dispatch(logoutInitiate());
            setProfile();
            console.log("Profile After Logout" , profile);
        }
        navigate('/login');
    }
    return (
        <header>
            <div className="menu" onClick={menuToggle}>
                {/* <img src={Menu} alt="" width="20" /> */}
            </div>
            <div className="logo">
                <h1><Link to="/">PMS</Link></h1>
            </div>
            <nav>
                <ul className={toggle ? "toggle" : ""}>
                    <li><Link to="/">Register</Link></li>
                
                    {/* <li><Link to="/allbookings">Login</Link></li> */}
                    <li>{profile && profile._delegate.displayName ? (<Link to="/" onClick={handleAuth}>Logout</Link>) : (<Link to="/login">Login</Link>)}</li>
                    <li className="close" onClick={menuToggle}>
                        {/* <img src={Close} alt="" width="20" /> */}
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header
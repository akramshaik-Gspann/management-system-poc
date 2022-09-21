import React from 'react';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div c>
            <footer className=" p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 border-t-4 border-grey ">
                <div className='container bg-white rounded-lg md:flex md:items-center md:justify-between'>
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <Link to="/" class="hover:underline">Inventory Management</Link>. All Rights Reserved.
                </span>
                <ul class="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link className="ml-0 sm:ml-4 lg:ml-4 md:ml-4" to="/">Register</Link>
                    </li>
                    <li>
                        <Link className="ml-4" to="/login">Login</Link>
                    </li>
                    
                </ul>
                </div>
                
            </footer>

        </div>
    )
}

export default Footer;
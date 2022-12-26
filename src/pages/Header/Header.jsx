import React, { useState } from "react";
import logo from '../../asset/logo2.png'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";
import { useContext } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import './Header.css'
export default function Header() {
    let arr = [true, false, false, false, false, false]
    const [style, setStyle] = useState(arr);
    const [dropDown, setDropDown] = useState(true);
    const [text, setText] = useState("");
    const { dark, setDark, user } = useContext(AuthContext);
    const navigate = useNavigate();
    function handleDark() {
        localStorage.setItem('ams-theme', JSON.stringify(!dark));
        setDark(!dark);
    }

    const selected = (props) => {
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = false;
        }
        newArr[props] = true;
        setStyle(newArr);
    }

    const setSelectedText = (txt) => {
        setText(txt);
        setDropDown(true);
    }
    const activeStyle =
        'text-white bg-amber-400 focus:outline-none cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded h-[31px]'

    const nonActiveStyle =
        'text-gray-600 border border-white bg-gray-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded'

    return (
        <div className="2xl:container 2xl:mx-auto">
            <div className="bg-gray-100 dark:bg-gray-900 rounded py-2 px-4 lg:px-2">
                <nav className="flex justify-between">
                    <Link to='/' className="flex items-center space-x-3 w-full lg:pr-16 pr-6">
                        <img src={logo} className='w-[90px] md:h-[80px]' alt="" />
                    </Link>
                    <ul className="hidden md:flex flex-auto h-fit pt-6 space-x-2">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive ? activeStyle : nonActiveStyle
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) =>
                                isActive ? activeStyle : nonActiveStyle
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/booking"
                            end
                            className={({ isActive }) =>
                                isActive ? activeStyle : nonActiveStyle
                            }
                        >
                            Booking
                        </NavLink>
                        {!user?.uid && <NavLink
                            to="/login"
                            end
                            className={({ isActive }) =>
                                isActive ? activeStyle : nonActiveStyle
                            }
                        >
                            Login
                        </NavLink>}
                        {user?.uid && <NavLink
                            to="/logout"
                            end
                            className={({ isActive }) =>
                                isActive ? activeStyle : nonActiveStyle
                            }
                        >
                            Logout
                        </NavLink>}
                        <NavLink
                            to="/profile"
                            end
                            className={({ isActive }) =>
                                isActive ? activeStyle : nonActiveStyle
                            }
                        >
                            User
                        </NavLink>
                    </ul>
                    <div className=" flex space-x-5 justify-center items-center pl-2">
                        <div className='border-2 rounded-md p-1 lg:mt-[5px] border-black dark:border-white'>
                            {dark ? <MdOutlineDarkMode className='text-xl text-white  cursor-pointer' title='click to light mode' onClick={handleDark} /> : <MdOutlineLightMode className='text-xl cursor-pointer text-black' title='click to light mode' onClick={handleDark} />}
                        </div>
                    </div>
                </nav>
                {/* for smaller devcies */}
                <div className="block md:hidden w-full mt-5 ">
                    <div onClick={() => setDropDown(!dropDown)} className="cursor-pointer px-4 py-3 text-white bg-amber-400 rounded flex justify-between items-center w-full">
                        <div className="flex space-x-2">
                            <span id="s1" className={`${text.length != 0 ? '' : 'hidden'} font-semibold text-sm leading-3`}></span><p id="textClicked" className="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer ">{text ? text : "Menu"}</p>
                        </div>
                        <AiOutlineMenu />
                    </div>
                    <div className=" relative z-50">
                        <ul id="list" className={`${dropDown ? 'hidden' : 'block'} font-normal text-base leading-4 absolute top-2  w-full rounded shadow-md`}>
                            <Link to='/'>
                                <li onClick={() => setSelectedText("Home")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Home</li>
                            </Link>
                            <Link to='/dashboard'>
                                <li onClick={() => setSelectedText("Dashboard")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Dashboard</li>
                            </Link>
                            <Link to='/booking'>
                                <li onClick={() => setSelectedText("Booking")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Booking</li>
                            </Link>
                            <Link to='/profile'>
                                <li onClick={() => setSelectedText("Contact")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">User</li>
                            </Link>
                            {!user?.uid && <Link to='/login'>
                                <li onClick={() => setSelectedText("Utility")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Login</li>
                            </Link>}
                            {user?.uid && <Link to='/logout'>
                                <li onClick={() => setSelectedText("Utility")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Logout</li>
                            </Link>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

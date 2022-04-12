import './Navbar.css'
import { BsFillBasket2Fill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from "react";
import { BiLogOut } from 'react-icons/bi'
import { SiShopify } from 'react-icons/si'
import UserImage from '../../images/unsplash_jmURdhtm7Ng.jpg'
import { Context } from '../../context/Context';
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import userimage from '../../images/149071.png'
 


export function Navbar() {
    const [navbar, setNavbar] = useState(true)
    const { user } = useContext(Context);
    const PF = "http://localhost:4000/images/";
    
    const navSide = useRef(null);

    const changeBackground = () => {
        if (window.scrollY >= 30) {
            setNavbar(true)

        } else {
            setNavbar(false)

        }
    }
    useEffect(() => {
        window.addEventListener('scroll', changeBackground)
        return () => {
            window.removeEventListener("scroll", changeBackground);
        }

    }, [])







    function handlelogout() {

        localStorage.removeItem("user")
        window.location.replace("http://localhost:3000/login")
    }

    function openNav() {
        navSide.current.style.width = "100%";
    }
    function closeNav() {
        navSide.current.style.width = "0";

    }
    return (

        <>
            <nav id="navbar" className={`navbar ${navbar ? 'active' : null}`}>
                <div className="logo">
                    <div className='linkbox1'>
                        <div id="logo" ><Link to='/' id="logo" className='link logolink'> Blog</Link></div>

                    </div>


                </div>
                <ul >
                    {user ? (
                        <>
                            <li className="links" >
                                <Link to='/' className={`link ${navbar ? 'active' : null}`}> Home</Link>


                            </li>
                            <li className="links">
                                <Link to='/allpost' className='link' > Posts</Link>


                            </li>
                            <li className="links">
                                <Link to='/setting' className='link' > Profile</Link>


                            </li>

                            <li className="links">

                                <Link to='/setting'>
                                    <div className='ProfileCircle'>
                                        {JSON.parse(localStorage.getItem("user")).photo ? (
                                            <img src={PF + JSON.parse(localStorage.getItem("user")).photo} />

                                        ):(
                                            <>
                                            <img  className='secondimage' src={userimage} />
                                            </>
                                        )

                                        }
                                        

                                    </div>
                             </Link>

                            </li>
                            <li className="links" style={{ cursor: "pointer" }} onClick={handlelogout}>

                                <BiLogOut color='tomato' size={30} />

                            </li>
                        </>

                    ) : (
                        <>

                            <li className="links">
                                <Link to="/login" className='link'>SignIN</Link>


                            </li>
                            <li className="links">
                                <div className='linkbox'>
                                    <Link to='/register' className='link'>SignUp</Link>

                                </div>


                            </li>

                        </>

                    )}


                    <div className="hamurgertag" id="hamurgertag" onClick={openNav}><GiHamburgerMenu size={30} /></div>


                </ul>



                <div id="mySidenav" ref={navSide} className="sidenav">
                    {
                        user ? (
                            <>
        
                                <a href="/">Home</a>
                                <a href="/allpost">Posts</a>
                                <a href="/setting">Profile</a>
                                <a href="#" onClick={handlelogout}>Logout</a>
                            </>

                        ) : (
                            <>
                                <a href="/">login</a>
                                <a href="/allpost">register</a>

                            </>

                        )
                    }
                    <a href="#" className="closebtn" onClick={closeNav}>&times;</a>



                </div>


            </nav>

        </>
    )
}
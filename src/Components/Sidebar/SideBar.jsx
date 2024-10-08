import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import sbCSS from './sidebar.module.css';
import './active.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import { jwtDecode } from 'jwt-decode';

export default function SideBar({show , setShow}) {

    // ====== admin-loggedIn ====== //

    const [admin, setAdmin] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {

        if (sessionStorage.getItem('adminTkn')) {

            const {role} = jwtDecode(sessionStorage.getItem('adminTkn'));
            setRole(role)
            setAdmin(true);

        }

    } , [admin]);

    // ====== get-logo ====== //

    const getLogo = async() => {

        return await axios.get("https://lilac-backend.vercel.app/content/logo");

    }

    const {data , isLoading} = useQuery('getLogo' , getLogo);

    useEffect(() => {

        const sideBar = document.getElementById('sideBar');
        const container = document.getElementById('container');

        container.onclick = () => {setShow(false)};

        if(show){

            container.classList.add(sbCSS.container_display)
            sideBar.classList.add(sbCSS.side_bar_display);

        }
        else{

            container.classList.remove(sbCSS.container_display)
            sideBar.classList.remove(sbCSS.side_bar_display);

        }

    } , [show , setShow])

    return <React.Fragment>

        <div id='container' className={sbCSS.container}>

            <div id='sideBar' className={sbCSS.side_bar}>

                <div className={sbCSS.logo}>

                    <Link to={'/dashboard/services'}>

                        {isLoading? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--dark-color-1)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> : <img src={data.data.data.url} alt="" />}

                    </Link>

                </div>

                <nav className={sbCSS.nav}>

                    {!admin && <Link to={'/login'} className={sbCSS.admin_login}>
                        <i className="fa-solid fa-user-gear"></i>
                        <span>Login as admin</span>
                    </Link>}

                    <ul>

                        <NavLink to={'/dashboard/services'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-solid fa-cubes"></i>
                                <span>Services</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/dashboard/products'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-solid fa-basket-shopping"></i>
                                <span>Products</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/dashboard/content'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-solid fa-align-left"></i>
                                <span>Content</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/dashboard/about'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-solid fa-square-poll-horizontal"></i>
                                <span>About Us</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/dashboard/contact'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-regular fa-comments"></i>
                                <span>Contact us</span>
                            </li>
                        </NavLink>

                        {role === 'admin' && <NavLink to={'/dashboard/reset'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-solid fa-key"></i>
                                <span>Reset password</span>
                            </li>
                        </NavLink>}

                    </ul>

                </nav>

            </div>

        </div>

    </React.Fragment>

}

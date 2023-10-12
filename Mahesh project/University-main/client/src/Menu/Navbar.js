import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import Logo from '../Images/CollegeLogo.jpg';
import { Bars, Nav, NavBtn, NavBtnLink, NavLogo, NavMenu } from "./NavBarElements";


const Navbar = () => {
    let history = useHistory();
    const LogOut = () => {
        localStorage.removeItem('login');
        history.push('/')
    }
    return (
        <>
            <Nav>
                <NavLogo to="/Dashboard">
                    <img src={Logo} width="90px" height="60px" />
                </NavLogo>
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/Dashboard"
                        style={{ padding: '10px', fontFamily: 'Highlight', color: 'black' }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/Students"
                        style={{ padding: '10px', fontFamily: 'Highlight', color: 'black' }}
                    >
                        Students
                    </NavLink>
                    <NavLink
                        to="/Teachers"
                        style={{ padding: '10px', fontFamily: 'Highlight', color: 'black' }}
                    >
                        Teachers
                    </NavLink>
                    <NavLink to="/Library" style={{ padding: '10px', fontFamily: 'Highlight', color: 'black' }} >
                        Library
                    </NavLink>
                    <NavLink
                        to="/Examination"
                        style={{ padding: '10px', fontFamily: 'Highlight', color: 'black' }}
                    >
                        Examination
                    </NavLink>
                    <NavLink
                        to="/Results"
                        style={{ padding: '10px', fontFamily: 'Highlight', color: 'black' }}
                    >
                        Results
                    </NavLink>
                    <NavLink
                        to="/Events"
                        style={{ padding: '10px', fontFamily: 'Highlight', color: 'black' }}
                    >
                        Events
                    </NavLink>
                    <NavLink
                        to="/Sports"
                        style={{ padding: '10px', fontFamily: 'Highlight', color: 'black' }}
                    >
                        Sports
                    </NavLink>
                    <NavLink
                        to="/Contact"
                        style={{ padding: '10px', fontFamily: 'Highlight', color: 'black' }}
                    >
                        Contact
                    </NavLink>
                    <NavBtn onClick={() => LogOut()}>
                        <NavBtnLink to={'/'}>Log out</NavBtnLink>
                    </NavBtn>
                </NavMenu>
            </Nav>
        </>
    );
};
export default Navbar;
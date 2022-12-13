import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup")
    }
    return (
        <div >
            <img 
            alt="logo"
            className="logo"
            src="../assets/images/farmland.png"/>
            {auth ?
                <ul className="nav-ul" >
                    <li><a href='/'>Products</a></li>
                    <li><a href='/add'>Add product</a></li>
                    <li><a href='/update'>Update</a></li>
                    <li><a href='/profile'>Profile</a></li>
                    <li> <a onClick={logout} href='/signup'>Logout ({JSON.parse(auth).name})</a></li>

                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><a href='/Login'>login</a></li>
                    <li><a href='/signup'>SignUp</a></li>
                </ul>
            }
        </div>
    )
}

export default Nav;
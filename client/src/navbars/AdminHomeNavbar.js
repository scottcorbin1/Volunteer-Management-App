import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";

function AdminHomeNavbar({isLoggedIn, setIsLoggedIn}) {
  const navigate = useNavigate();

  function logOut() {
     setIsLoggedIn(false);
     navigate('/')
  }
return (
    <div className="navbar">
        <h1>Home</h1>
        <button className="nav-home" onClick={logOut}><FontAwesomeIcon icon={faPowerOff} /></button>
    </div>
    )
}

export default AdminHomeNavbar;
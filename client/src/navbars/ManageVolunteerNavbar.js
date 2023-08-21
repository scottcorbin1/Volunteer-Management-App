import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import {
    faPowerOff
  } from "@fortawesome/free-solid-svg-icons";

function ManageVolunteerNavbar({setIsLoggedIn}) {

    const navigate = useNavigate();

    function logOut() {
        setIsLoggedIn(false)
        navigate('/')
    }
    return (
        <div className="navbar">
            <h1>Manage Volunteers</h1>
                <button className='nav-home' title='Home'><Link to='/AdminHome' className="navbar-links"><FontAwesomeIcon icon={faHouse} /></Link></button>
                <button className="nav-home" onClick={logOut}><FontAwesomeIcon icon={faPowerOff} /></button>
        </div>
    )
}

export default ManageVolunteerNavbar;
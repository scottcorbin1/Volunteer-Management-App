import './Navbar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function CreateVolunteerNavbar() {
    return (
        <div className="navbar">
            <h1>Create Volunteer</h1>
            <ul className='navbar-list'>
                <li><Link to='/AdminHome' className='navbar-links'><FontAwesomeIcon icon={faHouse} /></Link></li>
            </ul>
        </div>
    )
}

export default CreateVolunteerNavbar;
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function CreateOpportunityNavbar() {
    return (
        <div className="navbar">
            <h1>Create Opportunity</h1>
            <ul className='navbar-list'>
                <li title='Home'><Link to='/AdminHome' className="navbar-links"><FontAwesomeIcon icon={faHouse} /></Link></li>
            </ul>
        </div>
    )
}

export default CreateOpportunityNavbar;
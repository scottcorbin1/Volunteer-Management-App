import './App.css'
import AdminHomeNavbar from './navbars/AdminHomeNavbar';
import { Link } from 'react-router-dom';
import Team from './images/Team.png'
import './App.css'

function Home({isLoggedIn, setIsLoggedIn}) {
    return(
        <div className="Home">
            <AdminHomeNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className='container-home'>
                <button title='Manage Volunteers' class="button"><Link to="/ManageVolunteers" className="navbar-links">Manage Volunteers</Link></button>
                <button title='Manage Opporunities' class="button"><Link to="/ManageOpportunities" className="navbar-links">Manage Opportunities</Link></button>
                <button title='Create Account' class="button"><Link to="/CreateAdminAccount" className="navbar-links">Create Account</Link></button>
            </div>
            <div className='home-img-container'>
                <img className='home-img' src={Team} />
            </div>
        </div>
    )
}

export default Home;
import React, { useState } from 'react';
import Home from './Home'
import AdminLogin from './AdminLogin'
import CreateVolunteer from './CreateVolunteer';
import EditVolunteer from './EditVolunteer';
import CreateOpportunity from './CreateOpportunity';
import EditOpportunity from './EditOpportunity';
import ManageVolunteers from './ManageVolunteers';
import ManageOpportunities from './ManageOpportunities';
import CreateAdminAccount from './CreateAdminAccount';

import {Route, Routes, useNavigate } from 'react-router-dom'

function App() {
    
    // Passed to all components to keep track of login status
    const [isLoggedIn, setIsLoggedIn ] = useState()
    let navigate = useNavigate();

    return (
        <div>
            <Routes>
                <Route path="/" element={<AdminLogin isLogged={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
               
                {/* Routes that require login status of true*/}
                {isLoggedIn && (
                    <>
                        <Route path="/AdminHome" element={<Home isLogged={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/CreateVolunteer" element={<CreateVolunteer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/EditVolunteer" element={<EditVolunteer isLogged={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/CreateOpportunity" element={<CreateOpportunity isLogged={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/EditOpportunity" element={<EditOpportunity isLogged={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/ManageVolunteers" element={<ManageVolunteers isLogged={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/ManageOpportunities" element={<ManageOpportunities isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
                        <Route path="/CreateAdminAccount" element={<CreateAdminAccount isLogged={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                       
                    </>
                )}
                {/* Redirect to login if not logged in */}
                
            </Routes>
        </div>
    );
}

//Jared


export default App;
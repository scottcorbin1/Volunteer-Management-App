import React, { useState } from "react";
import CreateOpportunityNavbar from "./navbars/CreateOpportunityNavbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateOpportunity() {

    //Function to allow users to navigate between pages using the react-router-dom import:
    const navigate = useNavigate();

    //Values and functions used to store the inputs from the form on this page that will be used to create a opportunity on the database:
    const [opportunityID, setOpportunityID] = useState("");
    const [oppWorkType, setOppWorkType] = useState("");
    const [assignedVolunteer, setAssignedVolunteer] = useState("");
    const [oppStatus, setOppStatus] = useState("");
    const [ageOfOpportunity, setAgeOfOpportunity] = useState(0);
    const [oppLocation, setOppLocation] = useState("");
    const [oppOrganization, setOppOrganization] = useState("");
    const [oppContactNumber, setOppContactNumber] = useState("");
    const [formErrors, setFormErrors] = useState({});

    //Functions used to validate the data inputs from the user in this pages form:
    const validateForm = () => {
        const errors = {};
        if (!opportunityID) {
            errors.opportunityID = "Opportunity ID is required";
        }
        if (!oppWorkType) {
            errors.oppWorkType = "Type of Work is required";
        }
        if (!assignedVolunteer) {
            errors.assignedVolunteer = "Volunteer Assigned is required";
        }
        if (!oppStatus) {
            errors.oppStatus = "Status is required";
        }
        if (!ageOfOpportunity) {
            errors.ageOfOpportunity = "Age of Opportunity is required";
        }
        if (!oppOrganization) {
            errors.oppOrganization = "Organization Name is required";
        }
        if (!oppLocation) {
            errors.oppLocation = "Location is required";
        }
        if (!oppContactNumber) {
            errors.oppContactNumber = "Contact Number is required";
        } else if (!/^[0-9]{10}$/.test(oppContactNumber)) {
            errors.oppContactNumber = "Contact Number must be a 10-digit number";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    //Function that contains the actions that will occurs when this pages form is submitted:
    const handleSubmit = async (event) => {

        event.preventDefault();

        //Checks to see if all the inputs from the form are valid inputs
        if (!validateForm()) {
            console.log("TestingValidate")
            return;
        }

        //Object that stores the inputs from the user that will be sent to the back-end server and user to create a opportunity:
        const formData = {
            opportunityID,
            oppWorkType,
            assignedVolunteer,
            oppStatus,
            ageOfOpportunity,
            oppLocation,
            oppOrganization,
            oppContactNumber
        };


        try {
            
            //Sends a post request to the back-end server using axios to creates a new opportunity on the server:
            const response = await axios.post('http://localhost:3005/CreateOpportunity', formData);
            console.log('Response:', response.data);

          
            //Resets all the values in the create opportunity to default values:
            setOpportunityID("");
            setOppWorkType("");
            setAssignedVolunteer("");
            setOppStatus("");
            setAgeOfOpportunity(0);
            setOppLocation("");
            setOppOrganization("");
            setOppContactNumber("");

            //Navigates the user back the Manage Opportunities page upon the successful creation of a opportunity:
            navigate('/ManageOpportunities')
           
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="CreateOpportunity">
            <CreateOpportunityNavbar />
            <form className="login-form">
                <h1>Create Opportunities</h1>

                {/* Opportunity ID */}
                <label><strong>Opportunity ID</strong></label>
                <input
                    name="oppID"
                    value={opportunityID}
                    onChange={(e) => setOpportunityID(e.target.value)}
                />
                <div className="error-message">{formErrors.opportunityID && <span>{formErrors.opportunityID}</span>}</div>

                {/* Type of Work */}
                <label><strong>Type of Work</strong></label>
                <select
                    name="oppType"
                    value={oppWorkType}
                    id="oppType"
                    onChange={(e) => setOppWorkType(e.target.value)}
                >
                    <option value="">Please select an Option</option>
                    <option value="Cleaning">Clearing Services</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="Carpentry">Carpentry</option>
                </select>
                <div className="error-message">{formErrors.oppWorkType && <span>{formErrors.oppWorkType}</span>}</div>

                {/* Volunteer Assigned */}
                <label><strong>Volunteer Assigned</strong></label>
                <select
                    name="assignedVolunteer"
                    value={assignedVolunteer}
                    id="assignedVolunteer"
                    onChange={(e) => setAssignedVolunteer(e.target.value)}
                >
                    <option value="">Please select an Option</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
                <div className="error-message">{formErrors.assignedVolunteer && <span>{formErrors.assignedVolunteer}</span>}</div>

                {/* Status */}
                <label htmlFor="oppStatus"><strong>Status</strong></label>
                <select
                    name="oppStatus"
                    id="oppStatus"
                    value={oppStatus}
                    onChange={(e) => setOppStatus(e.target.value)}
                >
                    <option value="">Please Select an Option</option>
                    <option value="New">New</option>
                    <option value="inProgress">In Progress</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Closed">Closed</option>
                </select>
                <div className="error-message">{formErrors.oppStatus && <span>{formErrors.oppStatus}</span>}</div>

                {/* Age of Opportunity */}
                <label><strong>Age of Opportunity (Days)</strong></label>
                <input
                    value={ageOfOpportunity}
                    onChange={(e) => setAgeOfOpportunity(parseInt(e.target.value))}
                />
                <div className="error-message">{formErrors.ageOfOpportunity && <span>{formErrors.ageOfOpportunity}</span>}</div>

                {/* Organization Name */}
                <label htmlFor="orgName"><strong>Organization Name</strong></label>
                <input
                    name="orgName"
                    value={oppOrganization}
                    id="orgName"
                    onChange={(e) => setOppOrganization(e.target.value)}
                />
                <div className="error-message">{formErrors.oppOrganization && <span>{formErrors.oppOrganization}</span>}</div>

                {/* Location */}
                <label htmlFor="orgLocation"><strong>Location</strong></label>
                <input
                    name="orgLocation"
                    value={oppLocation}
                    id="orgLocation"
                    onChange={(e) => setOppLocation(e.target.value)}
                />
                <div className="error-message">{formErrors.oppLocation && <span>{formErrors.oppLocation}</span>}</div>

                {/* Contact Number */}
                <label htmlFor="orgPhoneNum"><strong>Contact Number</strong></label>
                <input
                    value={oppContactNumber}
                    maxLength={10}
                    name="orgPhoneNum"
                    id="orgPhoneNum"
                    onChange={(e) => setOppContactNumber(e.target.value)}
                />
                <div className="error-message">{formErrors.oppContactNumber && <span>{formErrors.oppContactNumber}</span>}</div>

                <div className="button-container">
                    <button onClick={handleSubmit}>Submit</button>
                    <button type="reset">Clear</button>
                </div>
            </form>
        </div>
    );
}

export default CreateOpportunity;
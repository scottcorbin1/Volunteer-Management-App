
import { useEffect, useState } from 'react';
import "./EditOpportunityStyle.css";
import axios from 'axios';


function EditOpportunity(props) {

    //Variables and functions for storing the values from the users input: 
    const [ newOppID, setNewOppID ] = useState("")
    const [ newWorkType, setNewWorkType ] = useState("")
    const [ newVolunteerAssigned, setNewVolunteerAssigned] = useState("") 
    const [ newOpStatus, setNewOpStatus] = useState("")
    const [ newAgeOfOpportunity, setNewAgeOfOpportunity] = useState("")
    const [newOrgName, setNewOrgName] = useState("")
    const [ newLocation, setNewLocation] = useState("")
    const [ newContactNumber, setNewContactNumber] = useState("")

    //Set the values on the manage opportunity to change the page back to manage opportunity and to rerender the page every time the user returns to manage opportunity 
    //from the edit opportunity page:
    function returnToVol() {

        props.setShowEdit(false);
        
        props.setRerender((prevRerender) => 
    
          !(prevRerender)
    
        );

    }

    //Function that handles the actions to be performed when the form on the edit opportunity form is submitted:
    async function handleSubmit(event) {

        event.preventDefault();

        //Object to store the values from the user input to be sent to the back-end server to be used to change a existing opportunity: 
        const updatedOpportunity = {
            opportunityID: newOppID,
            oppWorkType: newWorkType,
            assignedVolunteer: newVolunteerAssigned,
            oppStatus: newOpStatus,
            ageOfOpportunity: newAgeOfOpportunity,
            oppOrganization: newOrgName,
            oppLocation: newLocation,
            oppContactNumber: newContactNumber,
    };

    try {

        //Post request used to change the contents of a existing opportunity:
        await axios.post(`http://localhost:3005/ManageOpportunities/${props.currentUser._id}`, updatedOpportunity);

        //Navigates the user back to manage opportunity page:
        returnToVol();

    } catch (error) {
        console.error('Error updating opportunity:', error);
    }
    }   
    

    return (

        <div className="EditOpportunity">

           <div className='EditOppContainer'>

            <form className="EditOpportunityForm">

                <div className='oppInputSections'>
                    {/*opportunityID type string input for edit*/}
                    <label className="EditOppLables">Opportunity ID</label>
                    <input type="text" value={newOppID} placeholder={props.currentUser.opportunityID} onChange={(e) => setNewOppID(e.target.value)}/>
                </div>

                <div className='oppInputSections'>

                    {/*workType type string input for edit*/}
                    <label className="EditOppLables">Type of Works</label>

                    <select className="editOppSelect" 
                    value={newWorkType} 
                    onChange={(e) => setNewWorkType(e.target.value)}
                    >
                        <option value="CleaningServices" selected>Cleaning Services</option>
                        <option value="Landscaping">Landscaping</option>
                        <option value="Carpentry">Carpentry</option>
                    </select>
                </div>  

                <div className='oppInputSections'>

                     {/*assignedVolunteer type string input for update*/}
                    <label className="EditOppLables">Volunteer Assigned</label> 

                    <select 
                        className="editOppSelect" 
                        value={newVolunteerAssigned}
                        onChange={(e) => setNewVolunteerAssigned(e.target.value)}
                    >
                        <option value="yes" selected>Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>  

                <div className='oppInputSections'>
                 {/*opStatus type string input for edit*/}
                 <label className="EditOppLables">Status</label> 

                    <select 
                    className="editOppSelect" 
                    value={newOpStatus}
                    onChange={(e) => setNewOpStatus(e.target.value)}
                    >
                        <option value="New" selected>New</option>
                        <option value="inProgress">In progress</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>  

                <div className='oppInputSections'>
                    {/*ageOfOpportunity type number input for edit*/}
                    <label className="EditOppLables">Age of Opportunity(Days)</label> 
                    <input
                        className='editOppInput'
                        type="text"
                        value={newAgeOfOpportunity}
                        onChange={(e) => setNewAgeOfOpportunity(e.target.value)}
                        placeholder={props.currentUser.ageOfOpportunity}
                        />
                    
                </div> 

                <div className='oppInputSections'>
                    <label className="EditOppLables">Organization name</label>
                    <input className='editOppInput' 
                    value={newOrgName} 
                    onChange={(e) => setNewOrgName(e.target.value)}
                    placeholder={props.currentUser.oppOrganization}
                    />
                    
                </div> 

                <div className='oppInputSections'>
                        
                    {/*Location type string input for edit*/}
                    <label className="EditOppLables">Location</label>
                    <input
                        className='editOppInput'
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder={props.currentUser.oppLocation}
                        /> 
                </div>  

                <div className='oppInputSections'>

                     {/*contactNumber type string input for edit*/}
                <label className="EditOppLables">Contact Number</label> 
                    <input
                        className='editOppInput'
                        type="text"
                        value={newContactNumber}
                        onChange={(e) => setNewContactNumber(e.target.value)}
                        placeholder={props.currentUser.oppContactNumber}
                        />
                </div> 

                <div className='editOppButtonSection'>  

                    {/*Return button to return to the ManageOpportunities*/}
                    <div className='editOppReturnSection'>

                        <button onClick={returnToVol}>Return</button>
                        
                    </div>
                    {/*Submit button to update the opportunity with the contents filled out in the form form*/}
                    <button onClick={handleSubmit} className="editOppSubmit">Submit</button>
                </div>
            </form>
            
            </div>

        </div>
    )
}


export default EditOpportunity;
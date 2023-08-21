import { useEffect, useState } from "react";
import "./EditVolunteerStyles.css";
import axios from "axios";

function EditVolunteer(props) {

  // States for all the attributes for each volunteer
  const [newUserName, setNewUserName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newVolPhoneNumber, setNewVolPhoneNumebr] = useState("");
  const [newPreferredCenterName, setNewPreferredCeneterName] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [newInterests, setNewInterests] = useState("");
  const [newAvailability, setNewAvailability] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [newCurrentLicense, setNewCurrentLicense] = useState("");
  const [newDriversLi, setNewDriversLi] = useState("");
  const [newEmContactName, setNewEMContactName] = useState("");
  const [newEmContactPhone, setNewEmContactPhone] = useState("");
  const [newEmContactEmail, setNewEmContactEmail] = useState("");
  const [newEmContactAddress, setNewEmContactAdress] = useState("");
  const [newSocialCardSaved, setNewSocialCardSaved] = useState("");
  const [newVolunteerApproved, setNewVolunteerApproved] = useState("");
  const [newAssignedOpp, setNewAssignedOpp] = useState("");

  // Returns to manage volunteers by changing the state of show edit
  // Re renders volunteers in manage volunteers
  function returnToVol() {

    props.setShowEdit(false);
    
    props.setRerender((prevRerender) => 

      !(prevRerender)

    );   
    
  }

  // Update the volunteer
  async function volSubmit(event) {
    event.preventDefault();
    console.log(newUserName);

    const updateVolunteer = {
      userName: newUserName,
      firstName: newFirstName,
      lastName: newLastName,
      password: newPassword,
      email: newEmail,
      volPhoneNumber: newVolPhoneNumber,
      preferredCenterName: newPreferredCenterName,
      skills: newSkills,
      interests: newInterests,
      availability: newAvailability,
      address: newAddress,
      education: newEducation,
      currentLicense: newCurrentLicense,
      driversLi: newDriversLi,
      emContactName: newEmContactName,
      emContactPhone: newEmContactPhone,
      emContactEmail: newEmContactEmail,
      emContactAddress: newEmContactAddress,
      socialCardSaved: newSocialCardSaved,
      volunteerApproved: newVolunteerApproved,
      assignedOpp: newAssignedOpp,
    };


    try {

      await axios.post(
        `http://localhost:3005/ManageVolunteers/${props.currentUser._id}`, updateVolunteer);
      

      returnToVol();
      
      
    } catch (error) {
      console.error("Error updating volunteer", error.message);
    }
  }

  return (
    <div className="EditVolunteer">
      <div className="editVolContainer">
        <form className="editVolunteerForm">
          <div className="editVolInputContainer">
            <div className="editVolInputArea">
              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Username</lable>

                <input
                  type="text"
                  value={newUserName}
                  placeholder={props.currentUser.userName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </div>
              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">First Name</lable>

                <input
                  type="text"
                  value={newFirstName}
                  placeholder={props.currentUser.firstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Last Name</lable>

                <input
                  type="text"
                  value={newLastName}
                  placeholder={props.currentUser.lastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Password</lable>

                <input
                  type="text"
                  value={newPassword}
                  placeholder={props.currentUser.password}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Email</lable>

                <input
                  type="text"
                  value={newEmail}
                  placeholder={props.currentUser.email}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Phone Number</lable>

                <input
                  type="text"
                  value={newVolPhoneNumber}
                  placeholder={props.currentUser.volPhoneNumber}
                  onChange={(e) => setNewVolPhoneNumebr(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Preferred Location</lable>

                <input
                  type="text"
                  value={newPreferredCenterName}
                  placeholder={props.currentUser.preferredCenterName}
                  onChange={(e) => setNewPreferredCeneterName(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Skills</lable>

                <input
                  type="text"
                  value={newSkills}
                  placeholder={props.currentUser.skills}
                  onChange={(e) => setNewSkills(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Interests</lable>

                <input
                  type="text"
                  value={newInterests}
                  placeholder={props.currentUser.interests}
                  onChange={(e) => setNewInterests(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Availability Times</lable>

                <input
                  type="text"
                  value={newAvailability}
                  placeholder={props.currentUser.availability}
                  onChange={(e) => setNewAvailability(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Address</lable>

                <input
                  type="text"
                  value={newAddress}
                  placeholder={props.currentUser.address}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Education Level</lable>

                <input
                  type="text"
                  value={newEducation}
                  placeholder={props.currentUser.education}
                  onChange={(e) => setNewEducation(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Current License</lable>

                <input
                  type="text"
                  value={newCurrentLicense}
                  placeholder={props.currentUser.currentLicense}
                  onChange={(e) => setNewCurrentLicense(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Driver License</lable>

                <input
                  type="text"
                  value={newDriversLi}
                  placeholder={props.currentUser.driversLi}
                  onChange={(e) => setNewDriversLi(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">EM Contact</lable>

                <input
                  type="text"
                  value={newEmContactName}
                  placeholder={props.currentUser.emContactName}
                  onChange={(e) => setNewEMContactName(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Em Contact Phone</lable>

                <input
                  type="text"
                  value={newEmContactPhone}
                  placeholder={props.currentUser.emContactPhone}
                  onChange={(e) => setNewEmContactPhone(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">EM Contact Email</lable>

                <input
                  type="text"
                  value={newEmContactEmail}
                  placeholder={props.currentUser.emContactEmail}
                  onChange={(e) => setNewEmContactEmail(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}

                <lable className="editVolLables">Em Contact Address</lable>

                <input
                  type="text"
                  value={newEmContactAddress}
                  placeholder={props.currentUser.emContactAddress}
                  onChange={(e) => setNewEmContactAdress(e.target.value)}
                />
              </div>

              <div className="editVolInputSections">
                {/* type string input for edit*/}
                <lable className="editVolLables">SSN on File</lable>

                <select
                  className="editVolSelect"
                  value={newSocialCardSaved}
                  placeholder={props.currentUser.socialCardSaved}
                  onChange={(e) => setNewSocialCardSaved(e.target.value)}
                >
                  <option value={"Yes"} selected>
                    Yes
                  </option>
                  <option value={"No"}>No</option>
                </select>
              </div>

              <div className="editVolInputSections">
                <label id="assignedOpp" className="volunteerlabel">
                  Assigned Opp
                </label>
                <select
                  type="text"
                  id="assignedOpp"
                  value={newAssignedOpp}
                  onChange={(e) => setNewAssignedOpp(e.target.value)}
                  required
                >
                  <option value="no">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="editVolInputSections">
                <label id="approvalstatus" className="volunteerlabel">
                  Approval Status
                </label>
                <select
                  type="text"
                  id="approvalstatus"
                  value={newVolunteerApproved}
                  onChange={(e) => setNewVolunteerApproved(e.target.value)}
                  required
                >
                  <option value="no">Not Approved</option>
                  <option value="yes">Approved</option>
                </select>
              </div>
            </div>
          </div>

          <div className="editVolButtonSection">
            {/*Return button to return to the ManageVolunteers*/}
            <div className="editVolReturnSection" >
        
                <button onClick={returnToVol}>Return</button>
        
            </div>

            {/*Submit button to update the volunteer with the contents filled out in the form:*/}
            <button className="editOppSubmit" onClick={volSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditVolunteer;

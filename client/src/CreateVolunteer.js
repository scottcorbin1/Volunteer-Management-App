import React from "react";
import CreateVolunteerNavbar from "./navbars/CreateVolunteerNavbar";
import { useState } from "react";
import axios from "axios";
import "./createvolunteer.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function CreateVolunteer() {
  // sets the initial states of the attributes for the database
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [volPhoneNumber, setVolPhoneNumber] = useState("");
  const [preferredCenterName, setPreferredCenterName] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [availability, setAvailability] = useState("");
  const [address, setAddress] = useState("");
  const [education, setEducation] = useState("");
  const [currentLicense, setCurrentLicense] = useState("");
  const [driversLi, setDriverLi] = useState("");
  const [emContactName, setEmContactName] = useState("");
  const [emContactPhone, setEmContactPhone] = useState("");
  const [emContactEmail, setEmContactEmail] = useState("");
  const [emContactAddress, setEmContactAddress] = useState("");
  const [socialCardSaved, setSocialCardSaved] = useState("no");
  const [volunteerApproved, setVolunteerApproved] = useState("no");
  const [assignedOpp, setAssignedOp] = useState("no");
  const [formErrors, setFormErrors] = useState({});

  // validates form data input
  const validateForm = () => {
    const errors = {};

    //testing userName input
    if (!userName) {
      errors.userName = "User Name is required";
    }
    if (userName.length < 6) {
      errors.userName = "Username must be 6 characters or more";
    }
    //testing name input to ensure its not empty
    if (!firstName) {
      errors.firstName = "First Name is required";
    }
    if (!lastName) {
      errors.lastName = "Last Name is required";
    }
    //testing email and format
    if (!email) {
      errors.email = "Email is required";
    } else if (!/.\@[^\s]+\.com$/.test(email)) {
      errors.email = "Enter valid email";
    }
    if (!interests) {
      errors.interests = "Interests is required";
    }
    if (!preferredCenterName) {
      errors.preferredCenterName = "Organization Name is required";
    }
    if (!skills) {
      errors.skills = "Location is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!education) {
      errors.education = "*Education is required";
    }
    if (!currentLicense) {
      errors.currentLicense = "Current license is required";
    }
    if (!driversLi) {
      errors.driversLi = "Drivers License is required";
    }
    if (!emContactName) {
      errors.emContactName = "Emergency Contact is required";
    }
    //testing input for emergency email
    if (!emContactEmail) {
      errors.emContactEmail = "Email is required";
    } else if (!/.\@[^\s]+\.com$/.test(emContactEmail)) {
      errors.emContactEmail = "Enter valid email";
    }
    if (!emContactPhone) {
      errors.emContactPhone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(emContactPhone)) {
      errors.emContactPhone = "Contact Number must be a 10-digit number";
    }
    if (!emContactAddress) {
      errors.emContactAddress = "Address is required";
    }
    if (!assignedOpp) {
      errors.assignedOpp = "Status is required";
    }
    if (!socialCardSaved) {
      errors.socialCardSaved = "Status is required";
    }
    if (!volunteerApproved) {
      errors.volunteerApproved = "Please select the status of the volunteer";
    }
    if (!availability) {
      errors.availability = "Availablity is required";
    }

    //testing phone number
    if (!volPhoneNumber) {
      errors.volPhoneNumber = "Contact Number is required";
    } else if (!/^[0-9]{10}$/.test(volPhoneNumber)) {
      errors.volPhoneNumber = "Contact Number must be a 10-digit number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function volSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      console.log("TestingValidate");
      return;
    }
    const formData = {
      userName,
      firstName,
      lastName,
      password,
      email,
      volPhoneNumber,
      preferredCenterName,
      skills,
      interests,
      availability,
      address,
      education,
      currentLicense,
      driversLi,
      emContactName,
      emContactPhone,
      emContactEmail,
      emContactAddress,
      socialCardSaved,
      volunteerApproved,
      assignedOpp,
    };

    console.log("FormData: ", formData);

    try {
      const response = await axios.post(
        "http://localhost:3005/CreateVolunteer",
        formData
      );
      navigate("/ManageVolunteers");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  // renders the page contents
  return (
    <div className="CreateVolunteer">
      <CreateVolunteerNavbar />
      <div className="volunteerform">
        <form className="form-container">
          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.userName && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.userName}
                </span>
              )}
            </div>
            <label id="username" className="volunteerlabel">
              UserName
            </label>
            <input
              type="text"
              id="username"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.firstName && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.firstName}
                </span>
              )}
            </div>
            <label id="firstname" className="volunteerlabel">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.lastName && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.lastName}
                </span>
              )}
            </div>
            <label id="lastname" className="volunteerlabel">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.password && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.password}
                </span>
              )}
            </div>
            <label id="password" className="volunteerlabel">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.email && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.email}
                </span>
              )}
            </div>
            <label id="email" className="volunteerlabel">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="youremail@somesite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.volPhoneNumber && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.volPhoneNumber}
                </span>
              )}
            </div>
            <label id="phonenumber" className="volunteerlabel">
              Phone Number
            </label>
            <input
              type="text"
              id="homenumber"
              placeholder="123-456-7890"
              value={volPhoneNumber}
              onChange={(e) => setVolPhoneNumber(e.target.value)}
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.preferredCenterName && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.preferredCenterName}
                </span>
              )}
            </div>
            <label id="preferredlocation" className="volunteerlabel">
              Preferred Location
            </label>
            <input
              type="text"
              id="preferredlocation"
              placeholder="Locations"
              value={preferredCenterName}
              onChange={(e) => setPreferredCenterName(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.skills && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.skills}
                </span>
              )}
            </div>
            <label id="skills" className="volunteerlabel">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              placeholder="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.interests && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.interests}
                </span>
              )}
            </div>
            <label id="Interests" className="volunteerlabel">
              Interests
            </label>
            <input
              type="text"
              id="Interests"
              placeholder="skills"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.availability && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.availability}
                </span>
              )}
            </div>
            <label id="timesAvailable" className="volunteerlabel">
              Availability Times
            </label>
            <input
              type="text"
              id="timesAvailable"
              placeholder="Times Available"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.address && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.address}
                </span>
              )}
            </div>
            <label id="address" className="volunteerlabel">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="123 gumdrop lane"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.education && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.education}
                </span>
              )}
            </div>
            <label id="education" className="volunteerlabel">
              Education Level
            </label>
            <input
              type="text"
              id="education"
              placeholder="highest level of education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.currentLicense && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.currentLicense}
                </span>
              )}
            </div>
            <label id="licenses" className="volunteerlabel">
              Current Licenses
            </label>
            <input
              type="text"
              id="licenses"
              placeholder="volunteer license"
              value={currentLicense}
              onChange={(e) => setCurrentLicense(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.driversLi && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.driversLi}
                </span>
              )}
            </div>
            <label id="driverlicense" className="volunteerlabel">
              Drivers License
            </label>
            <input
              type="text"
              id="driverlicense"
              placeholder="volunteer license"
              value={driversLi}
              onChange={(e) => setDriverLi(e.target.value)}
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.emContactName && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.emContactName}
                </span>
              )}
            </div>
            <label id="emergencycontact" className="volunteerlabel">
              EM Contact
            </label>
            <input
              type="text"
              id="emergencycontact"
              placeholder="contacts name"
              value={emContactName}
              onChange={(e) => setEmContactName(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.emContactPhone && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.emContactPhone}
                </span>
              )}
            </div>
            <label id="emrgencycontactsnumber" className="volunteerlabel">
              EM Contact Number
            </label>
            <input
              id="emrgencycontactsnumber"
              placeholder="123-456-7890"
              value={emContactPhone}
              onChange={(e) => setEmContactPhone(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.emContactEmail && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.emContactEmail}
                </span>
              )}
            </div>
            <label id="emrgencycontactsemail" className="volunteerlabel">
              EM Contact Email
            </label>
            <input
              type="text"
              id="emrgencycontactsemail"
              placeholder="Email"
              value={emContactEmail}
              onChange={(e) => setEmContactEmail(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.emContactAddress && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.emContactAddress}
                </span>
              )}
            </div>
            <label id="emrgencycontactsaddress" className="volunteerlabel">
              EM Contact address
            </label>
            <input
              type="text"
              id="emrgencycontactsaddress"
              placeholder="123 gumdrop Lane"
              value={emContactAddress}
              onChange={(e) => setEmContactAddress(e.target.value)}
              required
            />
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.socialCardSaved && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.socialCardSaved}
                </span>
              )}
            </div>
            <label id="ssnonfile" className="volunteerlabel">
              SSN on file
            </label>
            <select
              type="text"
              id="ssnonfile"
              placeholder="?"
              value={socialCardSaved}
              onChange={(e) => setSocialCardSaved(e.target.value)}
              required
            >
              <option value="No">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.assignedOpp && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.assignedOpp}
                </span>
              )}
            </div>
            <label id="assignedOpp" className="volunteerlabel">
              Assigned Opp
            </label>
            <select
              type="text"
              id="assignedOpp"
              value={assignedOpp}
              onChange={(e) => setAssignedOp(e.target.value)}
              required
            >
              <option value="no">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div className="volunteerinput">
            <div className="error-message">
              {formErrors.volunteerApproved && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />{" "}
                  {formErrors.volunteerApproved}
                </span>
              )}
            </div>
            <label id="approvalstatus" className="volunteerlabel">
              Approval Status
            </label>
            <select
              type="text"
              id="approvalstatus"
              value={volunteerApproved}
              onChange={(e) => setVolunteerApproved(e.target.value)}
              required
            >
              <option value="no">Not Approved</option>
              <option value="yes">Approved</option>
            </select>
          </div>

          <div className="volButton">
            <button className="submitButton" onClick={volSubmit}>
              Submit
            </button>

            <Link to="/ManageVolunteers">
              <button className="clearButton">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVolunteer;

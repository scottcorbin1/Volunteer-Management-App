import ManageVolunteerNavbar from "./navbars/ManageVolunteerNavbar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditVolunteer from "./EditVolunteer";
import axios from "axios";
import "./App.css";
import "./createvolunteer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function ManageVolunteers({ setIsLoggedIn }) {
  const [volunteers, setVolunteers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [sortOrder, setSortOrder] = useState(["asc"]);
  const [selectedApproved, setSelectedApproved] = useState("");
  const [selectedAssigned, setSelectedAssigned] = useState("");
  const [rerender, setRerender] = useState();

  useEffect(() => {
    // Fetch volunteer data from the server
    async function fetchVolunteers() {
      try {
        const response = await axios.get(
          "http://localhost:3005/ManageVolunteers"
        );
        if (response.data.success) {
          setVolunteers(response.data.volunteers);
          console.log(volunteers);
        } else {
          console.error("Error fetching volunteers:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchVolunteers();
  }, [rerender]);

  useEffect(() => {
    filterVolunteers();
  }, [volunteers, searchTerm]);

  function handleEditClick(volunteer) {
    setCurrentUser(volunteer);
    setShowEdit((prevEdit) => !prevEdit);
  }

  // handles deleting volunteers when the delete button is clicked
  async function handleDeleteVolunteer(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this volunteer?"
    );

    //confirm user wants to delete record
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3005/ManageVolunteers/${id}`
        );
        if (response.data.success) {
          // Remove the deleted opportunity from the state
          setVolunteers((prevVolunteers) =>
            prevVolunteers.filter((volunteer) => volunteer._id !== id)
          );
        } else {
          console.error("Error deleting opportunity:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // User canceled the deletion, do nothing or handle as needed
    }
  }

  // filters the volunteers
  function filterVolunteers() {
    if (!searchTerm) {
      setFilteredVolunteers(volunteers);
    } else {
      const filtered = volunteers.filter(
        (volunteer) =>
          volunteer.userName.includes(searchTerm) || // Filter by userName
          volunteer.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filter by firstName
          volunteer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by lastName
          volunteer.email.includes(searchTerm) || // Filter by email
          volunteer.volPhoneNumber.includes(searchTerm) || // Filter by volPhoneNumber
          volunteer.preferredCenterName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filter by preferredCenterName
          volunteer.skills.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by skills
          volunteer.interests
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filter by interests
          volunteer.education
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filter by education
          volunteer.currentLicense
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filter by currentLicense
          (volunteer.driversLi &&
            volunteer.driversLi
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) || // Filter by driversLi
          volunteer.emContactName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filter by emContactName
          volunteer.emContactPhone.includes(searchTerm) || // Filter by emContactPhone
          volunteer.emContactEmail.includes(searchTerm) || // Filter by emContactEmail
          volunteer.emContactAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filter by emContactAddress
          volunteer.socialCardSaved
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filter by socialCardSaved
          volunteer.volunteerApproved
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || // Filter by volunteerApproved
          volunteer.assignedOpp.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by assignedOpp
      );
      setFilteredVolunteers(filtered);
    }
  }

  useEffect(() => {
    // Filter opportunities based on selectedStatus and selectedTypeOfWork
    const filtered = volunteers.filter(
      (volunteer) =>
        (selectedApproved === "" ||
          volunteer.volunteerApproved.toLowerCase() ===
            selectedApproved.toLowerCase()) &&
        (selectedAssigned === "" ||
          volunteer.assignedOpp.toLowerCase() ===
            selectedAssigned.toLowerCase())
    );
    setFilteredVolunteers(filtered);
  }, [selectedApproved, selectedAssigned, volunteers]);

  function handleResetFilters() {
    setSelectedApproved("");
    setSelectedAssigned("");
  }

  // renders page contents
  return (
    <div className="ManageVolunteers">
      <ManageVolunteerNavbar setIsLoggedIn={setIsLoggedIn} />

      {showEdit ? (
        <EditVolunteer
          currentUser={currentUser}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          setIsLoggedIn={setIsLoggedIn}
          setRerender={setRerender}
        />
      ) : (
        <div>
          <div className="search-bar">
            <form>
              <input
                placeholder="&#xf002; Search..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* <button onClick={filterOpportunities}>Search</button> */}
            </form>
          </div>
          <h1 className="filter-vol">Filter by</h1>
          <span className="volunteer-filter-container">
            <form>
              <label>Volunteer Approval</label>
              <select
                name="Approval"
                value={selectedApproved}
                onChange={(e) => {
                  const newApproved = e.target.value;
                  setSelectedApproved(newApproved);
                }}
              >
                <option value="">Select approval status...</option>
                <option value="yes">Approved</option>
                <option value="no">Not approved</option>
              </select>
            </form>
            <form>
              <label>Opportunity assignment</label>
              <select
                name="assigned"
                value={selectedAssigned}
                onChange={(e) => {
                  const newAssigned = e.target.value;
                  setSelectedAssigned(newAssigned);
                }}
              >
                <option value="">Select approval status...</option>
                <option value="Yes">Assigned</option>
                <option value="no">Not assigned</option>
              </select>
            </form>
          </span>
          <div className="opp-table-container">
            <div className="opp-table">
              <table>
                <thead>
                  <tr>
                    <th>UserName</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone #</th>
                    <th>Pref Center</th>
                    <th>Skills</th>
                    <th>Interests</th>
                    {/* <th>Availability</th> commented out on 8/17 by JH
                <th>Address</th>
                <th>Education</th>
                <th>Current Li's</th>
                <th>Drivers Li</th>
                <th>Em Con Name</th>
                <th>Em Con Phone</th>
                <th>Em Con Email</th>
                <th>Em Con Address</th>
                <th>Social Card</th> */}
                    <th>Vol Appr</th>
                    <th>Assigned Opp</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVolunteers.map((volunteer) => (
                    <tr key={volunteer._id}>
                      <td>{volunteer.userName}</td>
                      <td>{volunteer.firstName}</td>
                      <td>{volunteer.lastName}</td>
                      <td>{volunteer.email}</td>
                      <td>{volunteer.volPhoneNumber}</td>
                      <td>{volunteer.preferredCenterName}</td>
                      <td>{volunteer.skills}</td>
                      <td>{volunteer.interests}</td>
                      {/* <td>{volunteer.availability}</td> commented out on 8/17 by JH
                  <td>{volunteer.address}</td>
                  <td>{volunteer.education}</td>
                  <td>{volunteer.currentLicense}</td>
                  <td>{volunteer.driversLi}</td>
                  <td>{volunteer.emContactName}</td>
                  <td>{volunteer.emContactPhone}</td>
                  <td>{volunteer.emContactEmail}</td>
                  <td>{volunteer.emContactAddress}</td>
                  <td>{volunteer.socialCardSaved}</td> */}
                      <td>{volunteer.volunteerApproved}</td>
                      <td>{volunteer.assignedOpp}</td>
                      <td>
                        <button
                          className="btnEdit"
                          onClick={() => handleEditClick(volunteer)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btnDelete"
                          onClick={() => handleDeleteVolunteer(volunteer._id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <button title="Create Opportunity" className="button">
          <Link className="color-text" to="/CreateVolunteer">
            <FontAwesomeIcon icon={faPlus} />
            Create Volunteer
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ManageVolunteers;

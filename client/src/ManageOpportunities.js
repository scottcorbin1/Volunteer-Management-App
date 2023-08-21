import React, { useState, useEffect } from "react";
import axios from 'axios';
import ManageOpportunitiesNavbar from './navbars/ManageOpportunityNavbar'
import EditOpportunity from "./EditOpportunity";
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faArrowUpWideShort, faPlus, faFileArrowDown} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'





function ManageOpportunities({ isLoggedIn, setIsLoggedIn }) {

    const navigate = useNavigate();

    // Used to hold the opportunities to display
    const [opportunities, setOpportunities] = useState([]);
    // Used to conditonally render the edit opportunities page
    const [showEdit, setShowEdit] = useState(false);
    // Used to handle the current user being edited
    const [currentUser, setCurrentUser] = useState({});
    // // Term to be searched
    const [searchTerm, setSearchTerm] = useState("");
    // filtered opportunities based on the two filters
    const [filteredOpportunities, setFilteredOpportunities] = useState([]);
    // Used to hold the state of the sort order
    const [sortOrder, setSortOrder] = useState(["asc"]);
    // Status filter
    const [selectedStatus, setSelectedStatus] = useState(""); 
    // Type of work filter
    const [selectedTypeOfWork, setSelectedTypeOfWork] = useState("");
    // Rerender the opportunities when one is updated
    const [rerender, setRerender] = useState();

    
    
    // Used to fetch all the opportunities, once when the page loads and then every time opp is updated
    useEffect(() => {
        // Fetch opportunities data from the server
        async function fetchOpportunities() {
            try {
                const response = await axios.get('http://localhost:3005/ManageOpportunities');
                if (response.data.success) {
                    setOpportunities(response.data.opportunities);
                } else {
                    console.error('Error fetching opportunities:', response.data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchOpportunities();
    }, [rerender]);

    // Whenever opportunities or search term is updated, re-filter the opportunities
    useEffect(() => {
        filterOpportunities();
    }, [opportunities, searchTerm]);

    // Updates the current user to be updated
    function handleEditClick(opportunity) {
        setCurrentUser(opportunity)
        setShowEdit((prevEdit) => !prevEdit);
        
    }

    // sorting the opportunity ID's
    // Sorting function
    function sortOpp(field, sortOrder, setSortOrder) {
        let newSortOrder;//declares new sort order


        //checks current sort order
        if (sortOrder === "asc") {
            newSortOrder = "desc";
        } else {
            newSortOrder = "asc";
        }
        //sets new sort order based on current state
        setSortOrder(newSortOrder);
        
        // Create a copy of the filteredOpportunities array and sort it using the provided comparison function.
        const sortedOpportunities = filteredOpportunities.slice().sort(function (opportunityA, opportunityB) {
            
            // Check if the sorting field is "opportunityID"
            if (field === "opportunityID") {

                //parse as int so sorting order is accurate based on ID value
                const id1 = parseInt(opportunityA[field]);
                const id2 = parseInt(opportunityB[field]);
                
                // Compare the opportunity IDs based on the newSortOrder
                if (newSortOrder === "asc") {
                    return id1 - id2; //opportunityA comes before opportunityB.
                } else {
                    return id2 - id1; // Positive: opportunityB comes before opportunityA.
                }
            } 
        });
    
        setFilteredOpportunities(sortedOpportunities);
    }
    //delete opportunity function
    async function handleDeleteOpportunity(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this opportunity?");
        
        //confirm user wants to delete record
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3005/ManageOpportunities/${id}`);
                if (response.data.success) {
                    // Remove the deleted opportunity from the state
                    setOpportunities(prevOpportunities => prevOpportunities.filter(opportunity => opportunity._id !== id));
                } else {
                    console.error('Error deleting opportunity:', response.data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // User canceled the deletion, do nothing or handle as needed
        }
    }

    function filterOpportunities() {

        if (!searchTerm) {
            // If search term is empty, show all opportunities
            setFilteredOpportunities(opportunities);
        } else {
            // Filter opportunities based on the search term
            const filtered = opportunities.filter(opportunity =>
                opportunity.opportunityID.includes(searchTerm) || 
                opportunity.oppWorkType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                opportunity.oppStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
                opportunity.oppLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                opportunity.oppOrganization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                opportunity.oppContactNumber.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
            setFilteredOpportunities(filtered);
        }
    }


    useEffect(() => {
        // Filter opportunities based on selectedStatus and selectedTypeOfWork
        const filtered = opportunities.filter(opportunity =>
            (selectedStatus === "" || opportunity.oppStatus === selectedStatus) &&
            (selectedTypeOfWork === "" || opportunity.oppWorkType === selectedTypeOfWork)
        );
        setFilteredOpportunities(filtered);
    }, [selectedStatus, selectedTypeOfWork, opportunities]);

    // Reset the filters
    function handleResetFilters() {
        setSelectedStatus("");
        setSelectedTypeOfWork("");
    }

    
//CSV Download

function downloadCSV(){
    
    //setting csv as array
    const csvData = []
    
    //setting headers of csv file
    const csvHeading =[
            'Opportunity ID', 
            'Type of Work',
            'Assigned Volunteer',
            'Status',
            'Age',
            'Location',
            'Organization name',
            'Contact number',
          ];

    //add headers to your csv
    csvData.push(csvHeading.join(","));

    filteredOpportunities.forEach(opportunity => {

        //set rows of your csv in array
        const csvRows = [
            opportunity.opportunityID,
            opportunity.oppWorkType,
            opportunity.assignedVolunteer,
            opportunity.oppStatus,
            opportunity.ageOfOpportununity,
            opportunity.oppLocation,
            opportunity.oppOrganization,
            opportunity.oppContactNumber
        ];

        csvData.push(csvRows.join(","));

    });

    const csvBlob = new Blob([csvData.join("\n")], {type: "text/csv"});

    const csvURL = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = "Opportunities.csv";
    link.click();

    URL.revokeObjectURL(csvURL);

    }//end of download CSV function  

    return (
        <div className="ManageOpportunities">
            <ManageOpportunitiesNavbar setIsLoggedIn={setIsLoggedIn}/>
            
            {showEdit ? (
                <EditOpportunity currentUser={currentUser} setShowEdit = {setShowEdit} setIsLoggedIn = {setIsLoggedIn} setRerender = {setRerender} />
            ) : (                
                <div className="opp-table">
                {/* Search form */}
                <form>
                    <input className="searchBar" placeholder="&#xf002; Search..." 
                        type="search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </form>
                <h3 className="opp-filterh3">Change Filter</h3>
                <span className="opp-filter">
                {/* Both filter forms */}
                <form>
                <label>By Status</label>
                <br />
                <select 
                    name="status"
                    value={selectedStatus}
                    onChange={(e) => {
                        const newStatus = e.target.value;
                        setSelectedStatus(newStatus);
                    }}
                >
                    <option value="">Select status...</option>
                    <option value="New">New</option>
                    <option value="inProgress">In progress</option>
                    <option value="Closed">Closed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                </form>
                <form>
                    <label>By Type of work</label>
                    <br />
                    <select 
                        name="typeOfWork"
                        value={selectedTypeOfWork}
                        onChange={(e) => {
                            const newWorkType = e.target.value;
                            setSelectedTypeOfWork(newWorkType);
                        }}
                        >
                        <option value="" selected>Choose an option</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Landscaping">Landscaping</option>
                        <option value="Cleaning">Cleaning services</option>
                    </select>
                </form>
                
                </span>
                <div className="reset-btn-box">
                    <button onClick={handleResetFilters} className="reset-btn">Reset</button> 
                    <button  title="Download as CVS" color="Navy" onClick={downloadCSV}><FontAwesomeIcon icon={faFileArrowDown} /></button>
                </div> 

               <div className="opp-table-container"> 
                <div className="opp-table">
                {/* Opportunities Table */}
                <table>
                    <thead>
                        <tr>
                            <th>Opportunity ID{"   "}
                                <button className="sort-btn" onClick={() => sortOpp("opportunityID", sortOrder,setSortOrder)}>
                                    <FontAwesomeIcon className="sort-btn" icon={faArrowUpWideShort} /></button>
                            </th>
                            <th>Type of Work</th>
                            <th>Assigned to Volunteer</th>
                            <th>Status</th>
                            <th>Age</th>
                            <th>Location</th>
                            <th>Organization name</th>
                            <th>Contact number</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through the filterred opportunities and create a new entry in the table */}
                        {filteredOpportunities.map(opportunity => (
                            <tr key={opportunity._id}>
                                <td>{opportunity.opportunityID}</td>
                                <td>{opportunity.oppWorkType}</td>
                                <td>{opportunity.assignedVolunteer}</td>
                                <td>{opportunity.oppStatus}</td>
                                <td>{opportunity.ageOfOpportunity} days</td>
                                <td>{opportunity.oppLocation}</td>
                                <td>{opportunity.oppOrganization}</td>
                                <td>{opportunity.oppContactNumber}</td>
                                
                                <td><button className="btnEdit" onClick={() => handleEditClick(opportunity)}><FontAwesomeIcon icon={faPenToSquare} />Edit</button>
                                
                                </td>
                                
                                <td>
                                    
                                    <button className="btnDelete" onClick={() => handleDeleteOpportunity(opportunity._id)}><FontAwesomeIcon icon={faTrashCan} /></button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
            )}
            {/* Link to create opportunity */}
            <div className="container">
                <button title='Create Opportunity' className="button">
                    <Link className="color-text" to="/CreateOpportunity"><FontAwesomeIcon icon={faPlus} />Create Opportunity</Link>
                </button>
                
            </div>
    </div>
    
    );
    
}

export default ManageOpportunities;
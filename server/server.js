// File used to start/ create API, make database queries, and handling post requests

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use(express.json());
const OpportunitiesModel = require("./models/opportunities.js");
const volunteersModel = require("./models/volunteers.js");
const AdminsModel = require("./models/admins.js");

// Connecting to database using a connect string
mongoose.connect("your connection string here");

// Creates a new opportunity in the database
app.post("/CreateOpportunity", async (req, res) => {
  try {
    const {
      opportunityID,
      oppWorkType,
      assignedVolunteer,
      oppStatus,
      ageOfOpportunity,
      oppLocation,
      oppOrganization,
      oppContactNumber,
    } = req.body;

    const newOpportunity = new OpportunitiesModel({
      opportunityID: opportunityID,
      oppWorkType: oppWorkType,
      assignedVolunteer: assignedVolunteer,
      oppStatus: oppStatus,
      ageOfOpportunity: ageOfOpportunity,
      oppLocation: oppLocation,
      oppOrganization: oppOrganization,
      oppContactNumber: oppContactNumber,
    });

    await newOpportunity.save();

    res.json({ success: true, message: "Opportunity created" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating opportunity" });
  }
});

// pulls opportunity data from database to render to the screen
app.get("/ManageOpportunities", async (req, res) => {
  try {
    const opportunities = await OpportunitiesModel.find();
    res.json({ success: true, opportunities });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching opportunities" });
  }
});

// used to edit opportunity data in the database
app.post("/ManageOpportunities/:id", async (req, res) => {
  try {
    const opportunityId = req.params.id;
    const updatedOpportunityData = req.body;

    // Fetch the existing opportunity data
    const existingOpportunity = await OpportunitiesModel.findById(
      opportunityId
    );

    // Create an object to store the updated fields
    const updatedFields = {};

    // Compare fields and populate the updatedFields object
    if (updatedOpportunityData.opportunityID) {
      updatedFields.opportunityID = updatedOpportunityData.opportunityID;
    }
    if (updatedOpportunityData.oppWorkType) {
      updatedFields.oppWorkType = updatedOpportunityData.oppWorkType;
    }
    if (updatedOpportunityData.assignedVolunteer) {
      updatedFields.assignedVolunteer =
        updatedOpportunityData.assignedVolunteer;
    }
    if (updatedOpportunityData.oppStatus) {
      updatedFields.oppStatus = updatedOpportunityData.oppStatus;
    }
    if (updatedOpportunityData.ageOfOpportunity) {
      updatedFields.ageOfOpportunity = updatedOpportunityData.ageOfOpportunity;
    }

    if (updatedOpportunityData.oppOrganization) {
      updatedFields.oppOrganization = updatedOpportunityData.oppOrganization;
    }

    if (updatedOpportunityData.oppLocation) {
      updatedFields.oppLocation = updatedOpportunityData.oppLocation;
    }
    if (updatedOpportunityData.oppContactNumber) {
      updatedFields.oppContactNumber = updatedOpportunityData.oppContactNumber;
    }

    // Update the existing opportunity with the updated fields
    const updatedOpportunity = await OpportunitiesModel.findByIdAndUpdate(
      opportunityId,
      { $set: updatedFields }, // Use $set to update only specified fields
      { new: true } // Return the updated document
    );

    res.json({ success: true, updatedOpportunity });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating opportunity" });
  }
});

// deletes an opportunity
app.delete("/ManageOpportunities/:id", async (req, res) => {
  try {
    const opportunityId = req.params.id;
    await OpportunitiesModel.findByIdAndDelete(opportunityId);
    res.json({ success: true, message: "Opportunity deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting opportunity" });
  }
});

// adds a volunteer to the database
app.post("/CreateVolunteer", async (req, res) => {
  try {
    const {
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
    } = req.body;

    const newVolunteer = new volunteersModel({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      volPhoneNumber: volPhoneNumber,
      preferredCenterName: preferredCenterName,
      skills: skills,
      interests: interests,
      availability: availability,
      address: address,
      education: education,
      currentLicense: currentLicense,
      driversLi: driversLi,
      emContactName: emContactName,
      emContactPhone: emContactPhone,
      emContactEmail: emContactEmail,
      emContactAddress: emContactAddress,
      socialCardSaved: socialCardSaved,
      volunteerApproved: volunteerApproved,
      assignedOpp: assignedOpp,
    });

    await newVolunteer.save();
    res.json({ success: true, message: "volunteer created" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating volunteer" });
  }
});

// pulls volunteer data from database to render to the screen
app.get("/ManageVolunteers", async (req, res) => {
  try {
    const volunteers = await volunteersModel.find();
    res.json({ success: true, volunteers });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching volunteers" });
  }
});

// deletes a volunteer by id
app.delete("/ManageVolunteers/:id", async (req, res) => {
  try {
    const volunteerId = req.params.id;
    await volunteersModel.findByIdAndDelete(volunteerId);
    res.json({ success: true, message: "volunteer deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting volunteer" });
  }
});

// updates volunteer data based on changes when sumbit button is pressed
app.post("/ManageVolunteers/:id", async (req, res) => {
  try {
    const volunteerId = req.params.id;
    const updatedVolunteerData = req.body;

    // Fetch the existing opportunity data
    const existingVolunteer = await volunteersModel.findById(volunteerId);

    // Create an object to store the updated fields
    const updatedFields = {};

    // Compare fields and populate the updatedFields object
    if (updatedVolunteerData.userName) {
      updatedFields.userName = updatedVolunteerData.userName;
    }
    if (updatedVolunteerData.firstName) {
      updatedFields.firstName = updatedVolunteerData.firstName;
    }
    if (updatedVolunteerData.lastName) {
      updatedFields.lastName = updatedVolunteerData.lastName;
    }
    if (updatedVolunteerData.password) {
      updatedFields.password = updatedVolunteerData.password;
    }
    if (updatedVolunteerData.email) {
      updatedFields.email = updatedVolunteerData.email;
    }
    if (updatedVolunteerData.volPhoneNumber) {
      updatedFields.volPhoneNumber = updatedVolunteerData.volPhoneNumber;
    }
    if (updatedVolunteerData.preferredCenterName) {
      updatedFields.preferredCenterName =
        updatedVolunteerData.preferredCenterName;
    }
    if (updatedVolunteerData.skills) {
      updatedFields.skills = updatedVolunteerData.skills;
    }
    if (updatedVolunteerData.interests) {
      updatedFields.interests = updatedVolunteerData.interests;
    }
    if (updatedVolunteerData.availability) {
      updatedFields.availability = updatedVolunteerData.availability;
    }
    if (updatedVolunteerData.address) {
      updatedFields.address = updatedVolunteerData.address;
    }
    if (updatedVolunteerData.education) {
      updatedFields.education = updatedVolunteerData.education;
    }
    if (updatedVolunteerData.currentLicense) {
      updatedFields.currentLicense = updatedVolunteerData.currentLicense;
    }
    if (updatedVolunteerData.driversLi) {
      updatedFields.driversLi = updatedVolunteerData.driversLi;
    }
    if (updatedVolunteerData.emContactName) {
      updatedFields.emContactName = updatedVolunteerData.emContactName;
    }
    if (updatedVolunteerData.emContactPhone) {
      updatedFields.emContactPhone = updatedVolunteerData.emContactPhone;
    }
    if (updatedVolunteerData.emContactEmail) {
      updatedFields.emContactEmail = updatedVolunteerData.emContactEmail;
    }
    if (updatedVolunteerData.emContactAddress) {
      updatedFields.emContactAddress = updatedVolunteerData.emContactAddress;
    }
    if (updatedVolunteerData.socialCardSaved) {
      updatedFields.socialCardSaved = updatedVolunteerData.socialCardSaved;
    }
    if (updatedVolunteerData.volunteerApproved) {
      updatedFields.volunteerApproved = updatedVolunteerData.volunteerApproved;
    }
    if (updatedVolunteerData.assignedOpp) {
      updatedFields.assignedOpp = updatedVolunteerData.assignedOpp;
    }
    console.log(volunteerId, updatedFields);

    // Update the existing opportunity with the updated fields
    const updatedVolunteer = await volunteersModel.findByIdAndUpdate(
      volunteerId,
      { $set: updatedFields }, // Use $set to update only specified fields
      { new: true } // Return the updated document
    );

    res.json({ success: true, updatedVolunteer });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating opportunity" });
  }
});

// adds an admin to the database
app.post("/CreateAdminAccount", async (req, res) => {
  try {
    const {
      adminUsername,
      adminFirstName,
      adminLastName,
      adminPassword,
      adminEmail,
      adminID,
    } = req.body;

    const checkUsername = await AdminsModel.findOne({
      adminUsername: adminUsername,
    });
    const checkEmail = await AdminsModel.findOne({ adminEmail: adminEmail });
    const checkID = await AdminsModel.findOne({ adminID: adminID });

    if (checkUsername) {
      res.json({ message: "Username already in use" });
    }
    if (checkEmail) {
      res.json({ message: "Email already in use" });
    }
    if (checkID) {
      res.json({ message: "ID already in use" });
    } else {
      const newAdminAccount = new AdminsModel({
        adminUsername: adminUsername,
        adminFirstName: adminFirstName,
        adminLastName: adminLastName,
        adminPassword: adminPassword,
        adminEmail: adminEmail,
        adminID: adminID,
      });

      await newAdminAccount.save();

      res.json("Admin account created");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating Admin Account" });
  }
});

// checks to see if the credentials for login match a database entry
app.post("/AdminLogin", async (req, res) => {
  const { username, password } = req.body;
  AdminsModel.findOne({ adminUsername: username }).then((user) => {
    console.log(user);
    if (user) {
      if (user.adminPassword === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.listen(3005, () => {
  console.log(`Server is running`);
});

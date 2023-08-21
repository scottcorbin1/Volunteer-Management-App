const mongoose = require("mongoose");

const volunteersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    volPhoneNumber: {
      type: String,
      required: true,
    },

    preferredCenterName: {
      type: String,
      required: true,
    },

    skills: {
      type: String,
      required: true,
    },

    interests: {
      type: String,
      required: true,
    },

    availability: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    currentLicense: {
      type: String,
      required: true,
    },

    driversLi: {
      type: String,
      required: false,
    },

    emContactName: {
      type: String,
      required: true,
    },

    emContactPhone: {
      type: String,
      required: true,
    },

    emContactEmail: {
      type: String,
      required: true,
    },

    emContactAddress: {
      type: String,
      required: true,
    },

    socialCardSaved: {
      type: String,
      required: true,
    },

    volunteerApproved: {
      type: String,
      required: true,
    },

    assignedOpp: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Volunteer",
  }
);

const volunteersModel = mongoose.model("volunteer", volunteersSchema);
module.exports = volunteersModel;

const mongoose = require('mongoose');


const opportunitySchema = new mongoose.Schema({
    
    opportunityID: {
        type: String,
        required: true,
    },

    oppWorkType: {
        type: String,
        required: true,
    },

    assignedVolunteer: {
        type: String,
        required: true,
    },

    oppStatus: {
        type: String,
        required: true,
    },

    ageOfOpportunity: {
        type: Number,
        required: true,
    },

    oppLocation: {
        type: String,
        required: true,
    },

    oppOrganization: {
        type: String,
        required: true,
    },

    oppContactNumber: {
        type: String,
        required: true,
    },

    
}, 
{ 
    collection: 'Opportunity'
});

const OpportunitiesModel = mongoose.model('Opportunity', opportunitySchema);

module.exports = OpportunitiesModel;
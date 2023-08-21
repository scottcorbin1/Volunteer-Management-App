const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({

    adminUsername:{
        type: String,
        required: true,
  
    },

    adminFirstName:{
        type: String,
        
    },

    adminLastName:{
        type: String,
        required: true,
    },

    adminPassword:{
        type: String,
        required: true,
    },

    adminEmail:{
        type: String,
        required: true,

        
    },

    adminID:{
        type: String,
        required: true,
        
    }

}, { 
    collection: 'Admin'
});

const AdminsModel = mongoose.model('Admin', adminSchema);
// module.exports = adminsModelModel;
module.exports = AdminsModel;
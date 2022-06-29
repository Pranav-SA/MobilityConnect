"use strict";

const mongoose = require("mongoose");

// Define the tickets schema
const schema = new mongoose.Schema({
    //the type of ticket- Day ticket, Airport ticket, etc. 
    type: {
        type: String,
        required: true,
    },
    //amount paid for the ticket
    price: {
        type: String,
        required: true,
    },
    //enter date
    validity: {
        type: String,
    },
    //who bought it
    user: {
        type: String,
        required: true,
    },

    // start: {
    //     type: String,
    //     required: true,
    // },
    // destination: {
    //     type: String,
    //     required: true,
    // },
    // minutes: {
	// type: Array,  
    // }
});

schema.set("versionKey", false);

// Export the model
module.exports = mongoose.model("Tickets", schema);

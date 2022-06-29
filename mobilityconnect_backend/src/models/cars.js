"use strict";

const mongoose = require("mongoose");

// Define the package schema
const schema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
    },
    numberPlate: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    locationParked: {
        type: Array,
        required: true,
    },
    fuelLevel: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    mileage: {
        type: Array
    },
    img: {
	    type: String
    },
    available: {
        type: Boolean
    }
});

schema.set("versionKey", false);

// Export the model
module.exports = mongoose.model("Cars", schema);

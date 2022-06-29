"use strict";

const mongoose = require("mongoose");

// Define the package schema
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    subheader: {
        type: String,
    },
    description: {
        type: Array,
        required: true,
    },
    buttonText: {
        type: String,
        required: true,
    },
    buttonVariant: {
        type: String,
        required: true,
    },
    minutes: {
        type: Array
    } 
});

schema.set("versionKey", false);

// Export the model
module.exports = mongoose.model("Packages", schema);

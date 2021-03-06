"use strict";

const mongoose = require("mongoose");

// Define the user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },

    birthday: {
        type: Date,
        required: true,

    },

    // role of the user, used for rights management
    role: {
        type: String,
        // role can only take the value "member" and "admin"
        enum: ["member", "admin"],
        // if not specified the role member is choosen
        default: "member",
    },

     //order: Bike, Car, Scooter, Stripes and Wallet Topup
     minutes: {
        type: Array,
        default: [0,0,0,0,0,0,0]
    },
});

UserSchema.set("versionKey", false);

// Export the model
module.exports = mongoose.model("User", UserSchema);

"use strict";

const packageModel = require("../models/packages");

const list = async (req, res) => {
    try {
        // get all packages in database
        let packages = await packageModel.find({}).exec();

        return res.status(200).json(packages);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    list
};

"use strict";

const carModel = require("../models/cars");

const list = async (req, res) => {
    try {
        // get cars in database
        // let cars = await carModel.find({}).exec();
        var total = await carModel.count({ available: true });
        var random = Math.floor(Math.random()*total+1);
        let cars = await carModel.aggregate([ {$match: { available: true } }, { $sample: { size: random }} ])
        return res.status(200).json(cars);
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

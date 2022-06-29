"use strict";

const express = require("express");
const router = express.Router();

const CarsController = require("../controllers/cars");

router.route('/nearbycars').get(CarsController.list);
module.exports = router
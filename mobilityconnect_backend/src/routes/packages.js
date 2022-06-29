"use strict";

const express = require("express");
const router = express.Router();

const PackageController = require("../controllers/packages");

router.route('/').get(PackageController.list);
module.exports = router
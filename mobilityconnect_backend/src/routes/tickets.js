"use strict";

const express = require("express");
const router = express.Router();

const TicketController = require("../controllers/tickets");

router.route('/listTickets/:user').get(TicketController.list);
router.route('/generateTicket').post(TicketController.generate);
router.route('/deleteTickets/:id').delete(TicketController.remove)


module.exports = router
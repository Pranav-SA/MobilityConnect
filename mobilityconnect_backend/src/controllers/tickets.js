"use strict";
const ticketModel = require("../models/tickets");

const list = async (req, res) => {
    try {
        // get all packages in database
        let tickets = await ticketModel.find({user: req.params.user}).exec();
        return res.status(200).json(tickets);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const generate = async (req, res) => {
	// check if the body of the request contains all necessary properties
	if (!Object.prototype.hasOwnProperty.call(req.body, "user"))
	   return res.status(400).json({
	       error: "Bad Request",
	       message: "The request body must contain an associated user property",
	   });
       
//        if (!Object.prototype.hasOwnProperty.call(req.body, "start"))
//        return res.status(400).json({
// 	   error: "Bad Request",
// 	   message: "The request body must contain a start property",
//        });
   
//        if (!Object.prototype.hasOwnProperty.call(req.body, "destination"))
// 	   return res.status(400).json({
// 	       error: "Bad Request",
// 	       message: "The request body must contain a destination property",
// 	   });
   
        // handle the request
	try{
	//generate ticket
	const ticket = {
		type: req.body.type,
		price: req.body.price,
		validity: req.body.validity,
		user: req.body.user,
		//start: req.body.start,
		//destination: req.body.destination,
		//minutes: req.body.minutes
	}
	let retTicket = await ticketModel.create(ticket);
	res.status(200).json({
		ticket: retTicket,
	});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		});
	}
}

const remove = async (req, res) => {
    try {
        // find and remove ticket
        await ticketModel.findByIdAndRemove(req.params.id).exec();

        // return message that ticket was deleted
        return res
            .status(200)
            .json({ message: `Ticket with id${req.params.id} was deleted` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    list,
    generate,
	remove
};

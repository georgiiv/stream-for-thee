const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");
const Chat = require("../services/chat");
const Helpers = require("../helpers/helpers");

router.get('/', async (req, res) => {
	res.send(req.user);
});

router.post('/:username', Helpers.checkAuthenticated, async (req, res) => {
	let message = req.body.message;

	let reciever = await db.User.findByUsername(req.params.username);
	if (reciever){
		if( message==null || /^\s+$/.test(message) || message == ""){
			res.status(422).send("Blank messages not allowed");
		}else{			
			await db.Chat.createMessage(req.user.id, reciever.id, message);	
			Chat.sendToRoom(req.user.userName, reciever.userName, message);
			res.status(200).send("Message successfully sent");
		}
	}else{
		res.status(404).send("Reciever not found");
	}
});

module.exports = router;
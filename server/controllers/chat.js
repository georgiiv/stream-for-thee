const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");
const Chat = require("../services/chat");

router.get('/', async (req, res) => {
	res.send(req.user);
});

router.post('/:username', async (req, res) => {
	let message = req.body.message;

	let reciever = await db.User.findByUsername(req.params.username);
	if (reciever){
		await db.Chat.createMessage(req.user.id, reciever.id, message);	
		Chat.sendToRoom(reciever.userName, message);
	}else{
		res.send(404, "Reciever not found")
	}
});

module.exports = router;
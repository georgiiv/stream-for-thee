const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");

router.get('/', async (req, res) => {
	res.send(req.user);
});

router.post('/:username', async (req, res) => {
	let message = req.body.message;

	let reciever = await db.User.findByUsername(req.params.username);
	if (reciever){
		await db.Chat.createMessage(req.user.id, reciever.id, message);
		res.send("Message inserted");
	}else{
		res.send(404, "Reciever not found")
	}
});

//testing purposes only
router.get('/:username', async (req, res) => {
	let message = req.query.message;

	let reciever = await db.User.findByUsername(req.params.username);
	if (reciever){
		await db.Chat.createMessage(req.user.id, reciever.id, message);
		res.send("Message inserted");
	}else{
		res.send(404, "Reciever not found")
	}
});

module.exports = router;
const router = require('express').Router();
const db = require("../models/");

router.get('/', async (req, res) => {
	res.send(await db.User.findAll());
});

router.post('/', async (req, res) => {
	const {username, email, password, repeatPassword} = req.body;	
	test = await db.User.createUser(username, email, password, repeatPassword);

	res.send(test);
});

module.exports = router;
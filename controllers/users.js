const router = require('express').Router();
const db = require("../models/");

router.get('/', async (req, res) => {
	res.send(await db.User.findAll());
});

router.post('/', async (req, res) => {
	const {username, email, password, repeatPassword} = req.body;

	if(await db.User.findByUsername(username)){
		console.log("wtffffffffff")
		res.send("Username already exists");
	}
	else if(await db.User.findByEmail(email)){
		console.log("wtaaaaaaaaaa")
		res.send("Email already exists");
	}else{
		console.log("zzzzzzzzzzzzzzz")
		await db.User.createUser(username, email, password, repeatPassword);
		res.send("User created");
	}
});

module.exports = router;
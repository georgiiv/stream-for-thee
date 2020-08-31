const router = require('express').Router();
const db = require("../models/");

router.get('/', async (req, res) => {
	res.send(await db.User.findAll());
});

router.post('/', async (req, res) => {
	res.send(await db.User.findAll());
});

module.exports = router;
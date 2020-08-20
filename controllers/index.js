const router = require('express').Router();
const db = require("../models/");

router.get('/', (req, res) => {
	res.send(db.User.findAll());
});

module.exports = router;
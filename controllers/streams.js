const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");


router.get('/', async (req, res) => {
	res.send("Oi")
});

router.get('/:username', async (req, res) => {

});

module.exports = router;
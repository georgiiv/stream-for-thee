const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");
const Encoder = require("../services/encoder")


router.get('/', async (req, res) => {
	console.log(Encoder.getStreams())
	streams = await db.Stream.findAll({
		where: {
			id: Encoder.getStreams()
		}
	})
	res.send(streams);
});

router.get('/:username', async (req, res) => {

});

module.exports = router;
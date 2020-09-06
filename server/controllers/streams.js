const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");
const Encoder = require("../services/encoder")


router.get('/', async (req, res) => {
	console.log(Encoder.getStreams())
	streams = await db.Stream.findAll({
		where: {id: Encoder.getStreams()},
		include: [{
			model: db.User,
			attributes: ['id', 'userName']
		}]
	})
	res.send(streams);
});

router.get('/:username', async (req, res) => {
	stream = await db.Stream.findOne({
		attributes: ['id', 'streamName', 'streamPath', 'playList', 'createdAt'],
		where: { id: Encoder.getStreams() },
		include: [{
			model: db.User,
			attributes: ['id', 'userName'],
			where: { userName: req.params.username }
		}]
	})
	res.send(stream);
});

module.exports = router;
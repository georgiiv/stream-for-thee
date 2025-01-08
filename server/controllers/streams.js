const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");
const Encoder = require("../services/encoder")

// Returns all current livestreams
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

// Returns information about specific stream/video
router.get('/id/:id', async (req, res) => {
	stream = await db.Stream.findOne({
		attributes: ['id', 'streamName', 'streamPath', 'playList', 'createdAt'],
		where: { id: req.params.id },
		include: [{
			model: db.User,
			attributes: ['id', 'userName', 'profilePicture']
		}]
	})
	res.send(stream);
});

// Returns information about current livestream of user
router.get('/:username', async (req, res) => {
	stream = await db.Stream.findOne({
		attributes: ['id', 'streamName', 'streamPath', 'playList', 'createdAt'],
		where: { id: Encoder.getStreams() },
		include: [{
			model: db.User,
			attributes: ['id', 'userName', 'profilePicture'],
			where: { userName: req.params.username }
		}]
	})
	if(stream){
		res.send({
			live: true,
			stream: stream
		});
	}
	else{
		res.send({
			live: false
		});
	}
});

module.exports = router;
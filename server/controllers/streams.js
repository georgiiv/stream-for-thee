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
		console.log("i am online \n\n\n\n\n\n\n\n")
		res.send({
			live: true,
			stream: stream
		});
	}
	else{
		console.log("i am offline \n\n\n\n\n\n\n\n")
		res.send({
			live: false
		});
	}
});

module.exports = router;
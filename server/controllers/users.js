const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");

// Returns the id from provided username
router.get('/:username', async (req, res) => {
	user = await db.User.findOne({
		attributes: ['id', 'userName'],
		where: { userName: req.params.username }
	})
	res.send(user);
});

// Returns all current and past streams/videos of a user
router.get('/:username/videos', async (req, res) => {
	videos = await db.User.findOne({
		attributes: ['id', 'userName'],
		where: { userName: req.params.username },
		include: [{
			model: db.Stream,
			attributes: ['id', 'streamName', 'thumbnail', 'streamPath', 'playList', 'createdAt']
		}]
	})
	res.send(videos);
});

module.exports = router;
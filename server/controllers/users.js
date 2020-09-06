const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");

router.get('/', async (req, res) => {
	res.send(req.user);
});

router.get('/:username', async (req, res) => {
	user = await db.User.findOne({
		attributes: ['id', 'userName'],
		where: { userName: req.params.username }
	})
	res.send(user);
});

router.get('/:username/videos', async (req, res) => {
	videos = await db.User.findOne({
		attributes: ['id', 'userName'],
		where: { userName: req.params.username },
		include: [{
			model: db.Stream,
			attributes: ['id', 'streamName', 'streamPath', 'playList', 'createdAt']
		}]
	})
	res.send(videos);
});

module.exports = router;
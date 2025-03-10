const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");
const Helpers = require("../helpers/helpers");

// Return information about the current authenticated user
router.get('/', Helpers.checkAuthenticated, async (req, res) => {
	res.send({
		id: req.user.id,
		userName: req.user.userName,
		email: req.user.email,
		profilePicture: req.user.profilePicture,		
		streamKey: req.user.streamKey,
		createdAt: req.user.createdAt,
		updatedAt: req.user.updatedAt,
	});
});

// Create session and login
router.post('/login', async (req, res) => {
	passport.authenticate("local", function (err, user, info) {
		if (err) { return next(err); }
		// user will be set to false, if not authenticated
		if (!user) {
			//info contains the error message
			res.status(401).json(info);
		} else {
			// if user authenticated maintain the session
			req.logIn(user, function () {
				res.send("Authenticated")
			})
		}
	})(req, res);
});

// User creation
router.post('/register', async (req, res) => {
	const { username, email, password, repeatPassword } = req.body;

	if (await db.User.findByUsername(username)) {
		res.status(409).send("Username already exists.");
	}
	else if (await db.User.findByEmail(email)) {
		res.status(409).send("Email already exists.");
	}
	else if (password != repeatPassword) {
		res.status(409).send("Passwords don't match.");
	}
	else {
		await db.User.createUser(username, email, password, repeatPassword);
		res.status(200).send("User created.");
	}
});

// Destroy session and logout
router.delete('/login', async (req, res) => {
		req.logout();
		res.status(200).send("Logged out.");
});

module.exports = router;
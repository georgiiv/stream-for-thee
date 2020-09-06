const router = require('express').Router();
const passport = require("passport");
const db = require("../models/");

router.get('/', async (req, res) => {
	res.send(req.user);
});

router.get('/login', async (req, res) => {
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

router.post('/register', async (req, res) => {
	const { username, email, password, repeatPassword } = req.body;

	if (await db.User.findByUsername(username)) {
		res.send("Username already exists.");
	}
	else if (await db.User.findByEmail(email)) {
		res.send("Email already exists.");
	}
	else if (password != repeatPassword) {
		res.send("Passwords don't match.");
	}
	else {
		await db.User.createUser(username, email, password, repeatPassword);
		res.send("User created.");
	}
});

router.get('/logout', async (req, res) => {
		req.logout();
		res.send("Loged out.");
});

module.exports = router;
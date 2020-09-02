const LocalStrategy = require("passport-local").Strategy;
const db = require("./models");
const bcrypt = require("bcrypt");

function initialise(passport) {
	console.log("Passport initialised")

	const authenticateUser = async (username, password, done) => {
		let user;
		if (user = await db.User.findOne({ where: { userName: username } })) {
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) {
					console.log(err);
				}
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: "Password is incorrect" });
				}
			});
		} else {
			return done(null, false, { message: "No user with that username" });
		}
	}

	passport.use(new LocalStrategy({ usernameField: "username", passwordField: "password" }, authenticateUser))

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		let user = await db.User.findOne({ where: { id: id } });
		return done(null, user);
	})
}

module.exports = initialise;
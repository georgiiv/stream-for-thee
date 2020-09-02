const LocalStrategy = require("passport-local").Strategy;
const db = require("./models");
const bcrypt = require("bcrypt");

function initialise(passport) {
	console.log("Passport initialised")

	const authenticateUser = async (username, password, done) => {
		let User;
		if (User = await db.User.findOne({ where: { userName: username } })) {
			bcrypt.compare(password, User.password, (err, isMatch) => {
				if (err) {
					console.log(err);
				}
				if (isMatch) {
					return done(null, User);
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
		await db.User.findOne({ where: { id: id } });
		return done(null, db.User);
	})
}

module.exports = initialise;
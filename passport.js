const LocalStrategy = require("passport-local").Strategy;
const db = require("./models");
const bcrypt = require("bcrypt");

function initialise(passport){
	console.log("Passport initialised")

	const authenticateUser = async (username, password, done) => {
		let User;
		if(User = await db.User.findOne({where: {username: username}})){
			if(User.password == password){
				return done(null, User);
			}
		}
	}

	passport.use(new LocalStrategy({usernameField: "username", passwordField: "password"}, authenticateUser))

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		await db.User.findOne({where: {id: id}});
		return done(null, db.User);
	})
}

module.exports = initialise;
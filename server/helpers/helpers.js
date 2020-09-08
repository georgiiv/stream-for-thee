class Helpers{
	static checkAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		}else{
			res.status(401).send("Unauthorized");
		}
	}
}

module.exports = Helpers;
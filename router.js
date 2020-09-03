const express = require('express');
const serveStatic = require('serve-static');
const passport = require("passport");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passportStrategy = require("./passport")

const port = require("./config/express").port;

const app = express();
app.use(express.json());
app.use(session({
	store: new FileStore(),
	secret: "secret",
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passportStrategy(passport);

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Expose-Headers', 'Content-Length');
	res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
	if (req.method === 'OPTIONS') {
		return res.send(200);
	} else {
		return next();
	}
});



const users = require("./controllers/users");
const streams = require("./controllers/streams");



app.use('/api/users', users);
app.use('/api/streams', streams);



app.use('/', serveStatic('./public/client/'));
app.use(serveStatic('./public'));



app.run = () => {
	app.listen(port, function () {
		console.log('Server started on port:', port);
	})
}

module.exports = app
const express = require('express');
const serveStatic = require('serve-static');
const passport = require("passport");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passportStrategy = require("./passport")

const port = 8080;

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



const users = require("./controllers/users");



app.use('/api/users', users);



app.use('/', serveStatic('./public/client/'));
app.use(serveStatic('./public'));



app.run = () => {
	app.listen(port, function () {
		console.log('Server started on port:', port);
	})
}

module.exports = app
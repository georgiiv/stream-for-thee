const express = require('express');
const app = express();
const server = require('http').Server(app); // socket.io needs this
const serveStatic = require('serve-static');
const passport = require("passport");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passportStrategy = require("./passport");

const Chat = require('./services/chat').init(server);

const port = require("./config/express").port;

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
const auth = require("./controllers/auth");
const chat = require("./controllers/chat");



app.use('/api/users', users);
app.use('/api/streams', streams);
app.use('/api/auth', auth);
app.use('/api/chat', chat);




//app.use('/', serveStatic('./public/client/'));
app.use(serveStatic('./public'));



app.run = () => {
	server.listen(port, function () {
		console.log('Server started on port:', port);
	})
}

module.exports = app
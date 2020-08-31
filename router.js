const express = require('express')
var serveStatic = require('serve-static')
const app = express();

let port = 8080;



const users = require("./controllers/users");



app.use('/api/users', users);



app.use('/', serveStatic('./public/client/'))
app.use(serveStatic('./public'))

app.run = () => {
	app.listen(port, function () {
		console.log('Server started on port:', port);
	})
}

module.exports = app
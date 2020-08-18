const express = require('express')
const app = express();

let port = 8080;



const index = require("./routes/index");

app.use('/', index);




app.run = () => {
	app.listen(port, function () {
		console.log('Server started on port:', port);
	})
}

module.exports = app
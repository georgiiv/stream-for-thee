const router = require("./router");
const nms = require("./rtmp");
const db = require("./models")

// sequelize.authenticate()
//     .then(() => console.log('Database connected...'))
//     .catch(err => console.log('Error: ' + err))
// router.run();
// nms.run();

db.sequelize.authenticate().then(()=>{
	router.run();
	nms.run();
})

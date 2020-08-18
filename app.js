const router = require("./router");
const nms = require("./rtmp");
const sequelize = require("./config/sequelize")

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))
router.run();
nms.run();

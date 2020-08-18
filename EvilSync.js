const sequelize = require("./config/sequelize")

sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

require("./models/user").sync({ force: true })
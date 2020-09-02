const db = require("./models")

db.sequelize.sync({force: true})
.then(() => {
	console.log('Database connected...')
	test();	
})
.catch(err => console.log('Error: ' + err));

async function test(){
	await db.User.createUser("pesho", "pesho@pesho", "1234");
	await db.User.createUser("atanas", "asd@asd", "1234");

	var res = await db.User.findOne({where: {email: "pesho@pesho"}})
	var res2 = await db.User.findByStreamKey("1234");
	console.log(res.userName)
	console.log(res.get("userName"))
	console.log(res.getDataValue("userName"))
	console.log(res.getName())
	console.log(res.userName, "maybe");
}
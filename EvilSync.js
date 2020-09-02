const db = require("./models")

db.sequelize.sync({force: true})
.then(() => {
	console.log('Database connected...')

	db.User.bulkCreate([
		{
			userName: "pesho",
			email: "pesho@pesho",
			password: "1234",
			salt: "asd",
			streamKey: "1234",
		},
		{
			userName: "anton",
			email: "anton@anton",
			password: "1234",
			salt: "dsa",
			streamKey: "12345",
		}
	]).then(()=>{
		testSelect();
	})
	
})
.catch(err => console.log('Error: ' + err));

async function testSelect(){
	var res = await db.User.findOne({where: {email: "pesho@pesho"}})
	var res2 = await db.User.findByStreamKey("1234");
	console.log(res.userName)
	console.log(res.get("userName"))
	console.log(res.getDataValue("userName"))
	console.log(res.getName())
	console.log(res.userName, "maybe");
}
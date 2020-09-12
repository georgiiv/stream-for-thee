const db = require('../models/index.js');

let testUser;

beforeAll( async () => {
	await db.sequelize.authenticate();
	testUser = await db.User.createUser("6eyerth", "ery6htyh@dfthks", "ssfdghjs")
});

afterAll( async () => {	
	await db.User.destroy({
		where: {id: testUser.id}
	});
	await db.sequelize.close();
});

test('Test denial of creation of user with existing email', async () => {
	try{		
		user = await db.User.createUser("testsdfbdgsdbdfguser1", testUser.email, "parola")
	}catch(e){
		expect(e);
	}
});

test('Test denial creation of user with existing username', async () => {
	try{		
		user = await db.User.createUser(testUser.userName, "dfgdfgdfg1@tsdfghsfghsfdgh", "parola")
	}catch(e){
		expect(e);
	}
});

test('Tests creation of user', async () => {
	user = await db.User.createUser("ssdrsdfgs", "sdfhbsdfthsd@sdfhsfdhn", "parola")
	expect(user.userName).toBe("ssdrsdfgs");

	await db.User.destroy({
		where: {id: user.id}
	});
});

test('Test find user by email', async () => {
	user = await db.User.findByEmail(testUser.email)
	expect(testUser.id).toBe(user.id);
});

test('Test find user by streamKey', async () => {
	user = await db.User.findByStreamKey(testUser.streamKey)
	expect(testUser.id).toBe(user.id);
});

test('Test find user by userName', async () => {
	user = await db.User.findByUsername(testUser.userName)
	expect(testUser.id).toBe(user.id);
});
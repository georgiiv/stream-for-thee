const db = require('../models/index.js');

let testUser;

beforeAll( async () => {
	await db.sequelize.authenticate();
	testUser = await db.User.createUser("rsdfgfggsdvs", "fgstynsdrth@dfntyudfh", "dfnhfgdfdfh")
});

afterAll( async () => {
	await db.User.destroy({
		where: {userName: testUser.userName}
	});
	await db.sequelize.close();
});

test('Test creation of new stream', async () => {	
	newStream = await db.Stream.createStream(testUser);
	expect(newStream.userId).toBe(testUser.id);
	await db.Stream.destroy({
		where: {id: newStream.id}
	});
});

test('Test deletion of stream', async () => {
	newStream = await db.Stream.createStream(testUser);
	result = await db.Stream.deleteStreamWithId(newStream.id);
	expect(result).toBe(true);
});
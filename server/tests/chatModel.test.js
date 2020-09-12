const db = require('../models/index.js');

let testUser1;
let testUser2;

beforeAll( async () => {
	await db.sequelize.authenticate();
	testUser1 = await db.User.createUser("dsbdrtyrsfdg", "dfgbs56@sdby5srb", "sdfbgs6y")
	testUser2 = await db.User.createUser("sbd5ysb", "sb5ygs@sdby56br", "sb56gdfg")
});

afterAll( async () => {	
	await db.User.destroy({
		where: {id: testUser1.id}
	});
	await db.User.destroy({
		where: {id: testUser2.id}
	});
	await db.sequelize.close();
});

test('Test creation of chat message', async () => {
	let message = await db.Chat.createMessage(testUser1.id, testUser2.id, "message");	
	expect(message.senderId).toBe(testUser1.id);
	expect(message.recieverId).toBe(testUser2.id);
	await db.Chat.destroy({
		where: {id: message.id}
	})
});

test('Test deletion of chat message', async () => {
	let message = await db.Chat.createMessage(testUser1.id, testUser2.id, "message");
	let result = await db.Chat.deleteMessageWithId(message.id);
	expect(result).toBe(true)
});
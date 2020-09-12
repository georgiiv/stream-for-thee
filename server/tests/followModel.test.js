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

test('Test user1 following user2', async () => {
	let follow = await db.Follow.createFollow(testUser1, testUser2);	
	expect(follow.followerId).toBe(testUser1.id);
	expect(follow.followingId).toBe(testUser2.id);
});

test('Test user1 unfollowing user2', async () => {
	let result = await db.Follow.deleteFollow(testUser1, testUser2);
	expect(result).toBe(true)
});
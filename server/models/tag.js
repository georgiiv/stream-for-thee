module.exports = (sequelize, DataTypes) => {
	const Tag = sequelize.define('Tag', {		
		// Model attributes are defined here
		tagName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
	}, {
		// Other model options go here
	});

	// Follow.associate = models => {
	// 	Chat.belongsTo(models.User, {
	// 		foreignKey: {
	// 			name: 'followerId',
	// 			allowNull: false
	// 		}
	// 	});
	// 	Chat.belongsTo(models.User, {
	// 		foreignKey: {
	// 			name: 'followingId',
	// 			allowNull: false
	// 		}
	// 	});
	// }

	// Follow.createFollow = async function(follower, following){
	// 	follow = await Follow.build({
	// 		followerId: follower,
	// 		followingId: following
	// 	}).save();

	// 	return follow;
	// }

	return Tag;
}
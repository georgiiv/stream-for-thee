module.exports = (sequelize, DataTypes) => {
	const Follow = sequelize.define('Follow', {
	
	}, {
		// Other model options go here
	});

	Follow.associate = models => {
		Follow.belongsTo(models.User, {
			foreignKey: {
				name: 'followerId',
				allowNull: false
			}
		});
		Follow.belongsTo(models.User, {
			foreignKey: {
				name: 'followingId',
				allowNull: false
			}
		});
	}

	Follow.createFollow = async function(follower, following){
		follow = await Follow.build({
			followerId: follower.id,
			followingId: following.id
		}).save();

		return follow;
	}

	Follow.deleteFollow = async function(follower, following){
		await Follow.destroy({
			where: {
				followerId: follower.id,
				followingId: following.id
			}
		});

		return true;
	}

	return Follow;
}
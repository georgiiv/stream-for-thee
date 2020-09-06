module.exports = (sequelize, DataTypes) => {
	const Chat = sequelize.define('Chat', {
		// Model attributes are defined here
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	}, {
		// Other model options go here
	});

	Chat.associate = models => {
		Chat.belongsTo(models.User, {
			foreignKey: {
				name: 'senderId',
				allowNull: false
			}
		});
		Chat.belongsTo(models.User, {
			foreignKey: {
				name: 'recieverId',
				allowNull: false
			}
		});
	}

	Chat.createMessage = async function(senderId, recieverId, message){
		user = await Chat.build({
			message: message,
			senderId: senderId,
			recieverId: recieverId
		}).save();

		return user;
	}

	return Chat;
}
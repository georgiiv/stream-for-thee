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
		message = await Chat.build({
			message: message,
			senderId: senderId,
			recieverId: recieverId
		}).save();

		return message;
	}

	Chat.deleteMessageWithId = async function(id){
		await Chat.destroy({
			where: {id: id}
		});

		return true;
	}

	return Chat;
}
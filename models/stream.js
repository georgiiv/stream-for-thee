module.exports = (sequelize, DataTypes) => {
	const Stream = sequelize.define('Stream', {
		// Model attributes are defined here
		streamName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		streamPath: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		playList: {
			type: DataTypes.STRING
		}
	}, {
		// Other model options go here
	});

	Stream.associate = models => {
		Stream.belongsTo(models.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false
			}
		});
	}

	Stream.createStream = async function(user){
		try{
			stream = await Stream.build({
			streamName: "Untitled",
			streamPath: "/" + user.userName + "_" + require("crypto").randomBytes(10).toString('hex') + "/",
			playList: "master.m3u8",
			userId: user.id
		}).save();;
		}catch(error){
			console.log(error);
		}

		return stream;
	}

	return Stream;
}
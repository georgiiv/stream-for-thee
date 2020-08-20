module.exports = (sequelize, DataTypes) => {
	const Stream = sequelize.define('Stream', {
		// Model attributes are defined here
		streamName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		streamPath: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	}, {
		// Other model options go here
	});

	Stream.associate = models => {
		Stream.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	}

	return Stream;
}
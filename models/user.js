module.exports = (sequelize, DataTypes) => {

	const User = sequelize.define('User', {
		// Model attributes are defined here
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		streamKey: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	}, {
		// Other model options go here
	});

	User.associate = models => {
		User.hasMany(models.Stream);
	}

	User.Test = function(){return "Asd"}
	User.prototype.getName = function(){
		return this.userName;
	}

	return User
}
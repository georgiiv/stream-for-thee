const bcrypt = require("bcrypt");

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

	User.findByStreamKey = async function(streamKey){
		return User.findAll({where: {streamKey: streamKey}});
	}

	User.createUser = async function(username, email, password, repeatPassword){
		if(password != repeatPassword){
			throw new Error("Passwords don't match");
		}

		res = await User.build({
			userName: username, 
			email: email, 
			password: await bcrypt.hash(password, 10),
			streamKey: require("crypto").randomBytes(20).toString('hex')
		}).save();

		return res;
	}
	
	return User
}
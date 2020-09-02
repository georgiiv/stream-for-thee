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
		User.hasMany(models.Stream, {
			foreignKey: {
				name: 'userId'
			}
		});
	}

	User.Test = function(){return "Asd"}
	User.prototype.getName = function(){
		return this.userName;
	}

	User.findByStreamKey = async function(streamKey){
		return User.findOne({where: {streamKey: streamKey}});
	}
	User.findByUsername = async function(username){
		return User.findOne({where: {userName: username}});
	}
	User.findByEmail = async function(email){
		return User.findOne({where: {email: email}});
	}

	User.createUser = async function(username, email, password){
		user = await User.build({
			userName: username, 
			email: email, 
			password: await bcrypt.hash(password, 10),
			streamKey: require("crypto").randomBytes(20).toString('hex')
		}).save();

		return user;
	}
	
	return User
}
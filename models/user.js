const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

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
	salt:{
		type: DataTypes.STRING,
		allowNull: false,
    	unique: true
	},
	streamKey:{
		type: DataTypes.STRING,
		allowNull: false,
    	unique: true
	}
}, {
	// Other model options go here
});


// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

//const jane = User.build({ firstName: "Jane", lastName: "Asd" });
//jane.save();

module.exports = User; 
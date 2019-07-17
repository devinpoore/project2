var bcrypt = require('bcrypt');

var Listing = require('./listings')

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    id:{
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      isUnique: true
    },  
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      isUnique: true,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      required: true,
      len: [10,10]
    },
    streetAddress:{
      type: DataTypes.INTEGER,
      required: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      len: [5,12]
    },
  });

  return user;
};

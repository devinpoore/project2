var bcrypt = require('bcrypt');
var Listing = require('./listings')

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
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
      type: DataTypes.STRING,
      required: true,
    },
    streetAddress:{
      type: DataTypes.STRING,
      required: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      len: [5,12]
    },
  });

  //generate a hash for password with bcrypt
  user.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  //check if password is valid
  user.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.localPassword);
  };
  
  //if user is deleted, all listings associated under that user are cleared out
  user.associate = function(models) {
    user.hasMany(models.listing, {
      onDelete: "cascase"
    });

  }

  return user;
};

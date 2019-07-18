// var Sighting = require('./sightings');

module.exports = function(sequelize, DataTypes) {
  var listing = sequelize.define("listing", {
    image: {
      type: DataTypes.STRING,
      required: true
    },
    isLost: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    currentLocationLat: {
      type: DataTypes.DECIMAL (10,8),
      // allowNull: false,
      required: true
    },
    currentLocationLong: {
      type: DataTypes.DECIMAL (11,8),
      // allowNull: false,
      required: true
    },
    breed: {
      type: DataTypes.STRING,
      required: true
    },
    gender: {
      type: DataTypes.STRING,
      required: true
    },
    animalType: {
      type: DataTypes.STRING,
      required: true
    },
    comments: {
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id"
      }
    },  
});
return listing;
};
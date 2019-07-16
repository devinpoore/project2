var Sighting = require('./sightings');

module.exports = function(sequelize, DataTypes) {
    var listings = sequelize.define("listings", {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      image: {
        type: DataTypes.STRING,
        required: true
      },
      postType: {
        type: DataTypes.STRING,
        required: true
      },
      lostLocationLat: {
        type: DataTypes.DECIMAL (10,8),
        allowNull: false,
        required: true
      },
      lostLocationLong: {
        type: DataTypes.DECIMAL (11,8),
        allowNull: false,
        required: true
      },
      foundLocationLat: {
        type: DataTypes.DECIMAL (10,8),
        allowNull: false,
        required: true
      },
      foundLocationLong: {
        type: DataTypes.DECIMAL (11,8),
        allowNull: false,
        required: true
      },
      currentLocationLat: {
        type: DataTypes.DECIMAL (10,8),
        allowNull: false,
        required: true
      },
      currentLocationLong: {
        type: DataTypes.DECIMAL (11,8),
        allowNull: false,
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
    return listings;
  };
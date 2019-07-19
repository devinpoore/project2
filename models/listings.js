// var Sighting = require('./sightings');
var user = require('./user')
module.exports = function(sequelize, DataTypes) {
    var listing = sequelize.define("listing", {
      petName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      postType: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      currentLocationLat: {
        type: DataTypes.DECIMAL (12,8),
        allowNull: false
      },
      currentLocationLong: {
        type: DataTypes.DECIMAL (12,8),
        allowNull: false
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      animalType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
<<<<<<< HEAD
        references: {
          model: "users",
          key: "id"
        }
=======
>>>>>>> 59c68f27e4038a5843ef2145405336ad6f0609b7
      },  
  });

  listing.associate = function(models) {
    listing.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return listing;
};
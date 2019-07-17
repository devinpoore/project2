module.exports = function(sequelize, DataTypes) {
    var sighting = sequelize.define("sighting", {
      sightingLocationLat: {
          type: DataTypes.DECIMAL (10,8),
          allowNull: false,
          required: true
      },
      sightingLocationLong: {
        type: DataTypes.DECIMAL (11,8),
        allowNull: false,
        required: true
      },
      dateTime: {
          type: DataTypes.INTEGER,
          required: true
      },
      image: {
        type: DataTypes.STRING,
        required: true
      },
      listingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "listings",
          key: "id"
        }
      } 
    });
    return sighting;
  };
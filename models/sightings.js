module.exports = function(sequelize, DataTypes) {
    var sightings = sequelize.define("sightings", {
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
        type: Sequelize.INTEGER,
        references: 'listings',
        referencesKey: 'id'
      } 
    });
    return sightings;
  };
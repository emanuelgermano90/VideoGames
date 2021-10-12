const { DataTypes } = require('sequelize');

module.exports = sequelize => {

    sequelize.define('gender', {

        id: {

            type: DataTypes.INTEGER,

            primaryKey: true,
      
        },

        name: {

            type: DataTypes.STRING,
      
        },

    });

}
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');

class Book extends Model { }

Book.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    release_date: {
      type: DataTypes.DATE
    }
  },
  {
    // Connection to our db
    sequelize,
    modelName: 'book'
  }
);

// Book.associate = (models) => {
//   Book.belongsTo(models.User, {
//     foreignKey: 'userId',
//     as: 'user',
//   });
// };

module.exports = Book;
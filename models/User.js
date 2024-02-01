const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');
const { hash, compare } = require('bcrypt');

const Book = require('./Book');

class User extends Model {
  toJSON() {
    const user = Object.assign({}, this.get());

    delete user.password;

    return user;
  }

  async validatePass(formPassword) {
    const is_valid = await compare(formPassword, this.password);

    return is_valid;
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'That username already exists.'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'A user with that email address already exists.'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'You must provide a valid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 6,
          msg: 'Your password must be at least 6 characters in length.'
        }
      }
    }
  },
  {
    sequelize,
    modelName: 'user',
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 10);

        return user;
      }
    }
  }
);

User.hasMany(Book);
Book.belongsTo(User);

module.exports = User;
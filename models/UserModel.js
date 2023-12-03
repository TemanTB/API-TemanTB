const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/Database");
const { v4: uuidv4 } = require("uuid");

const UUID_PREFIX = "USER_";

const users = db.define(
  "users",
  {
    userID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

users.beforeCreate((user, options) => {
  user.userID = `${UUID_PREFIX}${uuidv4()}`;
});

module.exports = users;

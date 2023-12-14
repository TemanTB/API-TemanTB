const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database");
const { v4: uuidv4 } = require("uuid");
const Users = require("./UserModel");

const UUID_PREFIX = "USER_";

const Health = db.define(
  "health",
  {
    healthId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    weeks: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
    },
    nextDate: {
      type: DataTypes.DATE,
    },
    point: {
      type: DataTypes.INTEGER,
    },
    alert: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    average: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    userID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Health.beforeCreate((health, options) => {
  health.healthId = `${UUID_PREFIX}${uuidv4()}`;
});

Health.beforeUpdate((health, options) => {
  health.time = new Date();
});

Users.hasMany(Health, { onDelete: "cascade" });
Health.belongsTo(Users, { foreignKey: "userID" });

module.exports = Health;

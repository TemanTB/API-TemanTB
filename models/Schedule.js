const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/Database");
const { v4: uuidv4 } = require("uuid");
const Users = require("./UserModel");

const UUID_PREFIX = "SCHEDULE_";

const Schedule = db.define(
  "schedule",
  {
    scheduleID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    medicineName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    hour: {
      type: DataTypes.TIME,
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
  }
);

Schedule.beforeCreate((schedule, options) => {
  schedule.scheduleID = `${UUID_PREFIX}${uuidv4()}`;
});

Users.hasMany(Schedule, { onDelete: "cascade" });
Schedule.belongsTo(Users, { foreignKey: "userID" });

module.exports = Schedule;

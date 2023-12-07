const { Sequelize } = require("sequelize");

const db = new Sequelize("test1", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
// haloooo

const { Sequelize } = require("sequelize");

const db = new Sequelize("temantb-db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
// haloooo

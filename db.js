const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

let dbConnection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
});

module.exports = dbConnection;

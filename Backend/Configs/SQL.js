const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST, // Your MySQL host
    user: process.env.DB_USER, // Your MySQL username
    password: process.env.DB_PASS, // Your MySQL password
    database: process.env.DB_DATABASE, // Your database name
    multipleStatements: true,
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the MySQL database!");
});

module.exports = db;
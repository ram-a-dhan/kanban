require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || "postgres",
    "database": process.env.DB_NAME || "kanban_development",
    "host": process.env.HOST || "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "cygtlsenofwmrw",
    "password": "a517bed4f6d417bb068591b0c025618ba068d774081f6eb9c029a7d4562842e0",
    "database": "de24hjskoeero6",
    "host": "ec2-52-202-185-87.compute-1.amazonaws.com",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}

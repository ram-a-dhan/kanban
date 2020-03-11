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
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}

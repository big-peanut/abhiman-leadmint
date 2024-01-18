// Import Sequelize for defining models
const Sequelize = require("sequelize");

// Import the sequelize instance for connecting to the database
const sequelize = require("../utils/database");

// Define the Users model
const Users = sequelize.define("users", {
  // Define columns for the users table
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deviceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coins: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  isPrime: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

// Export the Users model for use in other parts of the application
module.exports = Users;

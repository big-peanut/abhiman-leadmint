// Import Sequelize for defining models
const Sequelize = require("sequelize");

// Import the sequelize instance for connecting to the database
const sequelize = require("../utils/database");

// Import the Users model for reference in the rooms table
const Users = require("../models/userModel");

// Define the Rooms model
const Rooms = sequelize.define("rooms", {
  // Define columns for the rooms table
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  roomId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creatorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
});

// Export the Rooms model for use in other parts of the application
module.exports = Rooms;

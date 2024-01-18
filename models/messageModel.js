// Import Sequelize for defining models
const Sequelize = require("sequelize");

// Import the sequelize instance for connecting to the database
const sequelize = require("../utils/database");

// Import the Rooms model for reference in the messages table
const Rooms = require("../models/roomModel");

// Define the Messages model
const Messages = sequelize.define("messages", {
  // Define columns for the messages table
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  roomId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Rooms, // Name of the rooms table
      key: "id", // Primary key of the rooms table
    },
  },
});

// Establish a belongsTo association with the Rooms model using foreign key
Messages.belongsTo(Rooms, { foreignKey: "roomId" });

// Export the Messages model for use in other parts of the application
module.exports = Messages;

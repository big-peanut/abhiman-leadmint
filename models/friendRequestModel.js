// Import Sequelize for defining models
const Sequelize = require("sequelize");

// Import the sequelize instance for connecting to the database
const sequelize = require("../utils/database");

// Import the Users model for reference in the friendrequests table
const Users = require("./userModel");

// Define the Friends model
const Friends = sequelize.define("friendrequests", {
  // Define columns for the friendrequests table
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  areFriends: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

// Define relationships between Users and Friends
Users.belongsToMany(Users, {
  as: "Sender",
  foreignKey: "senderId",
  through: Friends,
});

Users.belongsToMany(Users, {
  as: "Receiver",
  foreignKey: "receiverId",
  through: Friends,
});

// Export the Friends model for use in other parts of the application
module.exports = Friends;

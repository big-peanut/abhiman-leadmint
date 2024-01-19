// // Import Sequelize for defining models
// const Sequelize = require("sequelize");

// // Import the sequelize instance for connecting to the database
// const sequelize = require("../utils/database");

// // Import the Users model for reference in the friendrequests table
// const Users = require("./userModel");

// // Define the Friends model
// const Friends = sequelize.define("friendrequests", {
//   // Define columns for the friendrequests table
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   senderId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   receiverId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   areFriends: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//     allowNull: false,
//   },
// });

// // Define relationships between Users and Friends
// Users.belongsToMany(Users, {
//   as: "Sender",
//   foreignKey: "senderId",
//   through: Friends,
// });

// Users.belongsToMany(Users, {
//   as: "Receiver",
//   foreignKey: "receiverId",
//   through: Friends,
// });

// // Export the Friends model for use in other parts of the application
// module.exports = Friends;

const pool = require("../utils/database");

// Define the table name
const tableName = "friendrequests";

// Define the Friends model
const Friends = {
  // Function to create the friendrequests table
  createTable: async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        senderId INT NOT NULL,
        receiverId INT NOT NULL,
        areFriends BOOLEAN DEFAULT false NOT NULL
      )
    `;
    try {
      const [rows, fields] = await pool.query(createTableQuery);
      console.log("Friends table created:");
    } catch (error) {
      console.error("Error creating Friends table:", error);
    }
  },

  // Add other model-related functions here
};

// Export the Friends model for use in other parts of the application
module.exports = Friends;

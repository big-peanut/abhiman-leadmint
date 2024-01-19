// // Import Sequelize for defining models and creating associations
// const Sequelize = require("sequelize");

// // Import the sequelize instance for connecting to the database
// const sequelize = require("../utils/database");

// // Import the User and Room models for reference in the intermediate table
// const Users = require("./userModel");
// const Rooms = require("./roomModel");

// // Define the intermediate table for the many-to-many relationship
// const UserRoom = sequelize.define("user_room", {
//   // Define columns for the table
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   userId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: Users,
//       key: "id",
//     },
//   },
//   roomId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: Rooms,
//       key: "id",
//     },
//   },
// });

// // Establish the many-to-many relationship between Users and Rooms
// Users.belongsToMany(Rooms, { through: UserRoom, foreignKey: "userId" });
// Rooms.belongsToMany(Users, { through: UserRoom, foreignKey: "roomId" });

// Users.hasMany(UserRoom, { foreignKey: "userId" });
// Rooms.hasMany(UserRoom, { foreignKey: "roomId" });

// // Export the UserRoom model for use in other parts of the application
// module.exports = UserRoom;




const pool = require("../utils/database");

// Define the table name
const tableName = "user_room";

// Define the UserRoom model
const UserRoom = {
  // Function to create the user_room table
  createTable: async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        roomId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (roomId) REFERENCES rooms (id)
      )
    `;
    try {
      const [rows, fields] = await pool.query(createTableQuery);
      console.log("user_room table created:");
    } catch (error) {
      console.error("Error creating user_room table:", error);
    }
  },

  // Add other model-related functions here
};

// Export the UserRoom model for use in other parts of the application
module.exports = UserRoom;

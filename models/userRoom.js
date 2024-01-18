// Import Sequelize for defining models and creating associations
const Sequelize = require("sequelize");

// Import the sequelize instance for connecting to the database
const sequelize = require("../utils/database");

// Import the User and Room models for reference in the intermediate table
const Users = require("./userModel");
const Rooms = require("./roomModel");

// Define the intermediate table for the many-to-many relationship
const UserRoom = sequelize.define("user_room", {
  // Define columns for the table
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
  roomId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Rooms,
      key: "id",
    },
  },
});

// Establish the many-to-many relationship between Users and Rooms
Users.belongsToMany(Rooms, { through: UserRoom, foreignKey: "userId" });
Rooms.belongsToMany(Users, { through: UserRoom, foreignKey: "roomId" });

Users.hasMany(UserRoom, { foreignKey: "userId" });
Rooms.hasMany(UserRoom, { foreignKey: "roomId" });

// Export the UserRoom model for use in other parts of the application
module.exports = UserRoom;

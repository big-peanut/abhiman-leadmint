// Import the Sequelize library for database interactions
const Sequelize = require("sequelize");

// Load environment variables from a .env file
const dotenv = require("dotenv");
dotenv.config();

// Create a new Sequelize instance for connecting to the database
const sequelize = new Sequelize(
  // Use environment variables for database configuration
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    dialect: "mysql", // Specify the database dialect (MySQL in this case)
    hostname: process.env.DB_HOST, // Use environment variable for the database host
  }
);

// Export the Sequelize instance to be used in other parts of the application
module.exports = sequelize;

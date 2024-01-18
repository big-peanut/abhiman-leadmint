// Import required modules and libraries
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const primeRoutes = require("./routes/primeRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes = require("./routes/messageRoutes");
const sequelize = require("./utils/database");
const http = require("http");
const socketIO = require("socket.io");

// Create an instance of the Express application
const app = express();

// Use middleware for parsing JSON data and enabling CORS
app.use(bodyParser.json());
app.use(cors());

// Load environment variables from a .env file
dotenv.config();

// Create an HTTP server using Express
const server = http.createServer(app);

// Create a Socket.IO instance attached to the HTTP server
const io = socketIO(server);

// Use defined routes for different functionalities
app.use(userRoutes);
app.use(primeRoutes);
app.use(roomRoutes);
app.use(messageRoutes);

// Handle socket connections
io.on("connection", (socket) => {
  // Log when a user is connected
  console.log("User connected:--------------", socket.id);

  // Listen for incoming messages from clients
  socket.on("message", (message) => {
    // Log the received message
    console.log("Received message====", message); // Fix the typo here

    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit("message", message);
  });

  // Listen for disconnections
  socket.on("disconnect", () => {
    // Log when a user is disconnected
    console.log("User disconnected:------", socket.id);
  });
});

// Synchronize Sequelize models with the database and start the server
sequelize
  .sync()
  .then(() => {
    server.listen(process.env.PORT, () => {
      // Log that the server is running on the specified port
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // Log any errors that occur during synchronization or server startup
    console.log(err);
  });

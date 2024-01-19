// // Import necessary models and Sequelize instance
// const Messages = require("../models/messageModel");
// const Rooms = require("../models/roomModel");
// const Users = require("../models/userModel");
// const sequelize = require("../utils/database");

// // Function to add a new message to a chat room
// exports.addMessage = async (req, res, next) => {
//   try {
//     // Extract necessary information from the request body
//     const roomId = req.body.roomId;
//     const message = req.body.message;
//     const userId = req.user.id;

//     // Create a new message in the Messages table
//     const data = await Messages.create({
//       message: message,
//       roomId: roomId,
//       userId: userId,
//     });

//     // Return the newly created message data in the response
//     res.json({ data: data });
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Function to retrieve all messages from a specific chat room
// exports.getMessage = async (req, res, next) => {
//   try {
//     // Extract the room ID from the request parameters
//     const roomId = req.params.roomId;

//     // Fetch all messages associated with the specified room from the database
//     const messages = await Messages.findAll({ where: { roomId: roomId } });

//     // Return the list of messages in the response
//     res.json({ messages: messages });
//   } catch (err) {
//     console.log(err);
//   }
// };

const pool = require("../utils/database");

exports.addMessage = async (req, res, next) => {
  try {
    // Extract necessary information from the request body
    const roomId = req.body.roomId;
    const message = req.body.message;
    const userId = req.user.id;

    // Create a new message in the Messages table
    const addMessageQuery = `
      INSERT INTO messages (message, roomId, userId)
      VALUES (?, ?, ?)
    `;
    const [data] = await pool.query(addMessageQuery, [message, roomId, userId]);

    // Return the newly created message data in the response
    res.json({ data: data });
  } catch (err) {
    console.log(err);
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    // Extract the room ID from the request parameters
    const roomId = req.params.roomId;

    // Fetch all messages associated with the specified room from the database
    const getMessagesQuery = "SELECT * FROM messages WHERE roomId = ?";
    const [messages] = await pool.query(getMessagesQuery, [roomId]);

    // Return the list of messages in the response
    res.json({ messages: messages });
  } catch (err) {
    console.log(err);
  }
};

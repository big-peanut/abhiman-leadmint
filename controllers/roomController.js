// Import necessary models
const Rooms = require("../models/roomModel");
const UserRoom = require("../models/userRoom");

// Function to create a new chat room
exports.createRoom = async (req, res, next) => {
  try {
    const { roomName, roomId, password } = req.body;

    // Create a new room in the database
    const createdRoom = await Rooms.create({
      name: roomName,
      roomId: roomId,
      password: password,
      creatorId: req.user.id,
    });

    // Add the room creator to the UserRoom table
    await UserRoom.create({
      userId: req.user.id,
      roomId: createdRoom.id,
    });

    // Return room information in the response
    res.json({ roomId: createdRoom.id, roomName: createdRoom.name });
  } catch (err) {
    console.log(err);
  }
};

// Function to retrieve all chat rooms
exports.getChatRooms = async (req, res, next) => {
  try {
    // Fetch all rooms from the database
    const allRooms = await Rooms.findAll();
    res.json({ allRooms });
  } catch (err) {
    console.log(err);
  }
};

// Function to join a chat room
exports.joinRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { password } = req.body;

    // Find the room to join in the database
    const roomToJoin = await Rooms.findOne({ where: { id: roomId } });

    if (!roomToJoin) {
      return res.json({ success: false, msg: "Room not found" });
    }

    // Check if the provided password matches the room password
    if (roomToJoin.password !== password) {
      return res.json({ success: false, msg: "Incorrect Room Password" });
    }

    // Check if the user is already in the room
    const isUserInRoom = await UserRoom.findOne({
      where: { userId: req.user.id, roomId: roomId },
    });

    // If not the room creator, add the user to the room
    if (req.user.id !== roomToJoin.creatorId && !isUserInRoom) {
      await UserRoom.create({
        userId: req.user.id,
        roomId: roomId,
      });
    }

    // If room joining is successful, send success message
    res.json({ success: true, msg: "Room Joined" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: "Error joining room" });
  }
};

// Function to check if the user is a member of a specific chat room
exports.checkRoomMembership = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    // Check if the user is a member of the specified room
    const response = await UserRoom.findOne({
      where: { userId: userId, roomId: roomId },
    });

    if (response) {
      return res.json({ ismember: true });
    }
    res.json({ ismember: false });
  } catch (err) {
    console.log(err);
  }
};

// Function to count the number of members in a specific chat room
exports.countRoomMembers = async (req, res, next) => {
  try {
    const maxCount = 6;
    const roomId = req.params.roomId;

    // Count the number of members in the specified room
    const count = await UserRoom.count({ where: { roomId: roomId } });

    // Check if the room is full based on a maximum count
    const isFull = count >= maxCount;
    res.json({ isFull: isFull });
  } catch (err) {
    console.log(err);
  }
};

// Function to count the number of non-prime members in a chat room
exports.countNonPrimeRoomMember = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Count the number of rooms the user is a member of
    const count = await UserRoom.count({ where: { userId: userId } });
    res.json({ count });
  } catch (err) {
    console.log(err);
  }
};

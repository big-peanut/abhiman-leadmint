// Import necessary libraries and models
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Users = require("../models/userModel");
const Friends = require("../models/friendRequestModel");

// Load environment variables from a .env file
dotenv.config();

// Signup function to handle user registration
exports.signup = async (req, res, next) => {
  try {
    const { name, userId, deviceId, phone, password, coins } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { userId: userId } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already registered. Please login" });
    }

    // Hash the password before storing it in the database
    const saltRounds = 5;
    const hash = await bcrypt.hash(password, saltRounds);

    // Create a new user in the database
    const userData = await Users.create({
      name: name,
      userId: userId,
      deviceId: deviceId,
      phone: phone,
      password: hash,
      coins: coins,
    });

    // Return the user data in the response
    res.json({ userData });
  } catch (err) {
    // Handle errors during signup
    res.status(500).json({ error: "Failed to sign up" });
  }
};

// Function to generate JWT token for user authentication
function generateAccessToken(name, userId) {
  return jwt.sign({ name: name, userId: userId }, process.env.JWT_SECRET_KEY);
}

// Login function to handle user login
exports.login = async (req, res, next) => {
  try {
    const { name, userId, password } = req.body;

    // Check if the user exists in the database
    const existingUser = await Users.findOne({ where: { userId: userId } });
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User not registered. Please sign up" });
    }

    // Compare the provided password with the hashed password in the database
    const result = await bcrypt.compare(password, existingUser.password);
    if (result) {
      // If the password is correct, generate and return a JWT token
      const token = generateAccessToken(existingUser.name, existingUser.userId);
      return res
        .status(200)
        .json({ message: "User login successful", token: token });
    } else {
      return res.status(400).json({ error: "Incorrect password" });
    }
  } catch (err) {
    // Handle errors during login
    res.status(500).json({ error: "Failed to login" });
    console.log(err);
  }
};

// Function to get user information after authentication
exports.getUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { userId: req.user.userId } });
    if (user) {
      res.json({ user: user });
    }
  } catch (err) {
    console.log(err);
  }
};

// Function to get information of all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.findAll();
    res.json({ allUsers });
  } catch (err) {
    console.log(err);
  }
};

// Function to get user profile based on userId parameter
exports.getProfile = async (req, res, next) => {
  try {
    const id = req.params.userId; // Assuming you pass the user ID as a parameter in the URL
    const userProfile = await Users.findOne({ where: { id: id } });

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    // Only include necessary information in the response (customize based on user model)
    res.json({ userProfile });
  } catch (err) {
    console.log(err);
  }
};

// Function to add friends based on receiverId in the request body
exports.addFriend = async (req, res, next) => {
  try {
    const receiverId = req.body.receiverId;
    const senderId = req.user.id;

    // Check if users are already friends
    const areAlreadyFriends = await Friends.findOne({
      where: {
        senderId,
        receiverId: receiverId,
        areFriends: true,
      },
    });
    if (areAlreadyFriends) {
      return res.json({ success: false, msg: "Users are already friends." });
    }

    // Create a new friend request in the database
    await Friends.create({
      senderId,
      receiverId: receiverId,
      areFriends: true,
    });

    res.json({ success: true, msg: "Users are now friends." });
  } catch (err) {
    console.log(err);
  }
};

// Function to get the list of friends for the authenticated user
exports.getFriends = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Fetch user information along with friends data using associations
    const user = await Users.findByPk(userId, {
      include: [
        {
          model: Users,
          as: "Sender",
          through: Friends,
          attributes: ["id", "name"],
        },
        {
          model: Users,
          as: "Receiver",
          through: Friends,
          attributes: ["id", "name"],
        },
      ],
    });

    // Extract sender and receiver friends data and combine them into a single array
    const senderFriends = user.Sender.map((friend) => ({
      id: friend.id,
      name: friend.name,
    }));

    const receiverFriends = user.Receiver.map((friend) => ({
      id: friend.id,
      name: friend.name,
    }));

    const friends = [...senderFriends, ...receiverFriends];

    // Return the list of friends in the response
    res.json({ friends });
  } catch (err) {
    console.log(err);
  }
};

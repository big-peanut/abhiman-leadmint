// Import the Users model
const Users = require("../models/userModel");

// Function to enable a user to purchase a prime membership
exports.buyPrime = async (req, res, next) => {
  try {
    // Update the user's isPrime status to true
    await Users.update(
      { isPrime: true },
      { where: { userId: req.user.userId } }
    );
    res.json({ message: "Prime membership purchased successfully" });
  } catch (err) {
    console.log(err);
  }
};

// Function to deduct coins from a user's account
exports.deductCoins = async (req, res, next) => {
  try {
    // Extract the amount of coins to be deducted from the request body
    const amount = req.body.coins;

    // Find the user in the database
    const user = await Users.findOne({ where: { id: req.user.id } });

    // Check if the user has sufficient coins
    if (user.coins < amount) {
      return res
        .status(400)
        .json({ success: false, msg: "Insufficient coins" });
    }

    // Deduct the specified amount of coins from the user's account
    user.coins -= amount;
    await user.save();

    // Return success message in the response
    return res
      .status(200)
      .json({ success: true, msg: "Coins deducted successfully" });
  } catch (err) {
    console.log(err);
  }
};

const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, error: "Please provide email and password" });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({ success: false, error: "Invalid credintials" });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(404).json({ success: false, error: "Invalid credintials" });
    }

    res.status(200).json({
      success: true,
      token: "tergeasd1442",
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      error: error.message,
    });
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send("Forgot password route");
};

exports.resetPassword = (req, res, next) => {
  res.send("Reset password route");
};

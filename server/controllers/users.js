const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const jwt = require("jsonwebtoken");

// @desc CREATE USER
// @route GET /api/v1/create-user
// @access Public
exports.createUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(newUser);

    if (user) res.status(201).json({ status: "ok", data: user });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// @desc Login USER
// @route GET /api/v1/login
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;

    // Check if username and password have been provided
    if (!username || !password) {
      res.status(400).json({
        status: "error",
        message: "Please provide username and password",
      });
    }

    // Check for user in db
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      res.status(401).json({ status: "error", message: "username not found" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    if (match) {
      res.status(200).json({ status: "ok", data: user, token: accessToken });
    } else {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
    }
    // todo Pending
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

const express = require("express");
const { createUser, loginUser } = require("../controllers/users");
const router = express.Router();

// create user
router.route("/create-user").post(createUser);

// login user
router.route("/login").post(loginUser);

module.exports = router;

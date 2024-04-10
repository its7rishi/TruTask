const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

// Connect to DB
connectDB();
const app = express();

// Route files
const users = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(logger);

// Mount Routes
app.use("/api/v1/users", users);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.yellow.bold);
});

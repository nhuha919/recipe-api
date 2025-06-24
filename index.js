const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(express.json());
app.use("/recipes", recipeRoutes);

// Only start server if not in test
if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Server running on port 3000"));
}

module.exports = app;

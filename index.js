const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(3000, () => console.log("Server running on port 3000"));

const recipeRoutes = require("./routes/recipeRoutes");
app.use("/recipes", recipeRoutes);

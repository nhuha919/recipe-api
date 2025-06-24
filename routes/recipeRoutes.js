const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// GET all recipes
router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// GET one recipe
router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

// POST new recipe
router.post("/", async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.status(201).json(newRecipe);
});

// DELETE a recipe
router.delete("/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Recipe deleted" });
});

module.exports = router;

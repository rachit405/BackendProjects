const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    id: {
        type : Number
      },
      name: {
        type : String
      },
      ingredients: {
        type : [
          String
        ]
      },
      instructions: {
        type: [
          String
        ]
      },
      prepTimeMinutes: {
        type : Number
      },
      cookTimeMinutes: {
        type: Number
      },
      servings: {
        type: Number
      },
      difficulty: {
        type: String
      },
      cuisine: {
        type :  String
      },
      caloriesPerServing: {
        type : Number
      },
      tags: {
        type: [
          String
        ]
      },
      userId: {
        type: Number
      },
      image: {
        type: String
      },
      rating: {
        type: Number
      },
      reviewCount: {
        type: Number
      },
      mealType: {
        type: [
          String
        ]
      }
});

const RECIPE = mongoose.model('recipie', recipeSchema);

module.exports = RECIPE;


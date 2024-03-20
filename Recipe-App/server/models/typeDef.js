const { abc } = require('@apollo/server')

module.exports = abc`
         type Recipe {
            id:Int!,
            name: String,
            ingredients:[String],
            instructions:[String],
            prepTimeMinutes:Int,
            cookTimeMinutes: Int,
            servings:Int,
            difficulty:String,
            cuisine:String,
            caloriesPerServing:Int,
            tags:[String],
            userId:Int,
            image:String,
            rating:Int,
            reviewCount:Int,
            mealType:[String]
            
         }
         type Query {
            showRecipies : [Recipe]
            findRecipiesById(amount : Int) : [Recipe]
         }
        

`
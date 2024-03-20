const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const { connectToMongoDB } = require('./dbConnect');
const bodyParser = require('body-parser');
const cors = require('cors');
const recipeSchema = require('./models/recipe');
//const typeDef1 =  require('./models/typeDef')
const {SaveRecipiesData} = require('./loadDataToDB')

async function startServer() {
    const app = express();
    connectToMongoDB("mongodb://localhost:27017/recipes").then(() => console.log("MongoDB Connected"));
    const server = new ApolloServer({
        typeDefs : `
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
         input recipieInput{
            name : String,
            difficulty : String
         }
         type Query {
            showRecipies : [Recipe]
            findRecipiesByDifficulty(Difficulty:String) : [Recipe]
            findRecipesById(ID:Int) : Recipe
         }
         type Mutation {
            createRecipe(recipie: recipieInput) : Recipe!
         }
        `,
        resolvers : {
           Query: {
             async showRecipies(){
                return await recipeSchema.find()
             },
             async findRecipiesByDifficulty(_, {difficulty1}){
                return await recipeSchema.find({difficulty:difficulty1})
             },
             async findRecipesById(_,ID){
               return await recipeSchema.findOne({id : ID})
             }
           },
           Mutation : {
            async createRecipe(_,{recipieInput : {name,difficulty}}){
               const createdRecipie = new recipeSchema({
                  name : name,
                  difficulty : difficulty
               });
               const res = createdRecipie.save();
            }
           }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server Started at Port 8000"));
}

startServer();
SaveRecipiesData();

const recipeSchema = require('./models/recipe');
const { default: axios } = require('axios');


async function SaveRecipiesData(){
    const jsonData =  (await axios.get("https://dummyjson.com/recipes?limit=50")).data.recipes
    try{
        await recipeSchema.insertMany(jsonData);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {SaveRecipiesData,}
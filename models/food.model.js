const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    FoodID: { type: String},
    Name: {type: String, default : "Shaswath"},
    Cuisine : {type: String, default : "Shaswath"},
    Country: String,
    City : String,
    MainIngredients : String,
    Type : String,
    Taste : String,
    
},);



module.exports = mongoose.model("foods", FoodSchema);
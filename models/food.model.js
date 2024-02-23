const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    FoodID: { type: String},
    Name: {type: String},
    Cuisine : {type: String},
    Country: String,
    City : String,
    MainIngredients : String,
    Type : String,
    Taste : String,
    
},);



module.exports = mongoose.model("foods", FoodSchema);
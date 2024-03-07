const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    FoodID: { type: String},
    Name: {type: String},
    Country: String,
    Cuisine : {type: String},
    MainIngredients : String,
    City : String,
    Taste : String,
    Type : String,
    CreatedBy : String
    
},);



module.exports = mongoose.model("food", FoodSchema);
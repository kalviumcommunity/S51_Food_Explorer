const express = require('express')
const getRouter = express.Router()
const postRouter = express.Router()
const patchRouter = express.Router()
const deleteRouter = express.Router()
const Food = require("../models/food.model")
const { get } = require('http')


getRouter.get('/get', async(req, res)=>{
    try{
        const foods = await Food.find()
        // console.log(foods)
        res.status(200).json(foods)
    } catch(err){
        console.error(err)
    }
})


postRouter.post('/post', async (req, res) => {
    try {
        console.log(req.body)
        const { FoodID, Name, Cuisine, Country, City, MainIngredients, Type, Taste } = req.body; // Destructuring to extract Name and Cuisine from req.body
        const newFood = await Food.create({FoodID, Name, Cuisine, Country, City, MainIngredients, Type, Taste }); // Creating a new Food instance with Name and Cuisine
        console.log("new", newFood);
        res.status(200).json(newFood);
    } catch(err) {
        console.error(err);
        return res.status(500).send({
            error: 'Something went wrong'
        });
    }
});


patchRouter.patch('/patch/:foodId', async (req, res)=>{
    try {
        const { foodId } = req.params; // Extract foodId from request parameters
        const updatedFields = req.body; // Extract updated fields from request body

        // Find the food item by its ID and update it with the new fields
        const updatedFood = await Food.findOneAndUpdate({ FoodID: foodId }, updatedFields, { new: true });

        if (!updatedFood) {
            return res.status(404).json({ error: 'Food not found' });
        }

        console.log("updated", updatedFood);
        res.status(200).json(updatedFood);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})


deleteRouter.delete('/delete/:foodId', async (req, res)=>{
    try {
        const { foodId } = req.params; // Extract foodId from request parameters
        const deleteFields = req.body; // Extract updated fields from request body

        // Find the food item by its ID and update it with the new fields
        const deleteFood = await Food.findOneAndDelete({ FoodID: foodId }, deleteFields, { new: true });

        if (!deleteFood) {
            return res.status(404).json({ error: 'Food not deleted' });
        }

        console.log("deleted", deleteFood);
        res.status(200).json(deleteFood);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})









module.exports = {getRouter, postRouter, patchRouter, deleteRouter}
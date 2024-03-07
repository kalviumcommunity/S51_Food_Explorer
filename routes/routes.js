const express = require('express')
const getRouter = express.Router()
const postRouter = express.Router()
const patchRouter = express.Router()
const deleteRouter = express.Router()
const getFoodRouter = express.Router()
const Food = require("../models/food.model")
const { get } = require('http')
const updateAndPostJoi = require('../validator')
const jwt = require('jsonwebtoken');


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
        const {error, value} = updateAndPostJoi(req.body)
        if(error){
            return res.status(400).json(error.details)
        }
        else{
            const { FoodID, Name, Cuisine, Country, City, MainIngredients, Type, Taste, CreatedBy } = req.body; // Destructuring to extract Name and Cuisine from req.body
            const newFood = await Food.create({FoodID, Name, Cuisine, Country, City, MainIngredients, Type, Taste, CreatedBy }); // Creating a new Food instance with Name and Cuisine
            console.log("new", newFood);
            res.status(200).json(newFood);
        }
    } catch(err) {
        console.error(err);
        return res.status(500).send({
            error: 'Something went wrong'
        });
    }
});


patchRouter.patch('/patch/:foodId', async (req, res)=>{
    try {
        const {error, value} = updateAndPostJoi(req.body)
        if(error){
            return res.status(400).json(error.details)
        }
        else{
            const { foodId } = req.params; 
            const updatedFields = req.body; 
            const updatedFood = await Food.findOneAndUpdate({ FoodID: foodId }, updatedFields, { new: true });
            if (!updatedFood) 
                return res.status(404).json({ error: 'Food not found' });
                console.log("updated", updatedFood);
                res.status(200).json(updatedFood);
            }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
})


deleteRouter.delete('/delete/:foodId', async (req, res)=>{
    try {
        const { foodId } = req.params; 
        const deleteFields = req.body; 
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

getFoodRouter.get('/get/:foodId', async (req, res) => {
    try {
        const { foodId } = req.params;
        const food = await Food.findOne({ FoodID: foodId });
        if (!food) {
            return res.status(404).json({ error: 'Food not found' });
        }
        console.log(food);
        res.status(200).json(food);
    } catch (err) {
        console.error('Error fetching food data:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});




postRouter.post("/login", (req, res) => {
    const {username} = req.body
    res.cookie("username", username)
    res.json(username)
})

getRouter.get("/logout", (req, res)=>{
    res.clearCookie('username')
    res.send('Logout successful')
})

postRouter.post('/auth', (req, res) => {
    const { username, password } = req.body;
    // JWT token
    const token = jwt.sign({ username: username }, process.env.ACCESS_TOKEN);
    // Set cookie
    res.cookie('token', token);
    // Send response with token
    res.send({ token });
});






module.exports = {getRouter, postRouter, patchRouter, deleteRouter, getFoodRouter}
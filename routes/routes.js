const express = require('express');
const jwt = require('jsonwebtoken');
const Food = require("../models/food.model");
const updateAndPostJoi = require('../validator');
const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const getRouter = express.Router();
const postRouter = express.Router();
const patchRouter = express.Router();
const deleteRouter = express.Router();
const getFoodRouter = express.Router();



postRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("user", username, password)

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid =  bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN);
        res.cookie('token', token, { httpOnly: true });
        console.log("token", token, user.username)
        res.json({ token, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});


// CRUD routes
getRouter.get('/get', async(req, res)=>{
    try{
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch(err){
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

postRouter.post('/post', async (req, res) => {
    try {
        const {error, value} = updateAndPostJoi(req.body);
        if(error){
            return res.status(400).json(error.details);
        }
        const newFood = await Food.create(req.body);
        res.status(200).json(newFood);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

patchRouter.patch('/patch/:foodId', async (req, res)=>{
    try {
        const {error, value} = updateAndPostJoi(req.body);
        if(error){
            return res.status(400).json(error.details);
        }
        const { foodId } = req.params; 
        const updatedFields = req.body; 
        const updatedFood = await Food.findOneAndUpdate({ FoodID: foodId }, updatedFields, { new: true });
        if (!updatedFood) 
            return res.status(404).json({ error: 'Food not found' });
        res.status(200).json(updatedFood);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

deleteRouter.delete('/delete/:foodId', async (req, res)=>{
    try {
        const { foodId } = req.params; 
        const deleteFood = await Food.findOneAndDelete({ FoodID: foodId });
        if (!deleteFood) {
            return res.status(404).json({ error: 'Food not deleted' });
        }
        res.status(200).json(deleteFood);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

getFoodRouter.get('/get/:foodId', async (req, res) => {
    try {
        const { foodId } = req.params;
        const food = await Food.findOne({ FoodID: foodId });
        if (!food) {
            return res.status(404).json({ error: 'Food not found' });
        }
        res.status(200).json(food);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Logout route
getRouter.get("/logout", (req, res)=>{
    res.clearCookie('token');
    res.send('Logout successful');
});

module.exports = { getRouter, postRouter, patchRouter, deleteRouter, getFoodRouter };

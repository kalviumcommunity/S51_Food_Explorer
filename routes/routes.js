const express = require('express');
const jwt = require('jsonwebtoken');
const Food = require("../models/food.model");
const updateAndPostJoi = require('../validator');

const getRouter = express.Router();
const postRouter = express.Router();
const patchRouter = express.Router();
const deleteRouter = express.Router();
const getFoodRouter = express.Router();

// Predefined users
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' }
];

// Login route for authentication
postRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN);
    res.cookie('token', token);
    res.json({ username: user.username });
});

// Middleware to verify token before accessing protected routes
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

// Protect routes using middleware
postRouter.use(verifyToken);
patchRouter.use(verifyToken);
deleteRouter.use(verifyToken);

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

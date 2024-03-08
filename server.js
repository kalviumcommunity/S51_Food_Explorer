const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const { Connect, isConnected } = require('./db');
const cors = require('cors');
const { getRouter, postRouter, patchRouter, deleteRouter, getFoodRouter } = require("./routes/routes");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Middleware
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
Connect();

// Routes
app.use("/", getRouter);
app.use("/", postRouter);
app.use("/", patchRouter);
app.use("/", deleteRouter);
app.use("/", getFoodRouter);

// Homepage route
app.get("/", (req, res) => {
    const htmlResponse = `<h1><i>FOOD EXPLORER</i></h1><p>Database Connection Status: ${isConnected ? 'Connected' : 'Disconnected'}</p>`;
    res.send(htmlResponse);
});

// Ping route
app.get("/ping", (req, res) => {
    const htmlResponse = "<h1><i>FOOD EXPLORER</i></h1> <h2><i>Embark on a Culinary Journey with Food Explorer: Where Every Bite Tells a Story!</i></h2>";
    res.send(htmlResponse);
});

// Start the server
mongoose.connection.once('open', () => {
    console.log("connected to mongoDB");
    if (require.main === module) {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    } else {
        console.log("error");
    }
});

// app.listen(3000, () => console.log("app listens"))
module.exports = app;

const express = require('express');
require("dotenv").config()
const mongoose = require('mongoose')
const {Connect, isConnected} = require('./db');
// const { connected } = require('process');
const app = express();
const cors = require('cors')
const port = 3000;
const {getRouter, postRouter, patchRouter, deleteRouter, getFoodRouter} = require("./routes/routes")
const bodyParser = require('body-parser');


Connect()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use("/", getRouter)
app.use("/", postRouter)
app.use("/", patchRouter)
app.use("/", deleteRouter)
app.use("/", getFoodRouter)


app.get("/", (req, res) => {
    // console.log(connected)
    const htmlResponse = `<h1><i>FOOD EXPLORER</i></h1><p>Database Connection Status: ${isConnected ? 'Connected' : 'Disconnected'}</p>`;
    res.send(htmlResponse);
});

app.get("/ping", (req, res) => {
    const htmlResponse = "<h1><i>FOOD EXPLORER</i></h1> <h2><i>Embark on a Culinary Journey with Food Explorer: Where Every Bite Tells a Story!</i></h2>";
    res.send(htmlResponse);
});

mongoose.connection.once('open', ()=>{
    console.log("connected to mongoDB")
    if (require.main === module) {
        app.listen(port, () => {
            console.log(`Server running: ${port}`);
        });
    }else{
        console.log("error")
    }
})
module.exports = app;

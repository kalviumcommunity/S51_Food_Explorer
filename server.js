const express = require('express');
const app = express();
const port = 3000;

app.get("/ping", (req, res) => {
    const htmlResponse = "<h1><i>FOOD EXPLORER</i></h1> <h2><i>Embark on a Culinary Journey with Food Explorer: Where Every Bite Tells a Story!</i></h2>";
    res.send(htmlResponse);
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running`);
    });
}

module.exports = app;

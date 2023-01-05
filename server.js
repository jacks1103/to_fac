const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();
const connection = require("./config/dbconfig");
const path = require('path');

app.use(express.json());
app.use(bodyParser.json());
app.get("/Test",(req,res) => {
    console.log(`This is the test API`);
    res.json(`This is the test API`);
});

const indexrouter = require("./routes/indxrouter");
app.use("/" , indexrouter);

const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
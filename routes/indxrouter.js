const express = require("express");
const app = express();


const userrouter = require("./userrouter");
app.use("/api/user",userrouter);

const productrouter = require("./productrouter");
app.use("/api/product",productrouter)


module.exports = app;
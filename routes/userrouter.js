const express = require('express');
const app = express();
const usercontroller = require("../controllers/usercontroller");
const uservalidation = require("../validation/validation");

app.post("/register",uservalidation.validate('insert'),usercontroller.registerctrl);
app.post("/login",uservalidation.validate('insert'),usercontroller.login);

module.exports = app;
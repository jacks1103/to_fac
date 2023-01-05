const express = require("express");
const app = express();
const produccontroller = require("../controllers/productcontroller");
const { checktoken } = require("../Auth/token_validation");
const uploader = require("../helpers/image-uploader");

app.post("/insertproduct",uploader.upload.single('picture'),produccontroller.productctrl);
app.get("/getallproduct",checktoken, produccontroller.getalluserctrl);
app.get("/getsingleproduct/:id",checktoken, produccontroller.getsingleproductctrl);
app.delete("/deleteproduct/:id",checktoken, produccontroller.deleteproductctrl);
app.put("/updateproduct",checktoken, uploader.upload.single('picture'),produccontroller.updateproductctrl);

module.exports = app;
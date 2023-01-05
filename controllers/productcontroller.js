const productmodel = require("../models/productmodel");
const DIR = "uploads";
const fs = require('fs');

module.exports = {
    //Insert Into Db 
    productctrl : async function (req,res) {
        var imgName = req.file.filename;
        var body = req.body;
        try{
            if(imgName) {
                const data = { picture : imgName};
                const response = await productmodel.insertproduct(Object.assign(body,data));
                console.log({ status : true , data : response});
                return res.status(400).json({status : true ,data : response});    
            }
            else{
                res.status(500).json({ status : false , message : "Something Went Wrong"});
            }
        }catch(err) {
            console.log(err);
            res.json({ status: false, message: err });
        }
    },

//Get All Product
getalluserctrl : async(req,res) => {
    try{
        const response = await productmodel.getallproducts();
        if(!response.status) {
            console.log(response);
            res.json(response);                 
        }
        return res.json(response);
    }catch(err) {
        console.log(err);
        res.json({status : false, message : err});
    }
},

//Get a single Product
getsingleproductctrl : async(req,res) => {
    console.log(req.params.id);
    try{
        const response = await productmodel.getsingleproduct(req.params.id);
        console.log(response);
        return res.json(response);
    }catch(err) {
        console.log(err);
        res.json({status : false, message : err});
    }
},

//Delete the Product
deleteproductctrl : async(req,res) => {
    console.log(req.params.id);
    try{
        const response = await productmodel.deleteproduct(req.params.id);
        console.log(response);
        return res.json(response);
    }catch(err) {
        console.log(err);
        res.json({status : false, message : err});
    }
},

//Update The Product
updateproductctrl : async (req,res) => {
    try{
        const response = await productmodel.getsingleproduct(req.body.id);
        console.log(response);
        console.log(response.data[0].picture);
        const oldimage = response.data[0].picture;
        fs.unlink(DIR + "/" +oldimage ,(err) => {
            if(err) {
                console.log(err);
            }
            console.log("Old Image is Deleted Succesfully From public folder");
        });
        const imgName = req.file.filename;
        const body = req.body;
        const data = { picture: imgName};
        if(imgName) {
            const response = await productmodel.updateproduct(Object.assign(body,data));
            console.log({ status : true, data : response});
            return res.status(400).json({status : true,data : response});
        }
        else {
            res.status(500).json({
                mesaage: "Something went wrong!",
              });
        }
    }catch(err) {
        console.log(err);
        res.json({ status: false, message: err });
    }
}
}
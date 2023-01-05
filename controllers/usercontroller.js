const usermodel = require("../models/usermodel");
const md5 = require("md5");
const { validationResult } = require("express-validator");
const jwt = require("../helpers/jwt");

module.exports = {
//Insert Into Db
registerctrl : async(req,res) => {
    const body = req.body;
    console.log(body);
    try{
        errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log({status : false, err : errors.array(), msg : "Error in Validation"});
            return res.status(400).json({status : false, err : errors.array(), msg : "Error in Validation"});
        }
        else{
            const dbdataAll = await usermodel.getalluser();
            const dbData = dbdataAll.data;
            const finduser = dbData.find( (item) => item.email === body.email);
            if(finduser){
                console.log({status : false , message : "Email is Already Registered!!"});
                return res.status(400).json({ status : false , message : "Email is Already Registered!!"});
            }
            else {
                const response = await usermodel.register(req.body);
                console.log(md5(body.password));
                console.log(response);
                res.json(response);
            }
        }
    }
    catch(err) {
        console.log(err);
        res.json({ status : false , message : err});
    }
},

//User Log in 
login : async (req,res) => {
    const body = req.body;
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log({status : false , err : errors.array(), message : "Error in validation"});
            return res.status(400).json({status : false , err : errors.array(), message : "Error in validation"});
        }
        else {
            const dbdataAll = await usermodel.getalluser();
            const dbData = dbdataAll.data;
            const finduser = dbData.find( (item) => item.email === body.email && item.password === md5(body.password));
            console.log(finduser);
            if(finduser) {
                const token = await jwt.createToken(finduser);
                return res.status(200).json({ status :true ,data : finduser, accesstoken : token, message : "User Found"}); 
            }
            else{
                console.log({status : false , message : "Invalid Credentials"});
                return res.status(400).json({status : false , message : "Inavalid Credentials"});
            }
        }
    }catch(err) {
        console.log({ status: true, message: err });
        return res.status(400).json({ status: false, message: err });
    }
}
}
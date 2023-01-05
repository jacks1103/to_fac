const connection = require("../config/dbconfig");
const md5 = require("md5");
const { resolve } = require("path");

module.exports = {
//Register(create a User)
 register : async function (data) {
    return new Promise( (resolve,reject) => {
        const feild = {
            name : data.name,
            password : md5(data.password),
            phone : data.phone,
            email : data.email,
        };
        const sql = `INSERT INTO tbl_user SET ?`;
        connection.query(sql,feild, (err,result) => {
            if(err) {
                console.log(err);
                return resolve({status : false, message : err});
            }
            return resolve({
                status : true,
                data : data,
                message : "User Register successfully"
            });
        });
    });
 },

//View All User 
getalluser : async function() {
    return new Promise( (resolve,reject) => {
        const sql = `SELECT * FROM tbl_user`;
        connection.query(sql, (err,result) => {
            if(err) {
                console.log({ status : false ,data : err, message : "Error in sql"});
                return resolve({status : false ,data : err , message : "Error in sql"});
            }
            else{
                return resolve ({ status : true , data : result , message : "view all user succesfully!!"});
            }
        })
    })
}
}
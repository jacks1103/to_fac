const connection = require("../config/dbconfig");
const helpers = require("../helpers/image-uploader");

module.exports = {
//Insert Product
insertproduct : async function(data) {
    let date = Date()
    return new Promise( (resolve,reject) => {
        const feild = {
            name : data.name,
            detail : data.detail,
            picture : data.picture,
            price : data.price,
            quntity : data.quntity,
            total_price : data.price*data.quntity,
            date : date.date
        }
        const sql = 'INSERT INTO tbl_product SET ?';
        connection.query(sql,feild, (err,result) => {
            if(err) {
                console.log(err);
                return resolve({status : false,  message : err});
            }
            return resolve({
                status : true,
                data : result,
                message : 'Product inserted successfully!!'
            });
        })
    })
},

//Get all Products
getallproducts : async () => {
    return new Promise( (resolve,reject) => {
        const sql = 'SELECT * FROM tbl_product';
        connection.query(sql, (err,result) => {
            if(err) {
                console.log(err);
            }
            return resolve ({
                status : true,
                data : result,
                message : "View All user Succesfully!!"
            });
        });
    });
},

//Get a single Product
getsingleproduct : async (pid) => {
    return new Promise( (resolve,reject) => {
        const sql = `SELECT * FROM tbl_product WHERE id=${pid}`;
        connection.query(sql, (err,result) => {
            if(err) {
                console.log(err);
            }
            return resolve({
                status : true,
                data : result,
                message  : "View Your Single user"
            });
        });
    });
},

//Delete The Product 
deleteproduct : async (did) => {
    return new Promise ((resolve,reject) => {
        const sql = `DELETE FROM tbl_product WHERE id=${did}`;
        connection.query(sql, (err,result) => {
            if(err) {
                console.log(err);
            }
            return resolve({
                status : true,
                message : "Data deleted Succesfullly"
            });
        });
    });
},

//Update Product
updateproduct : async (data) => {
    let date = Date()
    return new Promise( (resolve,reject) => {
        const feild = {
            name: data.name,
            detail: data.detail,
            picture: data.picture,
            price: data.price,
            quntity: data.quntity,
            total_price: data.price*data.quntity,
            date: date.date,
        }
        const sql = `UPDATE tbl_product SET ? WHERE id=${data.id}`;
        connection.query(sql,feild,(err,result) => {
            if(err) {
                console.log(err);
                return resolve({ status : false , message : err});
            }
            return resolve ({ status : true, data : result , message : "Data Update Succesfully"});
        });
    });
}
}
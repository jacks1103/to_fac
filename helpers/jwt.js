const jwt = require("jsonwebtoken");

//Create Token
const createToken = async (data) => {
    try {
        const payload = {
            id : data.id,
            email : data.email
        }
        return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn : '1h'})
    }
    catch (err) {
        console.log({ data: err, msg: "Something went wrong in jwt file." });
        return { data: err, msg: "Something went wrong in jwt file." };
    }
}

module.exports = {createToken }
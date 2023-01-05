const { body } = require("express-validator");

const validate = (method) => {
    switch (method) {
        case 'insert' : {
            return [
                body('email','Enter Valid Email').notEmpty().isEmail(),
                body('password','Enter a Valid Password').notEmpty()
                .isLength({max : 14}).withMessage('Password should be less than 14 character')
                .isStrongPassword({
                    minLength : 8,
                    minUppercase : 1,
                    minLowercase : 1,
                    minSymbols : 1,
                    minNumbers : 1
                })
            ]
        }
    }
}
module.exports = { validate };
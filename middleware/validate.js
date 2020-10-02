const { check, validationResult  } = require('express-validator');
const signupValidator = [
    check('username').not().isEmpty().trim().escape().withMessage("Fields cannot be empty"),
    check('email').isEmail().withMessage("Invalid Email"),
    check('password').isLength({ min: 6 }).withMessage("Password must be a least 6 characters long"),
];

const signinValidator = [
    check('email').isEmail().withMessage("Invalid Email"),
    check('password').isLength({ min: 6 }).withMessage("Password must be a least 6 characters long"),
];

const validatorResult = (req, res, next)=>{
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if(hasErrors){
        console.log(result);
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage: firstError,
        });
    }
    next();
};

module.exports = {signupValidator,signinValidator, validatorResult}
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpire} = require('../config/keys')

exports.signupController = async(req, res)=>{
    const {username, email, password} = req.body;
    try {
        const user = await User.findOne({email: email});
        if (user){
            return res.status(400).json({
                errorMessage : "Email already exists"
            });
        }
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();

        return res.status(200).json({
            sucessMessage: "Registered account. Please Signin"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            errorMessage: "Server error",
        });
    }
};

exports.signinController = async(req, res)=>{
   const {email, password} = req.body;
   try {
    const user = await User.findOne({email});
    if (user){
        console.log(email, password);
        console.log("the username/email is found");
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (passwordCheck){
            console.log("User Authenticated");
            const payload = {
                user :{
                    _id: user._id
                }
            }
            await jwt.sign(payload, jwtSecret, {expiresIn: jwtExpire}, (err, token)=>{
                if (err) console.log("JWT error");
                const {_id, email, username, role} = user;
                res.json({
                    token,
                    user: {_id, email, username, role}
                });
            });

        } else{
            res.status(400).json({
                errorMessage: "Invalid Credentials"
            });
        }
    }else{
         res.status(400).json({
            errorMessage: "Invalid credentials"
        });
    }
   } catch (error) {
       console.log("error :",error)
       res.status(500).json({
           errorMessage: error
       });
   }
  
};
const User = require('../Models/User');
const bcrypt = require('bcryptjs');

exports.signupContoller = async(req, res)=>{
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
    }

}
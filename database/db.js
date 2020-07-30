const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://kthapa:mern@0000@restaurant-mernstack.8ioxc.mongodb.net/<dbname>?retryWrites=true&w=majority",
        {
            useNewUrlParser : true,
            useUnifiedTopology: true
        }
    );
        console.log("Database connection sucess");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
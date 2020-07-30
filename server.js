const express = require('express');
const app = express();
const connectDB = require('./database/db');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(morgan());
app.use(express.json());
connectDB();


app.use('/api/auth', authRoutes);
app.get('/',(req, res)=>{
    res.send("Inside get request");
});


const  port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`listening on port ${port}`));

const express = require('express');
const app = express();
const connectDB = require('./database/db');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');

//middleware
app.use(cors());
app.use(morgan());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
connectDB();

const  port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`listening on port ${port}`));

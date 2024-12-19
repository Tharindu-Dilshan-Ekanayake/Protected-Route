require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');

const app = express();

//database connection
mongoose
    .connect(process.env.REACT_APP_MONGO_URL)
    .then(()=> console.log('Database is connected successfully'))
    .catch(err => console.log("Database connection failed"));

//middleware
app.use(express.json({limit:'3mb'}))
app.use(cookieParser());
app.use(bodyparser.json());
app.use(express.urlencoded({limit:'3mb', extended: false}));

//routes
app.use('/',require('./routes/userRoute'))

const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
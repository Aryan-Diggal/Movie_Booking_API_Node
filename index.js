const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");


env.config();
const app = express();  

//Configuring body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get("/home", (req, res) => {    

    // req = http request object i.e. sent from the client 
    // res = http response object that you are going to sent to the client  

    return res.json({
        success: true
    })
})



app.listen(process.env.PORT, async () => {

    console.log(`Server is running on Port ${process.env.PORT}`);
    
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Successfully connected to Mongo");
    } catch (error) {
        console.log("Not able to connect to Mongo", error);
    }
    
})
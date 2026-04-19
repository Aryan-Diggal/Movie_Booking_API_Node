const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");

env.config();
const app = express();  

//Configuring body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// mongoose.set('debug', true);
// Above line to be used when we need to understand a particular DB query 

// Routes
movieRoutes(app); // invoking movie routes
theatreRoutes(app); // inovking theatre routes



app.listen(process.env.PORT, async () => {

    console.log(`Server is running on Port ${process.env.PORT}`);

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Successfully connected to Mongo");

    } catch (error) {
        console.log("Not able to connect to Mongo", error);
    }
    
})
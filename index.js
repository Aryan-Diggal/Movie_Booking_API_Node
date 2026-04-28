const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

const movieRoutes = require("./routes/movie.routes");
const theatreRoutes = require("./routes/theatre.routes");
const autRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookingRoutes = require("./routes/booking.routes");

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
autRoutes(app); // inovking auth routes
userRoutes(app); // invoking user routes
bookingRoutes(app); // invoking booking routes

app.listen(process.env.PORT, async () => {

    console.log(`Server is running on Port ${process.env.PORT}`);

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Successfully connected to Mongo");

    } catch (error) {
        console.log("Not able to connect to Mongo", error);
    }
    
})
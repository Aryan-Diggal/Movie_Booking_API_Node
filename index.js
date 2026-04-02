const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");
const Movie = require("./models/movie.model");


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

        await Movie.create({
            name: "Dhurandhar",
            description: `An underworld saga following a network of 
            criminals, informants and operatives whose lives intersect, 
            navigating covert operations, espionage and betrayals.`,
            casts: ["Ranveer Singh", "Sara Arjun", "Akshaye Khanna", 
                "Arjun Rampal", " Rakseh Bedi", "R. Madhavan", "Sanjay Dutt"],
            
            trailerURL: "https://Dhurandhar/trailer/1",
            language: "Hindi",
            releaseDate: "12/05/2026", 
            director: "Aditya Dhar",
            releaseStatus: "RELEASED",
        });

    } catch (error) {
        console.log("Not able to connect to Mongo", error);
    }
    
})
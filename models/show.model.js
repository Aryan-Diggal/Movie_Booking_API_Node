const mongoose = require("mongoose");

const {BOOKING_STATUS} = require("../utils/constants")

const showSchema = new mongoose.Schema({

    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Theatre"
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Movie"
    },
    timing: {
        type: String,
        required: true
    },
    noOfSeats: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    format:{
        type: String
    }

}, {timestamps: true});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
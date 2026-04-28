const {STATUS} = require("../utils/constants");
const {errorResponseBody} = require("../utils/responseBody");
const ObjectId = require("mongoose").Types.ObjectId;

const theatreService = require("../services/theatre.service");
const { findById } = require("../models/booking.model");

const validateBookingCreateRequest = async (req, res, next) => {

    // Validate the theatre ID presece
    if(!req.body.theatreId){
        errorResponseBody.err = "No theatre Id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // Validating the format of theatreId
    if(!ObjectId.isValid(req.body.theatreId)) {
        errorResponseBody.err = "Invalid theatre Id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // Check if the entered theatre exists or not
    const theatre = await theatreService.getTheatreById(req.body.theatreId);
    if(!theatre){
        errorResponseBody.err = "No theatre found for the given Id";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    // Validate the movie ID presece
    if(!req.body.movieId){
        errorResponseBody.err = "No movie Id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // Validating the format of movieId
    if(!ObjectId.isValid(req.body.movieId)) {
        errorResponseBody.err = "Invalid movie Id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // Checking whether the asked movie is present in the asked theatre or not
    if(!theatre.movies.includes(req.body.movieId)){
        errorResponseBody.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    // Validate the presece of timing
    if(!req.body.timing){
        errorResponseBody.err = "No movie timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // Validate no. of seats presence
    if(!req.body.noOfSeats) {
        errorResponseBody.err = "No seat provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // The request is valid
    next();
}

module.exports = {
    validateBookingCreateRequest,
}
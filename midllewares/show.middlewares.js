const {STATUS} = require("../utils/constants");
const {errorResponseBody} = require("../utils/responseBody");
const ObjectId = require("mongoose").Types.ObjectId;

const validateCreateShowRequest = async (req, res, next) => {

    // Validate theatre id
    if(!req.body.theatreId){
        errorResponseBody.err = "No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }

    // Validate type of theatreId
    if(!ObjectId.isValid(req.body.theatreId)) {
        errorResponseBody.err = "Invalid theatre Id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // Validate movie presence
    if(!req.body.movieId){
        errorResponseBody.err = "No movie Id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    
    // Validating the format of movieId
    if(!ObjectId.isValid(req.body.movieId)) {
        errorResponseBody.err = "Invalid movie Id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // Validate timing
    if(!req.body.timing){
        errorResponseBody.err = "No movie timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // Validate no. of seats presence
    if(!req.body.noOfSeats) {
        errorResponseBody.err = "No seat provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }   
    
    // Validate price presence
    if(!req.body.price) {
        errorResponseBody.err = "No price information provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    next();
} 

const validateShowUpdateRequest = async (req, res, next) => {
    if(req.body.theatreId || req.body.movieId){
        errorResponseBody.err = "We cannot update theatre or movie for an already added show";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}

module.exports = {
    validateCreateShowRequest,
    validateShowUpdateRequest
}
const { errorResponseBody } = require("../utils/responseBody");

const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}

/**
 * 
 * @param req -> HTTP request object
 * @param res -> HTTP response object
 * @param next -> next middleware function
 * @returns -> whether the request is valid or not
 */

const validateTheatreCreateRequest = (req, res, next) => {

    // Validating for name 
    if(!req.body.name){
        badRequestResponse.err = "The name of the theatre is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // Validating for City
    if(!req.body.city){
        badRequestResponse.err = "The city of the theatre is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // Validating for pincode 
    if(!req.body.pincode){
        badRequestResponse.err = "The Pin-code of the theatre is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    next();
}

const validateUpdateMovieRequest = (req, res, next) => {
    // Validation of insert parameters
    if(req.body.insert == undefined){
        errorResponseBody.message = "The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }

    // Validate movieIds presence
    if(!req.body.movieIds){
        errorResponseBody.message = "No movies present in the request to be updated in the theatre";
        return res.status(400).json(errorResponseBody);
    }

    // Validate if movieIds is an Array or not
    if(!(req.body.movieIds instanceof Array)) {
        errorResponseBody.message = "Expected array but found something else";
        return res.status(400).json(errorResponseBody);
    }

    // Validate if movieIds array is empty or not 
    if(req.body.movieIds.length == 0) {
        errorResponseBody.message = "No movie present in the array provided";
        return res.status(400).json(errorResponseBody);
    }

    // When Everything is fine 
    next();
}   

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMovieRequest,
};
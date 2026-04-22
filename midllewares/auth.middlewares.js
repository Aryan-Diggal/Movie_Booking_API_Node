const {errorResponseBody} = require("../utils/responseBody");

/**
 * Validator for user signup
 * @param req -> HTTP request object
 * @param res -> HTTP response object
 * @param next -> next middleware function
 */

const validateSignupRequest = async (req, res, next) => {

    // Validating the name of the user
    if(!req.body.name){
        errorResponseBody.err = "Name of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // Validating the email of the user
    if(!req.body.email){
        errorResponseBody.err = "email of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // Validating the passowrd
    if(!req.body.password){
        errorResponseBody.err = "Password of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // request is valid 
    next();
}

/**
 * Validator for user signin
 * @param req -> HTTP request object
 * @param res -> HTTP response object
 * @param next -> next middleware function
 */

const validateSigninRequest = (req, res, next) => {
    
    // Validating the email of the user
    if(!req.body.email){
        errorResponseBody.err = "email of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // Validating the passowrd
    if(!req.body.password){
        errorResponseBody.err = "Password of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // request is valid 
    next();
}

module.exports = {
    validateSignupRequest,
    validateSigninRequest,
}
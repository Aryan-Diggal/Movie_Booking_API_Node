const jwt = require("jsonwebtoken");

const {errorResponseBody} = require("../utils/responseBody");
const userService = require("../services/user.service")
const {USER_ROLE} = require("../utils/constants")

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


const isAuthenticated = async (req, res, next) => {

    try {
        const token = req.headers["x-access-token"];

        if(!token){
            errorResponseBody.err = "No token provided";
            return res.status(403).json(errorResponseBody);
        }

        const response = jwt.verify(token, process.env.AUTH_KEY);

        if(!response){
            errorResponseBody.err = "Token not verified";
            return res.status(401).json(errorResponseBody);
        }

        const user = await userService.getUserById(response.id);
        req.user = user.id;

        next();

    } catch (error) {
        if(error.name == "JsonWebTokenError"){
            errorResponseBody.err = error.message;
            return res.status(401).json(errorResponseBody);
        }
        if(error.code == 404){
            errorResponseBody.err = "User doesn't exist";
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}


const validateResetPasswordRequest = (req, res, next) => {

    // Validating the old Password of the user
    if(!req.body.oldPassword){
        errorResponseBody.err = "Old Password of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // Validating the new Passowrd
    if(!req.body.newPassword){
        errorResponseBody.err = "New Password of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    // request is valid 
    next();
}

const isAdmin = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    
    if(user.userRole != USER_ROLE.admin){
        errorResponseBody.message = "User is not an admin, cannot proceed with the request";
        return res.status(401).json(errorResponseBody);
    }
    
    next();
}

const isClient = async (req, res, next) => {
    const user = await userService.getUserById(req.user);

    if(user.userRole != USER_ROLE.client){
        errorResponseBody.message = "User is not a client, cannot proceed with the request";
        return res.status(401).json(errorResponseBody);
    }
    
    next();
}


const isAdminOrClient = async (req, res, next) => {
    const user = await userService.getUserById(req.user);

    if(user.userRole != USER_ROLE.client && user.userRole != USER_ROLE.admin){
        errorResponseBody.message = "User is neither a client nor an admin, cannot proceed with the request";
        return res.status(401).json(errorResponseBody);
    }
    
    next();
}

module.exports = {
    validateSignupRequest,
    validateSigninRequest,
    isAuthenticated,
    validateResetPasswordRequest,
    isAdmin,
    isClient,
    isAdminOrClient,
}
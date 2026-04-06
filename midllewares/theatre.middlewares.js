const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}


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

module.exports = {
    validateTheatreCreateRequest
};
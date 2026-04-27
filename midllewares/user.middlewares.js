const { errorResponseBody } = require("../utils/responseBody");

const validateUpdateUserRequest = (req, res, next) => {

    // Validates the presence of atleast one of the things 

    if(!(req.body.userRole || req.body.userStatus)){
        errorResponseBody.err = "Malformed request, please send atleast one parameter"
        return res.status(400).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateUpdateUserRequest,
}
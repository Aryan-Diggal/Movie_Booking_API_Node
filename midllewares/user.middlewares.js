const { errorResponseBody } = require("../utils/responseBody");

const validateUpdateUserRequest = (req, res, next) => {

    // Validates the presence of atleast one of the things 

    if(!(req.body.oldPassword || req.body.newPassword)){
        errorResponseBody.err = "Malformed request, please send atleast one param"
        return res.status(400).json(errorResponseBody);
    }
}

module.exports = {
    validateUpdateUserRequest,
}
const showService = require("../services/show.service");
const {successResponseBody, errorResponseBody} = require("../utils/responseBody")
const {STATUS} = require("../utils/constants")

const create = async (req, res) => {
    try {
        
        const response = await showService.createShow(req.body);

        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the show";

        return res.status(STATUS.OK).json(successResponseBody);


    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SEVER_ERROR).json(errorResponseBody)
    }
}

module.exports = {
    create,
}
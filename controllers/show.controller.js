const showService = require("../services/show.service");
const {successResponseBody, errorResponseBody} = require("../utils/responseBody")
const {STATUS} = require("../utils/constants")

const create = async (req, res) => {
    try {
        
        const response = await showService.createShow(req.body);

        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the show";

        return res.status(STATUS.CREATED).json(successResponseBody);


    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SEVER_ERROR).json(errorResponseBody)
    }
}


const getShows = async (req, res) => {
    try {
        
        const response = await showService.getShows(req.query);
        
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the movie shows";

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

const deleteShow = async (req, res) => {
    try {
        const response = await showService.deleteShow(req.params.id);
        
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the movie shows";

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

const update = async (req, res) => {
    
    try {
        const response = await showService.updateShow(req.body, req.params.id);
    
        successResponseBody.message = "Successfully updated the Show";
        successResponseBody.data = response;
        
        return res.status(STATUS.OK).json(successResponseBody); 

    } catch (error) {
        

        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(INTERNAL_SEVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create,
    getShows,
    deleteShow,
    update,
}
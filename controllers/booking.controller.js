const {errorResponseBody, successResponseBody} = require("../utils/responseBody")
const bookingService = require("../services/booking.service");
const {STATUS} = require("../utils/constants");
const Booking = require("../models/booking.model");

const create = async (req, res) => {

    try {

        let userId = req.user;

        const response = await bookingService.createBooking({...req.body, userId: userId});
        
        successResponseBody.message = "Successfully created a booking";
        successResponseBody.data = response;
        
        return res.status(STATUS.CREATED).json(successResponseBody);

    } catch (error) {

        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SEVER_ERROR).json(errorResponseBody);
        
    }
    
}

const update = async (req, res) => {
    
    try {
        const response = await bookingService.updateBooking(req.body, req.params.id);
    
        successResponseBody.message = "Successfully updated the movie";
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
    update,
}
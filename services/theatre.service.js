const Theatre = require("../models/theatre.model");

const createTheatre = async (data) => {

    try {
        
        const theatre = await Theatre.create(data);
        return theatre;

    } catch (error) {

        if(error.name == "ValidationError"){

            let err = {};

            Object.keys(error.errors).forEach((key) =>{
                err[key] = error.errors[key].message;
            })

            return {err: err, code: 422};

        }

        console.log(error);
        throw error;
    }

    
}

const destroyTheatre = async (id) => {
    try {
        
        const theatre = await Theatre.findByIdAndDelete(id);

        if(!theatre){
            return {
                err: "No record of a theatre found for the given id",
                code: 404,
            }
        }
        
        return theatre;

    } catch (error) {
        console.log(error);
        throw error;
    }

    

}

const getTheatreById = async (id) => {

    try {
        const theatre = await Theatre.findById(id);

        if(!theatre){
            return {
                err: "No record of a theatre found for the given id",
                code: 404,
            }
        }
        return theatre;

    } catch (error) {

        console.log(error);
        throw error;
    }
    
}


const getAllTheatre = async (filter) => {
    try {
        let query = {};
        let pagination = {};

        if (filter && filter.name) {
            query.name = filter.name;
        }

        if (filter && filter.city) {
            query.city = filter.city;
        }

        if (filter && filter.pincode){
            query.pincode = filter.pincode;
        }
        
        if(filter && filter.limit){
            pagination.limit = filter.limit;
        }

        if(filter && filter.skip){
            let perPage = (filter.perPage) ? filter.perPage : filter.limit;
            pagination.skip = filter.skip*perPage;
        }

        const theatre = await Theatre.find(query, {}, pagination);

        if(!theatre){
            return {
                err: "Not able to find the queries movies",
                code: 404
            }
        }

        return theatre;
    } catch (error) {
        console.log(error);
        throw error;
    }
    

}

module.exports = {
    createTheatre,
    destroyTheatre,
    getTheatreById,
    getAllTheatre,
}
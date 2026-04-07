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

    let query = {};

    if (filter.name) {
        query.name = filter.name;
    }

    if (filter.city) {
        query.city = filter.city;
    }

    const theatre = await Theatre.find(query);

    if(!theatre){
        return {
            err: "Not able to find the queries movies",
            code: 404
        }
    }

    return theatre;

}

module.exports = {
    createTheatre,
    destroyTheatre,
    getTheatreById,
    getAllTheatre,
}
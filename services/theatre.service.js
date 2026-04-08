const Theatre = require("../models/theatre.model");

/**
 * 
 * @param data -> Object containing details of the new theatre to be created
 * @returns -> returns the new theatre object created
 */
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


/**
 * 
 * @param id -> the unique _id using which we can identify the theatre to be deleted
 * @returns -> returns the deleted theatre object 
 */
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

/**
 * 
 * @param id -> it is the unique _id based on which we will fetch a theatre
 * @returns -> returns the fetched theatre
 */

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

/**
 * 
 * @param filter -> the data in "filter" to be used to filter out theatres based on city/pincode 
 * @returns -> returns an object with the filtered content of theatres
 */

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

/**
 * 
 * @param id -> it is the unique _id based on which we will find the theatre that we need to update
 * @param data -> object that contains the new data which is to be updated in the db
 * @returns -> returns the new updated theatre details
 */

const updateTheatre = async (id, data) => {

    try {
        const response = await Theatre.findByIdAndUpdate(id, data, {returnDocument: 'after', runValidators: true});
        
        if(!response){
            return {
                err: "Not able to find the theatre with this id",
                code: 404
            }
        }

        return response;

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
    updateTheatre,
}
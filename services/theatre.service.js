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
        
        if(filter && filter.movieId){
            query.movies = {$all: filter.movieId};
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

/**
 * 
 * @param theatreId -> unique id of the theatre for which we want to update movies 
 * @param movieIds -> array of movie ids that are expected to be updated in the theatre
 * @param insert -> boolean that tells whether we want to insert movies or remove them 
 * @returns -> updated theatre object
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    try {
        if(insert){
            // We need to add movies
            await Theatre.updateOne(
                {_id: theatreId},
                {$addToSet: {movies: {$each: movieIds}}}
            );
        
        } else {
            // We need to remove movies
            await Theatre.updateOne(
                {_id: theatreId},
                {$pull: {movies: {$in: movieIds}}}
            )
            
        }   

        // All these "addToSet, each, pull, in" are MongoDB opearators

        const theatre = await Theatre.findById(theatreId);
        return theatre.populate("movies");

    } catch (error) {
        if(error.name == "TypeError"){
            return {
                code: 404,
                err: "No theatre found for the given id"
            }
        }
        console.log("Error is",error);
        throw error;
    }
    

}

module.exports = {
    createTheatre,
    destroyTheatre,
    getTheatreById,
    getAllTheatre,
    updateTheatre,
    updateMoviesInTheatres,
}
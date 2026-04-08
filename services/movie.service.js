const Movie = require("../models/movie.model");
const { errorResponseBody } = require("../utils/responseBody");


/**
 * 
 * @param data -> Object containing details of the new movie to be created
 * @returns -> returns the new movie object created
 */
const createMovie = async (data) => {

    try {
        const movie = await Movie.create(data);
        return movie;

    } catch (error) {

        if(error.name == "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            })

            return {err: err, code: 422} 
        }
        
        else {
            throw error;
        }
    }
}

/**
 * 
 * @param id -> id which will be used to identify the movie to be deleted 
 * @returns -> Object containing the details of the movie deleted
 */

const deleteMovie = async (id) => {
    
    try {
        const response = await Movie.findByIdAndDelete(id);

        if(!response){
            return {
                err: "There is no such movie exists with this ID",
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
 * @param id -> id which will be used to identify the movie to be fetched 
 * @returns -> Object containing the details of the movie fetched
 */

const getMovieById = async (id) => {

    const movie = await Movie.findById(id);

    if(!movie){
        return{
            err: "No movie found for the corresponding ID",
            code: 404,
        }
    };

    return movie;
}


/**
 * 
 * @param id -> id which will be used to identify the movie to be fetched
 * @param data -> object that contains the new data which is to be updated in the db
 * @returns -> returns the new updated movie details
 */

const updateMovie = async (id, data) => {
    
    try {
        
        const movie = await Movie.findByIdAndUpdate(id, data, {returnDocument: 'after', runValidators: true});
        return movie;

    } catch (error) {
        if(error.name == "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            })

            console.log(err);
            return {err: err, code: 422} 
        }
        
        else {
            throw error;
        }
    }
    
    
}


/**
 * 
 * @param filter -> filter will help us in filtering out the data based on the conditionals it contains
 * @returns -> returns an object containing all the movies fetched based on the filter
 */

const fetchMovies = async (filter) => {

    let query = {};
    
    if(filter.name){
        query.name = filter.name; 
    }

    let movie = await Movie.find(query);

    if(!movie){
        return{
            err: "Not able to find the queries movies",
            code: 404
        }
    }
    
    return movie;

}

module.exports = {
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie,
    fetchMovies,
}
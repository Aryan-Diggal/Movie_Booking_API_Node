const Movie = require("../models/movie.model");
const { errorResponseBody } = require("../utils/responseBody");

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
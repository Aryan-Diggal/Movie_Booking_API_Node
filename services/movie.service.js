const Movie = require("../models/movie.model");

const createMovie = async (data) => {
    const movie = await Movie.create(data);
    return movie;
}

const deleteMovie = async (id) => {
    const response = await Movie.deleteOne({
        _id: id,
    });
    return response;
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

  
module.exports = {
    getMovieById,
    createMovie,
    deleteMovie,
}
const theatreService = require("../services/theatre.service");
const {
    successResponseBody, 
    errorResponseBody
} = require("../utils/responseBody")


const createTheatre = async (req, res) => {

    try {
        const response = await theatreService.createTheatre(req.body);

        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = "Validation failed on few parameters of the request body";
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully created a theatre";
        return res.status(201).json(successResponseBody);

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
    
}

const removeTheatre = async (req, res) => {

    try {

        const response = await theatreService.destroyTheatre(req.params.id);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the theatre";
        return res.status(200).json(successResponseBody);

    } catch (error) {

        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);

    }
    
}

const findTheatre = async (req, res) => {

    try {
        const response = await theatreService.getTheatreById(req.params.id);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the data of the theatre";
        return res.status(200).json(successResponseBody);

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }

    

}

const getAllTheatre = async (req, res) => {

    try {
        const response = await theatreService.getAllTheatre(req.query);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the data of the theatre";
        return res.status(200).json(successResponseBody);

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }

}

const updateTheatre = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(req.params.id, req.body);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the data of the theatre";
        return res.status(200).json(successResponseBody);

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}


const updateMovies = async (req, res) => {
    try {
        const response = await theatreService.updateMoviesInTheatres(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the movies in the theatre";
        return res.status(200).json(successResponseBody);

    } catch (error) {
        //console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const getMoviesOfATheatre = async (req, res) => {

    try {
        const response = await theatreService.getMoviesInATheatre(req.params.id);
        
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the movies shown in the theatre";
        return res.status(200).json(successResponseBody);

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
    
}

const checkMovie = async (req, res) => {
    try {

        const response = await theatreService.checkMovieInATheatre(req.params.theatreId, req.params.movieId);

        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }

        successResponseBody.data = response;
        successResponseBody.message = "Successfully checked if the given movie is being shown in the theatre";
        return res.status(200).json(successResponseBody);
        
    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
    

}

module.exports = {
    createTheatre,
    removeTheatre,
    findTheatre,
    getAllTheatre,
    updateTheatre,
    updateMovies,
    getMoviesOfATheatre,
    checkMovie,
}
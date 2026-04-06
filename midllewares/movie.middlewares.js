const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
}


const validateMovieCreateRequest = async (req, res, next) => {

    // Validate the movie name 
    if(!req.body.name){
        badRequestResponse.err = "The name of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // Validate the movie description 
    if(!req.body.description){
        badRequestResponse.err = "The description of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // Validate the movie casts
    if( !(req.body.casts) || !(req.body.casts instanceof Array) || req.body.casts.length <= 0 ) {
        badRequestResponse.err = "The casts of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    //Validate the movie trailerURL
    if(!req.body.trailerURL) {
        badRequestResponse.err = "The Trailer-URL of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }
    
    
    //Validate the movie releaseDate
    if(!req.body.releaseDate) {
        badRequestResponse.err = "The Release Date of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // Validate the movie director
    if(!req.body.director){
        badRequestResponse.err = "The Director of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // Validate the movie releaseStatus
    if(!req.body.releaseStatus){
        badRequestResponse.err = "The Release Status of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    next();
}

module.exports = {
    validateMovieCreateRequest,
}
const theatreController = require("../controllers/theatre.controller");
const theatreMiddlewares = require("../midllewares/theatre.middlewares");


const routes = (app) => {
    //rourtes function takes express app object as parameter

    // CREATE
    app.post(
        "/mba/api/v1/theatres",
        theatreMiddlewares.validateTheatreCreateRequest,
        theatreController.createTheatre
    );

    // DELETE     
    app.delete(
        "/mba/api/v1/theatres/:id",
        theatreController.removeTheatre,
    );

    // READ
    app.get(
        "/mba/api/v1/theatres/:id",
        theatreController.findTheatre
    );

    // READ
    app.get(
        "/mba/api/v1/theatres",
        theatreController.getAllTheatre,
    );

    // UPDATE
    app.put(
        "/mba/api/v1/theatres/:id",
        theatreController.updateTheatre,
    );
    
    // UPDATE
    app.patch(
        "/mba/api/v1/theatres/:id",
        theatreController.updateTheatre,
    );

    // Update Movies in a Theatre
    app.patch(
        "/mba/api/v1/theatres/:id/movies",
        theatreMiddlewares.validateUpdateMovieRequest,
        theatreController.updateMovies,
    )

}

module.exports = routes;
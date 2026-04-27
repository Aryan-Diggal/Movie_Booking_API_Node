const movieController = require("../controllers/movie.controller");
const movieMiddlewares = require("../midllewares/movie.middlewares");
const authMiddlewares = require("../midllewares/auth.middlewares");

const routes = (app) => {
    //rourtes function takes express app object as parameter

    // CREATE
    app.post(
        "/mba/api/v1/movies",
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieMiddlewares.validateMovieCreateRequest, 
        movieController.createMovie
    );

    // DELETE 
    app.delete(
        "/mba/api/v1/movies/:id",
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieController.deleteMovie
    );

    // READ
    app.get(
        "/mba/api/v1/movies/:id", 
        movieController.getMovie 
    );

    // UPDATE
    app.put(
        "/mba/api/v1/movies/:id",
        movieController.updateMovie
    );

    // UPDATE
    app.patch(
        "/mba/api/v1/movies/:id",
        movieController.updateMovie
    );

    // READ
    app.get(
        "/mba/api/v1/movies",
        movieController.FindMovie
    );
}

module.exports = routes;
const theatreController = require("../controllers/theatre.controller");
const theatreMiddlewares = require("../midllewares/theatre.middlewares");


const routes = (app) => {
    app.post(
        "/mba/api/v1/theatres",
        theatreMiddlewares.validateTheatreCreateRequest,
        theatreController.createTheatre
    );

    app.delete(
        "/mba/api/v1/theatres/:id",
        theatreController.removeTheatre,
    );

    app.get(
        "/mba/api/v1/theatres/:id",
        theatreController.findTheatre
    )

    app.get(
        "/mba/api/v1/theatres",
        theatreController.getAllTheatre,
    )
}

module.exports = routes;
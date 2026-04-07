const theatreController = require("../controllers/theatre.controller");
const theatreMiddlewares = require("../midllewares/theatre.middlewares");


const routes = (app) => {
    app.post(
        "/mba/api/v1/theatre",
        theatreMiddlewares.validateTheatreCreateRequest,
        theatreController.createTheatre
    );

    app.delete(
        "/mba/api/v1/theatre/:id",
        theatreController.removeTheatre,
    );

    app.get(
        "/mba/api/v1/theatre/:id",
        theatreController.findTheatre
    )
}

module.exports = routes;
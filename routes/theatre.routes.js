const theatreController = require("../controllers/theatre.controller");
const theatreMiddlewares = require("../midllewares/theatre.middlewares");


const routes = (app) => {
    app.post(
        "/mba/api/v1/theatre",
        theatreMiddlewares.validateTheatreCreateRequest,
        theatreController.createTheatre
    );
}

module.exports = routes;
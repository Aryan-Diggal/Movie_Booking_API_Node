const userController = require("../controllers/user.controller");
const userMiddleware = require("../midllewares/user.middlewares");
 
const routes = (app) => {

    app.patch(
        "/mba/api/v1/user/:id",
        userMiddleware.validateUpdateUserRequest,
        userController.update
    )
}

module.exports = routes;

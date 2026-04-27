const userController = require("../controllers/user.controller");
const userMiddleware = require("../midllewares/user.middlewares");
const authMiddleware = require("../midllewares/auth.middlewares");

const routes = (app) => {

    app.patch(
        "/mba/api/v1/user/:id",
        authMiddleware.isAuthenticated,
        userMiddleware.validateUpdateUserRequest,
        authMiddleware.isAdmin,
        userController.update
    )
}

module.exports = routes;

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../midllewares/auth.middlewares");
const { applyDefaults } = require("../models/user.model");


const routes = (app) => {
    app.post(
        "/mba/api/v1/auth/signup",
        authMiddleware.validateSignupRequest,
        authController.signup
    );

    app.post(
        "/mba/api/v1/auth/signin",
        authController.signin,
    );
}

module.exports = routes;

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
        authMiddleware.validateSigninRequest,
        authController.signin,
    );

    app.patch(
        "/mba/api/v1/auth/reset",
        authMiddleware.isAuthenticated,
        authController.resetPassword,
    );
}

module.exports = routes;

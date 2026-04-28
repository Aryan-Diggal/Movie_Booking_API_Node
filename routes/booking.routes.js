const bookingController = require("../controllers/booking.controller")

const authMiddlewares = require("../midllewares/auth.middlewares");
const bookingMiddlewares = require("../midllewares/booking.middlewares");

const routes = (app) => {
    app.post(
        "/mba/api/v1/bookings",
        authMiddlewares.isAuthenticated,
        bookingMiddlewares.validateBookingCreateRequest,
        bookingController.create,

    )
}

module.exports = routes;
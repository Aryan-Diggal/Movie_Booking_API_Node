const bookingController = require("../controllers/booking.controller")

const authMiddlewares = require("../midllewares/auth.middlewares");
const bookingMiddlewares = require("../midllewares/booking.middlewares");

const routes = (app) => {
    
    app.post(
        "/mba/api/v1/bookings",
        authMiddlewares.isAuthenticated,
        bookingMiddlewares.validateBookingCreateRequest,
        bookingController.create,
    );

    app.patch(
        "/mba/api/v1/bookings/:id",
        authMiddlewares.isAuthenticated,
        bookingMiddlewares.canChangeStatus,
        bookingController.update,
    );

    app.get(
        "/mba/api/v1/bookings",
        authMiddlewares.isAuthenticated,
        bookingController.getBookings,
    );

    app.get(
        "/mba/api/v1/bookings/all",
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdmin,
        bookingController.getAllBookings,
    );

    app.get(
        "/mba/api/v1/bookings/:id",
        authMiddlewares.isAuthenticated,
        bookingController.getBookingById,
    );
}

module.exports = routes;
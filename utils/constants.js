const USER_STATUS = {
    approved: "APPROVED",
    pending: "PENDING",
    rejected: "REJECTED"
};

const USER_ROLE = {
    customer: "CUSTOMER",
    admin: "ADMIN", 
    client: "CLIENT"
};

const STATUS_CODES = {
    OK: 200,
    INTERNAL_SEVER_ERROR: 500,
    CREATED: 201,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    UNPROCESSABLE_ENTITY: 422
}

const BOOKING_STATUS = {
    cancelled: "CANCELLED",
    successfull: "SUCCESSFULL",
    processing: "PROCESSING"
}

const PAYMENT_STATUS = {
    failed: "FAILED",
    success: "SUCCESS",
    pending: "PENDING"
}

module.exports = {
    USER_STATUS,
    BOOKING_STATUS,
    USER_ROLE,
    PAYMENT_STATUS,
    STATUS: STATUS_CODES,
}
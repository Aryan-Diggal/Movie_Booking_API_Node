const errorResponseBody = {
    err: {},
    message: "Something went wrong, cannont process the request",
    data: {},
    success: false,
}

const successResponseBody = {
    err: {},
    message: "Successfully fetched your request",
    data: {},
    success: true,
}

module.exports = {
    errorResponseBody,
    successResponseBody,
}
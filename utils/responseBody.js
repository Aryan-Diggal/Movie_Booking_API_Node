/**
 * This object will be used as a template for building error responses
 */

const errorResponseBody = {
    err: {},
    message: "Something went wrong, cannont process the request",
    data: {},
    success: false,
}

/**
 * This object will be used as a template for building success responses
 */


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
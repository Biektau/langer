"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_exception_1 = require("../exceptions/database.exception");
const validation_exception_1 = require("../exceptions/validation.exception");
const auth_exception_1 = require("../exceptions/auth.exception");
function errorMiddleware(error, request, response, next) {
    console.log(error);
    if (error instanceof database_exception_1.DatabaseException) {
        return response.status(error.status).json(error.toResponse());
    }
    if (error instanceof validation_exception_1.ValidationException) {
        return response.status(error.status).json(error.toResponse());
    }
    if (error instanceof auth_exception_1.AuthException) {
        return response.status(error.status).json(error.toResponse());
    }
    return response.status(500).json({
        status: 500,
        message: "Internal Server Error",
    });
}
exports.default = errorMiddleware;

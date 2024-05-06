"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthException = void 0;
class AuthException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    static UnAuthorizedError() {
        return new AuthException(401, "User is not authorized");
    }
    toResponse() {
        return {
            status: this.status,
            message: this.message,
        };
    }
}
exports.AuthException = AuthException;

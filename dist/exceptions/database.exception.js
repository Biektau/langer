"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseException = void 0;
class DatabaseException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    static BadRequest(message) {
        return new DatabaseException(400, message);
    }
    toResponse() {
        return {
            status: this.status,
            message: this.message,
        };
    }
}
exports.DatabaseException = DatabaseException;

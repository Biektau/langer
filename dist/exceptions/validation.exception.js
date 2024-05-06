"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
class ValidationException extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UserValidationError(message, errors) {
        return new ValidationException(400, message, errors);
    }
    static LanguageValidationError(message, errors) {
        return new ValidationException(400, message, errors);
    }
    static DictionaryValidationError(message, errors) {
        return new ValidationException(400, message, errors);
    }
    static WordValidationError(message, errors) {
        return new ValidationException(400, message, errors);
    }
    toResponse() {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors,
        };
    }
}
exports.ValidationException = ValidationException;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_exception_1 = require("../exceptions/auth.exception");
const session_service_1 = __importDefault(require("../services/session.service"));
function authMiddleware(request, response, next) {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        return next(auth_exception_1.AuthException.UnAuthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
        return next(auth_exception_1.AuthException.UnAuthorizedError());
    }
    try {
        const userData = session_service_1.default.validateAccessToken(accessToken);
        if (!userData) {
            return next(auth_exception_1.AuthException.UnAuthorizedError());
        }
        request.currentUser = userData;
        next();
    }
    catch (error) {
        return next(auth_exception_1.AuthException.UnAuthorizedError());
    }
}
exports.default = authMiddleware;

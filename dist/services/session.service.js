"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const database_exception_1 = require("../exceptions/database.exception");
const auth_exception_1 = require("../exceptions/auth.exception");
const prisma = new client_1.PrismaClient();
class SessionService {
    generateTokens(payload) {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error("Some environment variables are not defined");
        }
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30m",
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "5h",
        });
        return { accessToken, refreshToken };
    }
    saveSession(sessionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionData = yield prisma.session.findFirst({
                where: { userId: sessionDto.userId },
            });
            if (sessionData) {
                const updatedSession = yield prisma.session.update({
                    where: { id: sessionData.id },
                    data: { token: sessionDto.token },
                });
                if (!updatedSession) {
                    throw database_exception_1.DatabaseException.BadRequest("Could not update session");
                }
                return updatedSession;
            }
            const newSession = yield prisma.session.create({
                data: sessionDto,
            });
            if (!newSession) {
                throw database_exception_1.DatabaseException.BadRequest("Could not create session");
            }
            return newSession;
        });
    }
    deleteSession(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw auth_exception_1.AuthException.UnAuthorizedError();
            }
            const sessionData = yield prisma.session.findUnique({
                where: { token: refreshToken },
            });
            if (!sessionData) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find session by this token");
            }
            const deletedSession = yield prisma.session.delete({
                where: { id: sessionData.id },
            });
            if (!deletedSession) {
                throw database_exception_1.DatabaseException.BadRequest("Could not delete session");
            }
            return deletedSession;
        });
    }
    findSessionByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw auth_exception_1.AuthException.UnAuthorizedError();
            }
            const sessionData = yield prisma.session.findUnique({
                where: { token },
            });
            if (!sessionData) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find session by token");
            }
            return sessionData;
        });
    }
    validateRefreshToken(token) {
        if (!token) {
            throw auth_exception_1.AuthException.UnAuthorizedError();
        }
        if (!process.env.JWT_REFRESH_SECRET) {
            throw new Error("Some environment variables are not defined");
        }
        try {
            const veryfyResult = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
            return veryfyResult;
        }
        catch (error) {
            throw auth_exception_1.AuthException.UnAuthorizedError();
        }
    }
    validateAccessToken(token) {
        if (!token) {
            throw auth_exception_1.AuthException.UnAuthorizedError();
        }
        if (!process.env.JWT_ACCESS_SECRET) {
            throw new Error("Some environment variables are not defined");
        }
        try {
            const veryfyResult = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
            return veryfyResult;
        }
        catch (error) {
            return null;
        }
    }
}
exports.default = new SessionService();

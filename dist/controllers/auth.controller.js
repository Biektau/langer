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
const user_service_1 = __importDefault(require("../services/user.service"));
const mail_service_1 = __importDefault(require("../services/mail.service"));
const session_service_1 = __importDefault(require("../services/session.service"));
class AuthController {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signupDto = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                };
                const newUser = yield user_service_1.default.createUser(signupDto);
                const sendedMailStatus = yield mail_service_1.default.sendActivationMail(newUser.email, newUser.activationLink);
                const tokenPayloadDto = {
                    id: newUser.id,
                    username: newUser.username,
                };
                const tokens = session_service_1.default.generateTokens(tokenPayloadDto);
                const sessionDto = {
                    userId: newUser.id,
                    token: tokens.refreshToken,
                };
                const session = yield session_service_1.default.saveSession(sessionDto);
                res.cookie("refreshToken", tokens.refreshToken, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.status(201).json({
                    message: "Signup completed successfully",
                    data: { newUser, sendedMailStatus, tokens, session },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    signin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signinDto = {
                    email: req.body.email,
                    password: req.body.password,
                };
                const user = yield user_service_1.default.getUserByEmail(signinDto.email);
                const comparePasswordsResult = yield user_service_1.default.comparePasswords(signinDto.password, user.password);
                const tokenPayloadDto = {
                    id: user.id,
                    username: user.username,
                };
                const tokens = session_service_1.default.generateTokens(tokenPayloadDto);
                const sessionDto = {
                    userId: user.id,
                    token: tokens.refreshToken,
                };
                const session = yield session_service_1.default.saveSession(sessionDto);
                res.cookie("refreshToken", tokens.refreshToken, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.status(201).json({
                    message: "Signin completed successfully",
                    data: { user, comparePasswordsResult, tokens, session },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    signout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const deletedSession = yield session_service_1.default.deleteSession(refreshToken);
                res.clearCookie("refreshToken");
                res
                    .status(201)
                    .json({ message: "signout completed successfully", deletedSession });
            }
            catch (error) {
                next(error);
            }
        });
    }
    activateAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { activationLink } = req.params;
                const activationResult = yield user_service_1.default.activateAccount(activationLink);
                res.status(201).json(activationResult);
            }
            catch (error) {
                next(error);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const validationRefreshTokenResult = session_service_1.default.validateRefreshToken(refreshToken);
                const findedSession = yield session_service_1.default.findSessionByToken(refreshToken);
                const findedUser = yield user_service_1.default.getUserById(findedSession.userId);
                const tokenPayloadDto = {
                    id: findedUser.id,
                    username: findedUser.username,
                };
                const tokens = session_service_1.default.generateTokens(tokenPayloadDto);
                const sessionDto = {
                    userId: findedUser.id,
                    token: tokens.refreshToken,
                };
                const savedSession = yield session_service_1.default.saveSession(sessionDto);
                res.cookie("refreshToken", tokens.refreshToken, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.status(201).json({
                    message: "tokens updated successfully, new session created/updated",
                    validationRefreshTokenResult,
                    findedSession,
                    findedUser,
                    savedSession,
                    tokens,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();

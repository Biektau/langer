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
const language_service_1 = __importDefault(require("../services/language.service"));
const session_service_1 = __importDefault(require("../services/session.service"));
class UserController {
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const user = yield user_service_1.default.getUserById(currentUser.id);
                res.status(200).json({ message: "User data successfully fetched", user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const updateUserDto = req.body;
                const updatedUser = yield user_service_1.default.updateUser(currentUser.id, updateUserDto);
                res
                    .status(200)
                    .json({ message: "User updated successfully", updatedUser });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const { refreshToken } = req.cookies;
                yield language_service_1.default.deleteAllLanguages(currentUser.id);
                const deletedSession = yield session_service_1.default.deleteSession(refreshToken);
                const deletedUser = yield user_service_1.default.deleteUser(currentUser.id);
                res.clearCookie("refreshToken");
                res
                    .status(200)
                    .json({
                    message: "User deleted successfully",
                    deletedUser,
                    deletedSession,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();

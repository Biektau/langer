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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_exception_1 = require("../exceptions/database.exception");
const main_validation_1 = require("../validations/main.validation");
const user_schema_1 = require("../validations/schemas/user.schema");
const validation_exception_1 = require("../exceptions/validation.exception");
const randomstring_1 = __importDefault(require("randomstring"));
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
class UserService {
    createUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResult = (0, main_validation_1.validateData)(user_schema_1.createUserSchema, createUserDto);
            if (!validationResult.success) {
                throw validation_exception_1.ValidationException.UserValidationError("Invalid validation", validationResult.errors || []);
            }
            const existingUser = yield prisma.user.findUnique({
                where: { email: createUserDto.email },
            });
            if (existingUser) {
                throw database_exception_1.DatabaseException.BadRequest("User with this email already exists");
            }
            const hashedPassword = yield bcryptjs_1.default.hash(createUserDto.password, 10);
            const activationLink = randomstring_1.default.generate({
                length: 20,
                charset: "alphanumeric",
            });
            const newUser = yield prisma.user.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    username: createUserDto.username,
                    email: createUserDto.email,
                    password: hashedPassword,
                    activationLink,
                },
            });
            if (!newUser) {
                throw database_exception_1.DatabaseException.BadRequest("Could not create user");
            }
            return newUser;
        });
    }
    updateUser(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResult = (0, main_validation_1.validateData)(user_schema_1.updateUserSchema, updateUserDto);
            if (!validationResult.success) {
                throw validation_exception_1.ValidationException.UserValidationError("Invalid validation", validationResult.errors || []);
            }
            const existingUser = yield prisma.user.findUnique({ where: { id } });
            if (!existingUser) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find user");
            }
            if (updateUserDto.email) {
                const sameEmailInDb = yield prisma.user.findUnique({
                    where: { email: updateUserDto.email },
                });
                if (sameEmailInDb) {
                    throw database_exception_1.DatabaseException.BadRequest("User with this email already exists");
                }
            }
            if (updateUserDto.password) {
                updateUserDto.password = yield bcryptjs_1.default.hash(updateUserDto.password, 10);
            }
            const updatedUser = yield prisma.user.update({
                where: { id },
                data: {
                    username: updateUserDto.username || existingUser.username,
                    email: updateUserDto.email || existingUser.email,
                    password: updateUserDto.password || existingUser.password,
                },
            });
            if (!updatedUser) {
                throw database_exception_1.DatabaseException.BadRequest("Could not update user");
            }
            return updatedUser;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield prisma.user.delete({ where: { id } });
            if (!deletedUser) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find user");
            }
            return deletedUser;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw database_exception_1.DatabaseException.BadRequest("User with this email does not exist");
            }
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find user by id");
            }
            return user;
        });
    }
    comparePasswords(inputPassword, realPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield bcryptjs_1.default.compare(inputPassword, realPassword);
            if (!match) {
                throw database_exception_1.DatabaseException.BadRequest("Incorrect password");
            }
            return { message: "Passwords successfully matched" };
        });
    }
    activateAccount(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield prisma.user.findFirst({
                where: { activationLink: activationLink },
            });
            if (!userData) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find user by activation link");
            }
            const updateUser = yield prisma.user.update({
                where: { id: userData.id },
                data: { isActivated: true },
            });
            if (!updateUser) {
                throw database_exception_1.DatabaseException.BadRequest("Could not activate user by activation link");
            }
            return { message: "Activated" };
        });
    }
}
exports.default = new UserService();

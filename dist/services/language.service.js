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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const main_validation_1 = require("../validations/main.validation");
const language_schema_1 = require("../validations/schemas/language.schema");
const validation_exception_1 = require("../exceptions/validation.exception");
const database_exception_1 = require("../exceptions/database.exception");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
class LanguageService {
    createLanguage(createLanguageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResult = (0, main_validation_1.validateData)(language_schema_1.createLanguageSchema, createLanguageDto);
            if (!validationResult.success) {
                throw validation_exception_1.ValidationException.LanguageValidationError("Invalid validation", validationResult.errors || []);
            }
            const existingLanguage = yield prisma.language.findFirst({
                where: {
                    name: createLanguageDto.name,
                    userId: createLanguageDto.userId,
                },
            });
            if (existingLanguage) {
                throw database_exception_1.DatabaseException.BadRequest("Language with this name already exists");
            }
            const newLanguage = yield prisma.language.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    userId: createLanguageDto.userId,
                    name: createLanguageDto.name,
                    purpose: createLanguageDto.purpose,
                },
            });
            if (!newLanguage) {
                throw database_exception_1.DatabaseException.BadRequest("Could not create language");
            }
            return newLanguage;
        });
    }
    getOneLanguage(userId, languageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = yield prisma.language.findFirst({
                where: { userId, id: languageId },
            });
            if (!language) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find language");
            }
            return language;
        });
    }
    getAllLanguages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const languages = yield prisma.language.findMany({
                where: { userId },
            });
            if (languages.length === 0) {
                return "There are no languages for this user";
            }
            return languages;
        });
    }
    deleteOneLanguage(userId, languageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = yield prisma.language.findFirst({
                where: { userId, id: languageId },
            });
            if (!language) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find language");
            }
            const deletedLanguage = yield prisma.language.delete({
                where: { id: language.id },
            });
            if (!deletedLanguage) {
                throw database_exception_1.DatabaseException.BadRequest("Could not delete language");
            }
            return deletedLanguage;
        });
    }
    deleteAllLanguages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const languages = yield prisma.language.findMany({
                where: { userId },
            });
            if (!languages || languages.length === 0) {
                return;
            }
            yield prisma.language.deleteMany({
                where: { userId },
            });
        });
    }
}
exports.default = new LanguageService();

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
const dictionary_schema_1 = require("../validations/schemas/dictionary.schema");
const validation_exception_1 = require("../exceptions/validation.exception");
const database_exception_1 = require("../exceptions/database.exception");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
class DictionaryService {
    createDictionary(createDictionaryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResult = (0, main_validation_1.validateData)(dictionary_schema_1.createDictionarySchema, createDictionaryDto);
            if (!validationResult.success) {
                throw validation_exception_1.ValidationException.DictionaryValidationError("Invalid validation", validationResult.errors || []);
            }
            const existingDictionary = yield prisma.dictionary.findFirst({
                where: {
                    userId: createDictionaryDto.userId,
                    name: createDictionaryDto.name,
                    languageId: createDictionaryDto.languageId,
                },
            });
            if (existingDictionary) {
                throw database_exception_1.DatabaseException.BadRequest("Dictionary with this name already exists");
            }
            const newDictionary = yield prisma.dictionary.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    userId: createDictionaryDto.userId,
                    languageId: createDictionaryDto.languageId,
                    name: createDictionaryDto.name,
                },
            });
            if (!newDictionary) {
                throw database_exception_1.DatabaseException.BadRequest("Could not create dictionary");
            }
            return newDictionary;
        });
    }
    getOneDictionary(userId, languageId, dictionaryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dictionary = yield prisma.dictionary.findFirst({
                where: { userId, languageId, id: dictionaryId },
            });
            if (!dictionary) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find dictionary");
            }
            return dictionary;
        });
    }
    getAllDictionaries(userId, languageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dictionaries = yield prisma.dictionary.findMany({
                where: { userId, languageId },
            });
            if (!dictionaries) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find dictionaries");
            }
            return dictionaries;
        });
    }
    deleteOneDictionary(userId, dictionaryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dictionary = yield prisma.dictionary.findFirst({
                where: { userId, id: dictionaryId },
            });
            if (!dictionary) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find dictionary");
            }
            const deletedDictionary = yield prisma.dictionary.delete({
                where: { id: dictionary.id },
            });
            if (!deletedDictionary) {
                throw database_exception_1.DatabaseException.BadRequest("Could not delete dictionary");
            }
            return deletedDictionary;
        });
    }
    deleteAllDictionaries(userId, languageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dictionaries = yield prisma.dictionary.findMany({
                where: { userId, languageId },
            });
            if (!dictionaries || dictionaries.length === 0) {
                throw database_exception_1.DatabaseException.BadRequest("Could not find dictionaries");
            }
            const deletedDictionaries = yield prisma.dictionary.deleteMany({
                where: { userId, languageId },
            });
            if (!deletedDictionaries) {
                throw database_exception_1.DatabaseException.BadRequest("Could not delete dictionaries");
            }
            return dictionaries;
        });
    }
}
exports.default = new DictionaryService();

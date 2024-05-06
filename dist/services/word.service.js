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
const word_schema_1 = require("../validations/schemas/word.schema");
const uuid_1 = require("uuid");
const validation_exception_1 = require("../exceptions/validation.exception");
const database_exception_1 = require("../exceptions/database.exception");
const prisma = new client_1.PrismaClient();
class WordService {
    createWordAI(createWordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResult = (0, main_validation_1.validateData)(word_schema_1.createWordAISchema, createWordDto);
            if (!validationResult.success) {
                throw validation_exception_1.ValidationException.WordValidationError("Validation failed", validationResult.errors || []);
            }
            const existingWord = yield prisma.word.findFirst({
                where: {
                    original: createWordDto.original,
                    languageId: createWordDto.languageId,
                    dictionaryId: createWordDto.dictionaryId,
                },
            });
            if (existingWord) {
                throw database_exception_1.DatabaseException.BadRequest("Word already exists");
            }
            const newWord = yield prisma.word.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    languageId: createWordDto.languageId,
                    dictionaryId: createWordDto.dictionaryId,
                    original: createWordDto.original,
                    translation: "soon",
                },
            });
            return newWord;
        });
    }
    createWordManually(createWordManuallyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const validationResult = (0, main_validation_1.validateData)(word_schema_1.createWordManuallySchema, createWordManuallyDto);
            if (!validationResult.success) {
                throw validation_exception_1.ValidationException.WordValidationError("Validation failed", validationResult.errors || []);
            }
            const existingWord = yield prisma.word.findFirst({
                where: {
                    original: createWordManuallyDto.original,
                    languageId: createWordManuallyDto.languageId,
                    dictionaryId: createWordManuallyDto.dictionaryId,
                    translation: createWordManuallyDto.translation,
                },
            });
            if (existingWord) {
                throw database_exception_1.DatabaseException.BadRequest("Word already exists");
            }
            const newWord = yield prisma.word.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    languageId: createWordManuallyDto.languageId,
                    dictionaryId: createWordManuallyDto.dictionaryId,
                    original: createWordManuallyDto.original,
                    translation: createWordManuallyDto.translation,
                },
            });
            return newWord;
        });
    }
}
exports.default = new WordService();

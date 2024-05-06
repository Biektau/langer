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
const word_service_1 = __importDefault(require("../services/word.service"));
class WordController {
    createWordAI(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createWordDto = {
                    userId: req.currentUser.id,
                    languageId: req.body.languageId,
                    dictionaryId: req.body.dictionaryId,
                    original: req.body.original,
                };
                const word = yield word_service_1.default.createWordAI(createWordDto);
                res.status(201).json(word);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createWordManually(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getAllWords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getOneWord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteOneWord(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteAllWords(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new WordController();

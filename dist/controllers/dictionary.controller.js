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
const dictionary_service_1 = __importDefault(require("../services/dictionary.service"));
class DictionaryController {
    createDictionary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const languageId = req.body.languageId;
                const createDictionaryDto = {
                    userId: currentUser.id,
                    languageId: languageId,
                    name: req.body.name,
                };
                const createdDictionary = yield dictionary_service_1.default.createDictionary(createDictionaryDto);
                res.status(201).json(createdDictionary);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOneDictionary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const languageId = req.body.languageId;
                const dictionaryId = req.body.dictionaryId;
                const dictionary = yield dictionary_service_1.default.getOneDictionary(currentUser.id, languageId, dictionaryId);
                res.status(200).json(dictionary);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllDictionaries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const languageId = req.body.languageId;
                const allDictionaries = yield dictionary_service_1.default.getAllDictionaries(currentUser.id, languageId);
                res.status(200).json(allDictionaries);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOneDictionary(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const dictionaryId = req.body.dictionaryId;
                const deletedDictionary = yield dictionary_service_1.default.deleteOneDictionary(currentUser.id, dictionaryId);
                res.status(200).json({
                    message: "Dictionary deleted successfully",
                    deletedDictionary,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteAllDictionaries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const languageId = req.body.languageId;
                const deletedDictionaries = yield dictionary_service_1.default.deleteAllDictionaries(currentUser.id, languageId);
                res
                    .status(200)
                    .json({
                    message: "All languges deleted successfully",
                    deletedDictionaries,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new DictionaryController();

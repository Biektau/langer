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
const language_service_1 = __importDefault(require("../services/language.service"));
class LanguageController {
    createLanguage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const createLanguageDto = {
                    userId: currentUser.id,
                    name: req.body.name,
                    purpose: req.body.purpose,
                };
                const newLanguage = yield language_service_1.default.createLanguage(createLanguageDto);
                res.status(201).json(newLanguage);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOneLanguage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const languageId = req.body.languageId;
                const oneLanguage = yield language_service_1.default.getOneLanguage(currentUser.id, languageId);
                res.status(200).json(oneLanguage);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllLanguages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const allLanguages = yield language_service_1.default.getAllLanguages(currentUser.id);
                res.status(200).json(allLanguages);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOneLanguage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                const languageId = req.body.languageId;
                const deletedLanguage = yield language_service_1.default.deleteOneLanguage(currentUser.id, languageId);
                res
                    .status(200)
                    .json({ message: "Languge deleted successfully", deletedLanguage });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteAllLanguages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.currentUser;
                yield language_service_1.default.deleteAllLanguages(currentUser.id);
                res.status(200).json({ message: "All languges deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new LanguageController();

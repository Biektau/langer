"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const dictionary_controller_1 = __importDefault(require("../controllers/dictionary.controller"));
const router = (0, express_1.default)();
router.post("/createDictionary", auth_middleware_1.default, dictionary_controller_1.default.createDictionary);
router.get("/getAllDictionariesByLanguage", auth_middleware_1.default, dictionary_controller_1.default.getAllDictionaries);
router.get("/getOneDictionary", auth_middleware_1.default, dictionary_controller_1.default.getOneDictionary);
router.delete("/deleteOneDictionary", auth_middleware_1.default, dictionary_controller_1.default.deleteOneDictionary);
router.delete("/deleteAllDictionaries", auth_middleware_1.default, dictionary_controller_1.default.deleteAllDictionaries);
exports.default = router;

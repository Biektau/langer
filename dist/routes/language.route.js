"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const language_controller_1 = __importDefault(require("../controllers/language.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.default)();
router.post("/createLanguage", auth_middleware_1.default, language_controller_1.default.createLanguage);
router.get("/getAllLanguages", auth_middleware_1.default, language_controller_1.default.getAllLanguages);
router.get("/getOneLanguage", auth_middleware_1.default, language_controller_1.default.getOneLanguage);
router.delete("/deleteOneLanguage", auth_middleware_1.default, language_controller_1.default.deleteOneLanguage);
router.delete("/deleteAllLanguages", auth_middleware_1.default, language_controller_1.default.deleteAllLanguages);
exports.default = router;

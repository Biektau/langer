"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const word_controller_1 = __importDefault(require("../controllers/word.controller"));
const router = (0, express_1.default)();
router.post("/createWordAI", auth_middleware_1.default, word_controller_1.default.createWordAI);
router.post("/createWordManually", auth_middleware_1.default, word_controller_1.default.createWordManually);
router.get("/getAllWords", auth_middleware_1.default, word_controller_1.default.getAllWords);
router.get("/getOneWord", auth_middleware_1.default, word_controller_1.default.getOneWord);
router.delete("/deleteOneWord", auth_middleware_1.default, word_controller_1.default.deleteOneWord);
router.delete("/deleteAllWords", auth_middleware_1.default, word_controller_1.default.deleteAllWords);
exports.default = router;

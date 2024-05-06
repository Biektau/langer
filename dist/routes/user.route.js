"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.default)();
router.get("/getProfile", auth_middleware_1.default, user_controller_1.default.getProfile);
router.put("/updateUser", auth_middleware_1.default, user_controller_1.default.updateUser);
router.delete("/deleteUser", auth_middleware_1.default, user_controller_1.default.deleteUser);
exports.default = router;

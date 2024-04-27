import Router from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/getProfile", authMiddleware, userController.getProfile);
router.put("/updateUser", authMiddleware, userController.updateUser);
router.delete("/deleteUser", authMiddleware, userController.deleteUser);

export default router;

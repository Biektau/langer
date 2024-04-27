import Router from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);

router.get("/activateAccount/:activationLink", authController.activateAccount);
router.get("/refresh", authController.refresh);

export default router;

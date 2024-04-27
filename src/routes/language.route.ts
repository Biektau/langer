import Router from "express";

import languageController from "../controllers/language.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/createLanguage",
  authMiddleware,
  languageController.createLanguage
);

router.get(
  "/getAllLanguages",
  authMiddleware,
  languageController.getAllLanguages
);

router.delete(
  "/deleteLanguage",
  authMiddleware,
  languageController.deleteLanguage
);

export default router;

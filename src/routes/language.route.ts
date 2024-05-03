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

router.get(
  "/getOneLanguage",
  authMiddleware,
  languageController.getOneLanguage);

router.delete(
  "/deleteOneLanguage",
  authMiddleware,
  languageController.deleteOneLanguage
);

router.delete(
  "/deleteAllLanguages",
  authMiddleware,
  languageController.deleteAllLanguages
);

export default router;

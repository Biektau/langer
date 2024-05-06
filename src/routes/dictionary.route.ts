import Router from "express";
import authMiddleware from "../middlewares/auth.middleware";
import dictionaryController from "../controllers/dictionary.controller";

const router = Router();

router.post(
  "/createDictionary",
  authMiddleware,
  dictionaryController.createDictionary
);

router.get(
  "/getAllDictionariesByLanguage",
  authMiddleware,
  dictionaryController.getAllDictionaries
);

router.get(
  "/getOneDictionary",
  authMiddleware,
  dictionaryController.getOneDictionary
);

router.delete(
  "/deleteOneDictionary",
  authMiddleware,
  dictionaryController.deleteOneDictionary
);

router.delete(
  "/deleteAllDictionaries",
  authMiddleware,
  dictionaryController.deleteAllDictionaries
);

export default router;

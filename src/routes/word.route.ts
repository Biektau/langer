import Router from "express";
import authMiddleware from "../middlewares/auth.middleware";
import wordController from "../controllers/word.controller";

const router = Router();

router.post("/createWordAI", authMiddleware, wordController.createWordAI);

router.post(
  "/createWordManually",
  authMiddleware,
  wordController.createWordManually
);

router.get("/getAllWords", authMiddleware, wordController.getAllWords);

router.get("/getOneWord", authMiddleware, wordController.getOneWord);

router.delete("/deleteOneWord", authMiddleware, wordController.deleteOneWord);

router.delete("/deleteAllWords", authMiddleware, wordController.deleteAllWords);

export default router;

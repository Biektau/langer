import { NextFunction, Request, Response } from "express";
import { CreateWordDto } from "../dto/word.dto";
import wordService from "../services/word.service";

class WordController {
  public async createWordAI(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const createWordDto: CreateWordDto = {
        userId: req.currentUser.id,
        languageId: req.body.languageId,
        dictionaryId: req.body.dictionaryId,
        original: req.body.original,
      };
      const word = await wordService.createWordAI(createWordDto);

      res.status(201).json(word);
    } catch (error) {
      next(error);
    }
  }

  public async createWordManually(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  public async getAllWords(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  public async getOneWord(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  public async deleteOneWord(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  public async deleteAllWords(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}

export default new WordController();

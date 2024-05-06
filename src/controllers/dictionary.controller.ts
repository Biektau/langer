import { NextFunction, Request, Response } from "express";
import { CreateDictionaryDto } from "../dto/dictionary.dto";
import dictionaryService from "../services/dictionary.service";

class DictionaryController {
  public async createDictionary(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;
      const languageId = req.body.languageId;

      const createDictionaryDto: CreateDictionaryDto = {
        userId: currentUser.id,
        languageId: languageId,
        name: req.body.name,
      };

      const createdDictionary = await dictionaryService.createDictionary(
        createDictionaryDto
      );

      res.status(201).json(createdDictionary);
    } catch (error) {
      next(error);
    }
  }

  public async getOneDictionary(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;
      const languageId = req.body.languageId;
      const dictionaryId = req.body.dictionaryId;

      const dictionary = await dictionaryService.getOneDictionary(
        currentUser.id,
        languageId,
        dictionaryId
      );

      res.status(200).json(dictionary);
    } catch (error) {
      next(error);
    }
  }

  public async getAllDictionaries(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;
      const languageId = req.body.languageId;

      const allDictionaries = await dictionaryService.getAllDictionaries(
        currentUser.id,
        languageId
      );

      res.status(200).json(allDictionaries);
    } catch (error) {
      next(error);
    }
  }

  public async deleteOneDictionary(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;
      const dictionaryId = req.body.dictionaryId;
      const deletedDictionary = await dictionaryService.deleteOneDictionary(
        currentUser.id,
        dictionaryId
      );
      res.status(200).json({
        message: "Dictionary deleted successfully",
        deletedDictionary,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteAllDictionaries(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;
      const languageId = req.body.languageId;

      const deletedDictionaries = await dictionaryService.deleteAllDictionaries(
        currentUser.id,
        languageId
      );

      res
        .status(200)
        .json({
          message: "All languges deleted successfully",
          deletedDictionaries,
        });
    } catch (error) {
      next(error);
    }
  }
}

export default new DictionaryController();

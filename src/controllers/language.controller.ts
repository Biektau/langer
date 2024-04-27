import { NextFunction, Request, Response } from "express";
import { CreateLanguageDto, UpdateLanguageDto } from "../dto/language.dto";
import languageService from "../services/language.service";

class LanguageController {
  public async createLanguage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;
      const createLanguageDto: CreateLanguageDto = {
        name: req.body.name,
        userId: currentUser.id,
      };
      const newLanguage = await languageService.createLanguage(
        createLanguageDto
      );

      res.status(201).json(newLanguage);
    } catch (error) {
      next(error);
    }
  }

  public async getAllLanguages(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;
      const allLanguages = await languageService.getAllLanguages(
        currentUser.id
      );
      res.status(200).json(allLanguages);
    } catch (error) {
      next(error);
    }
  }

  public async updateLanguage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;

      const updateLanguageDto: UpdateLanguageDto = {
        name: req.body.name,
        userId: currentUser.id,
      };
      const updatedLanguage = await languageService.updateLanguage(
        currentUser.id,
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "Language updated successfully", updatedLanguage });
    } catch (error) {
      next(error);
    }
  }

  public async deleteLanguage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new LanguageController();

import { PrismaClient, Language } from "@prisma/client";
import { CreateLanguageDto } from "../dto/language.dto";
import { validateCreateLanguageData } from "../validations/language.validation";
import { ValidationException } from "../exceptions/validation.exception";
import { DatabaseException } from "../exceptions/database.exception";
const prisma = new PrismaClient();

class LanguageService {
  public async createLanguage(
    createLanguageDto: CreateLanguageDto
  ): Promise<Language> {
    const validationResult = validateCreateLanguageData(createLanguageDto);

    if (!validationResult.success) {
      throw ValidationException.LanguageValidationError(
        "Invalid validation",
        validationResult.errors || []
      );
    }

    const existingLanguage = await prisma.language.findFirst({
      where: {
        name: createLanguageDto.name,
        userId: createLanguageDto.userId,
      },
    });

    if (existingLanguage) {
      throw DatabaseException.BadRequest(
        "Language with this name already exists"
      );
    }
    const newLanguage = await prisma.language.create({
      data: {
        userId: createLanguageDto.userId,
        name: createLanguageDto.name,
      },
    });

    if (!newLanguage) {
      throw DatabaseException.BadRequest("Could not create language");
    }
    return newLanguage;
  }

  public async getAllLanguages(userId: number): Promise<Language[] | string> {
    const languages = await prisma.language.findMany({
      where: { userId },
    });

    if (languages.length === 0) {
      return "There are no languages for this user";
    }

    return languages;
  }

  // public async updateLanguage(updateLanguageDto: UpdateLanguageDto): Promise<Language> {

  // }
}

export default new LanguageService();

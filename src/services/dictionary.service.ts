import { PrismaClient, Dictionary } from "@prisma/client";
import { validateData } from "../validations/main.validation";
import { createDictionarySchema } from "../validations/schemas/dictionary.schema";
import { ValidationException } from "../exceptions/validation.exception";
import { DatabaseException } from "../exceptions/database.exception";
import { CreateDictionaryDto } from "../dto/dictionary.dto";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

class DictionaryService {
  public async createDictionary(
    createDictionaryDto: CreateDictionaryDto
  ): Promise<Dictionary> {
    const validationResult = validateData(
      createDictionarySchema,
      createDictionaryDto
    );
    if (!validationResult.success) {
      throw ValidationException.DictionaryValidationError(
        "Invalid validation",
        validationResult.errors || []
      );
    }

    const existingDictionary = await prisma.dictionary.findFirst({
      where: {
        userId: createDictionaryDto.userId,
        name: createDictionaryDto.name,
        languageId: createDictionaryDto.languageId,
      },
    });
    if (existingDictionary) {
      throw DatabaseException.BadRequest(
        "Dictionary with this name already exists"
      );
    }

    const newDictionary = await prisma.dictionary.create({
      data: {
        id: uuidv4(),
        userId: createDictionaryDto.userId,
        languageId: createDictionaryDto.languageId,
        name: createDictionaryDto.name,
      },
    });

    if (!newDictionary) {
      throw DatabaseException.BadRequest("Could not create dictionary");
    }

    return newDictionary;
  }

  public async getOneDictionary(
    userId: string,
    languageId: string,
    dictionaryId: string
  ): Promise<Dictionary> {
    const dictionary = await prisma.dictionary.findFirst({
      where: { userId, languageId, id: dictionaryId },
    });
    if (!dictionary) {
      throw DatabaseException.BadRequest("Could not find dictionary");
    }
    return dictionary;
  }

  public async getAllDictionaries(
    userId: string,
    languageId: string
  ): Promise<Dictionary[]> {
    const dictionaries = await prisma.dictionary.findMany({
      where: { userId, languageId },
    });
    if (!dictionaries) {
      throw DatabaseException.BadRequest("Could not find dictionaries");
    }
    return dictionaries;
  }

  public async deleteOneDictionary(
    userId: string,
    dictionaryId: string
  ): Promise<Dictionary> {
    const dictionary = await prisma.dictionary.findFirst({
      where: { userId, id: dictionaryId },
    });
    if (!dictionary) {
      throw DatabaseException.BadRequest("Could not find dictionary");
    }
    const deletedDictionary = await prisma.dictionary.delete({
      where: { id: dictionary.id },
    });
    if (!deletedDictionary) {
      throw DatabaseException.BadRequest("Could not delete dictionary");
    }
    return deletedDictionary;
  }

  public async deleteAllDictionaries(
    userId: string,
    languageId: string
  ): Promise<Dictionary[]> {
    const dictionaries = await prisma.dictionary.findMany({
      where: { userId, languageId },
    });
    if (!dictionaries || dictionaries.length === 0) {
      throw DatabaseException.BadRequest("Could not find dictionaries");
    }
    const deletedDictionaries = await prisma.dictionary.deleteMany({
      where: { userId, languageId },
    });
    if (!deletedDictionaries) {
      throw DatabaseException.BadRequest("Could not delete dictionaries");
    }
    return dictionaries;
  }
}

export default new DictionaryService();

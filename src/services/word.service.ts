import { PrismaClient, Word } from "@prisma/client";
import { validateData } from "../validations/main.validation";
import {
  createWordAISchema,
  createWordManuallySchema,
} from "../validations/schemas/word.schema";
import { v4 as uuidv4 } from "uuid";
import { CreateWordDto, CreateWordManuallyDto } from "../dto/word.dto";
import { ValidationException } from "../exceptions/validation.exception";
import { DatabaseException } from "../exceptions/database.exception";


const prisma = new PrismaClient();

class WordService {
  public async createWordAI(createWordDto: CreateWordDto): Promise<Word> {
    const validationResult = validateData(createWordAISchema, createWordDto);

    if (!validationResult.success) {
      throw ValidationException.WordValidationError(
        "Validation failed",
        validationResult.errors || []
      );
    }

    const existingWord = await prisma.word.findFirst({
      where: {
        original: createWordDto.original,
        languageId: createWordDto.languageId,
        dictionaryId: createWordDto.dictionaryId,
      },
    });

    if (existingWord) {
      throw DatabaseException.BadRequest("Word already exists");
    }

    const newWord = await prisma.word.create({
      data: {
        id: uuidv4(),
        languageId: createWordDto.languageId,
        dictionaryId: createWordDto.dictionaryId,
        original: createWordDto.original,
        translation: "soon",
      },
    });

    return newWord;
  }

  public async createWordManually(
    createWordManuallyDto: CreateWordManuallyDto
  ): Promise<Word> {
    const validationResult = validateData(
      createWordManuallySchema,
      createWordManuallyDto
    );

    if (!validationResult.success) {
      throw ValidationException.WordValidationError(
        "Validation failed",
        validationResult.errors || []
      );
    }

    const existingWord = await prisma.word.findFirst({
      where: {
        original: createWordManuallyDto.original,
        languageId: createWordManuallyDto.languageId,
        dictionaryId: createWordManuallyDto.dictionaryId,
        translation: createWordManuallyDto.translation,
      },
    });

    if (existingWord) {
      throw DatabaseException.BadRequest("Word already exists");
    }

    const newWord = await prisma.word.create({
      data: {
        id: uuidv4(),
        languageId: createWordManuallyDto.languageId,
        dictionaryId: createWordManuallyDto.dictionaryId,
        original: createWordManuallyDto.original,
        translation: createWordManuallyDto.translation,
      },
    });

    return newWord;
  }
}

export default new WordService();

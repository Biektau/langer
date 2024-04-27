import { z, ZodError } from "zod";

// Массив допустимых языков для создания
const availableLanguages = [
  "English",
  "Spanish",
  "Mandarin Chinese",
  "Hindi",
  "Arabic",
  "Portuguese",
  "Bengali",
  "Russian",
  "Japanese",
  "Punjabi",
  "German",
  "Javanese",
  "Wu Chinese",
  "Korean",
  "French",
  "Telugu",
  "Vietnamese",
  "Marathi",
  "Tamil",
  "Urdu",
  "Turkish",
  "Italian",
  "Yue Chinese",
  "Thai",
  "Gujarati",
  "Jin Chinese",
  "Persian",
  "Polish",
  "Pashto",
  "Kannada",
  "Xiang Chinese",
  "Malayalam",
  "Sundanese",
  "Hausa",
  "Odia",
  "Burmese",
  "Hakka Chinese",
  "Ukrainian",
  "Bhojpuri",
  "Tagalog",
  "Yoruba",
  "Maithili",
  "Uzbek",
  "Sindhi",
  "Amharic",
  "Fula",
  "Romanian",
  "Igbo",
  "Oromo",
  "Azerbaijani",
  "Awadhi",
  "Gan Chinese",
  "Cebuano",
  "Dutch",
  "Kurdish",
  "Serbo-Croatian",
  "Malagasy",
  "Saraiki",
  "Nepali",
  "Sinhalese",
  "Chittagonian",
  "Zhuang Chinese",
  "Khmer",
  "Turkmen",
  "Assamese",
  "Madurese",
  "Somali",
  "Marwari",
  "Magahi",
  "Haryanvi",
  "Hungarian",
  "Chhattisgarhi",
  "German Swahili",
  "Zulu",
  "Ilocano",
  "Hejazi Arabic",
  "Kaonde",
  "Kinyarwanda",
  "Dhundari",
  "Haitian Creole",
  "Hausa",
  "Bihari",
  "Yiddish",
  "Modern Greek",
  "Xhosa",
  "Oromiffa",
  "Mossi",
  "Belarusian",
  "Albanian",
  "Saraiki",
  "Nigerian Fulfulde",
  "Mandinka",
  "Nyanja",
  "Zande",
] as const;

// Схема для создания пользователя с языком
const createLanguageSchema = z.object({
  userId: z.number(),
  name: z.enum(availableLanguages),
});

// Функция валидации данных пользователя с языком
export function validateCreateLanguageData(data: unknown): {
  success: boolean;
  errors?: string[];
} {
  return validateData(createLanguageSchema, data);
}

// Общая функция валидации данных
function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: boolean; errors?: string[] } {
  try {
    schema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue) => issue.message);
      return { success: false, errors: errorMessages };
    }
    throw error;
  }
}

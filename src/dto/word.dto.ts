export interface CreateWordDto {
  userId: string;
  languageId: string;
  dictionaryId: string;
  original: string;
}

export interface CreateWordManuallyDto {
  userId: string;
  languageId: string;
  dictionaryId: string;
  original: string;
  translation: string;
}

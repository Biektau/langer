export interface CreateLanguageDto {
  userId: number;
  name: string;
}

export interface UpdateLanguageDto {
  userId: number;
  name?: string;
}

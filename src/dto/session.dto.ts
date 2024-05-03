export interface TokenPayloadDto {
  id: string;
  username: string;
}

export interface SessionDto {
  userId: string;
  token: string;
}

export interface TokenPayloadDto {
  id: number;
  username: string;
}

export interface SessionDto {
  userId: number;
  token: string;
  country: string;
  city: string;
  device: string;
  loginSource: string;
}

export interface LocationDto {
  country: string;
  city: string;
  device: string;
  loginSource: string;
}

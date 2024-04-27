import jwt from "jsonwebtoken";
import { PrismaClient, Session } from "@prisma/client";
import { TokenPayloadDto, SessionDto } from "../dto/session.dto";
import { DatabaseException } from "../exceptions/database.exception";
import { AuthException } from "../exceptions/auth.exception";

const prisma = new PrismaClient();

class SessionService {
  public generateTokens(payload: TokenPayloadDto) {
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new Error("Some environment variables are not defined");
    }
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "5h",
    });
    return { accessToken, refreshToken };
  }

  public async saveSession(sessionDto: SessionDto): Promise<Session> {
    const sessionData = await prisma.session.findFirst({
      where: { userId: sessionDto.userId },
    });

    if (sessionData) {
      const updatedSession = await prisma.session.update({
        where: { id: sessionData.id },
        data: { token: sessionDto.token },
      });
      if (!updatedSession) {
        throw DatabaseException.BadRequest("Could not update session");
      }
      return updatedSession;
    }

    const newSession = await prisma.session.create({
      data: sessionDto,
    });

    if (!newSession) {
      throw DatabaseException.BadRequest("Could not create session");
    }
    return newSession;
  }

  public async deleteSession(refreshToken: string): Promise<Session> {
    if (!refreshToken) {
      throw AuthException.UnAuthorizedError();
    }

    const sessionData = await prisma.session.findUnique({
      where: { token: refreshToken },
    });
    if (!sessionData) {
      throw DatabaseException.BadRequest(
        "Could not find session by this token"
      );
    }

    const deletedSession = await prisma.session.delete({
      where: { id: sessionData.id },
    });
    if (!deletedSession) {
      throw DatabaseException.BadRequest("Could not delete session");
    }

    return deletedSession;
  }

  public async findSessionByToken(token: string): Promise<Session> {
    if (!token) {
      throw AuthException.UnAuthorizedError();
    }
    const sessionData = await prisma.session.findUnique({
      where: { token },
    });
    if (!sessionData) {
      throw DatabaseException.BadRequest("Could not find session by token");
    }
    return sessionData;
  }
  public validateRefreshToken(token: string) {
    if (!token) {
      throw AuthException.UnAuthorizedError();
    }

    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error("Some environment variables are not defined");
    }
    try {
      const veryfyResult = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return veryfyResult;
    } catch (error) {
      throw AuthException.UnAuthorizedError();
    }
  }

  public validateAccessToken(token: string) {
    if (!token) {
      throw AuthException.UnAuthorizedError();
    }

    if (!process.env.JWT_ACCESS_SECRET) {
      throw new Error("Some environment variables are not defined");
    }

    try {
      const veryfyResult = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return veryfyResult;
    } catch (error) {
      return null;
    }
  }
}

export default new SessionService();

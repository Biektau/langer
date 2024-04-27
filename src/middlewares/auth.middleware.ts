import { AuthException } from "../exceptions/auth.exception";
import { NextFunction, Request, Response } from "express";
import sessionService from "../services/session.service";

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
    }
  }
}

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return next(AuthException.UnAuthorizedError());
  }

  const accessToken = authorizationHeader.split(" ")[1];
  if (!accessToken) {
    return next(AuthException.UnAuthorizedError());
  }

  try {
    const userData = sessionService.validateAccessToken(accessToken);
    if (!userData) {
      return next(AuthException.UnAuthorizedError());
    }

    request.currentUser = userData;
    next();
  } catch (error) {
    return next(AuthException.UnAuthorizedError());
  }
}

export default authMiddleware;

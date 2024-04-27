import { NextFunction, Request, Response } from "express";
import { DatabaseException } from "../exceptions/database.exception";
import { ValidationException } from "../exceptions/validation.exception";
import { AuthException } from "../exceptions/auth.exception";

function errorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(error);
  if (error instanceof DatabaseException) {
    return response.status(error.status).json(error.toResponse());
  }
  if (error instanceof ValidationException) {
    return response.status(error.status).json(error.toResponse());
  }
  if(error instanceof AuthException){
    return response.status(error.status).json(error.toResponse());
  }
  return response.status(500).json({
    status: 500,
    message: "Internal Server Error",
  });
}

export default errorMiddleware;

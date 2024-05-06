export class ValidationException extends Error {
  status: number;
  errors: string[];

  constructor(status: number, message: string, errors: string[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UserValidationError(
    message: string,
    errors: string[]
  ): ValidationException {
    return new ValidationException(400, message, errors);
  }

  static LanguageValidationError(
    message: string,
    errors: string[]
  ): ValidationException {
    return new ValidationException(400, message, errors);
  }

  static DictionaryValidationError(
    message: string,
    errors: string[]
  ): ValidationException {
    return new ValidationException(400, message, errors);
  }

  static WordValidationError(
    message: string,
    errors: string[]
  ): ValidationException {
    return new ValidationException(400, message, errors);
  }
  
  toResponse(): { status: number; message: string; errors: string[] } {
    return {
      status: this.status,
      message: this.message,
      errors: this.errors,
    };
  }
}

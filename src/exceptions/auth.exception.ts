export class AuthException extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
    }
  
    static UnAuthorizedError(): AuthException {
      return new AuthException(401, "User is not authorized");
    }
  
    toResponse(): { status: number; message: string } {
      return {
        status: this.status,
        message: this.message,
      };
    }
  }
  
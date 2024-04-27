export class DatabaseException extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
    }
  
    static BadRequest(message: string): DatabaseException {
      return new DatabaseException(400, message);
    }
  
    toResponse(): { status: number; message: string } {
      return {
        status: this.status,
        message: this.message,
      };
    }
  }
  
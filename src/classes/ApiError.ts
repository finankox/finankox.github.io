interface ErrorData {
    message: string;
    error: string;
    statusCode: number;
  }
  
  export class MyError extends Error {
    constructor(public readonly data: ErrorData) {
      super(data.message || `error name="${data.error}"`);
    }
  }
  
  export class ApiError extends MyError {
    constructor(public readonly data: ErrorData) {
        super(data);
    }
  }
  
  export class ApiInternalError extends ApiError {
    constructor(error?: Error) {
        super({
            error: 'general.internalError',
            message: error?.message || 'Internal error',
            statusCode: 500,
        });
    }
  }
  
  
  export class ApiUnauthorizedError extends ApiError {
    constructor(message = 'Unauthorized') {
        super({
            error: 'auth.unauthorized',
            message,
            statusCode: 401,
        });
    }
  }
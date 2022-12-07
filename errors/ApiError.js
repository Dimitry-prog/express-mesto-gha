class ApiError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static notFound(msg) {
    return new ApiError(404, msg);
  }

  static requiredAuth(msg) {
    return new ApiError(401, msg);
  }
}

export default ApiError;

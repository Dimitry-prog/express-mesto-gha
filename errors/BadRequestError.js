class BadRequestError extends Error {
  constructor() {
    super();
    this.message = 'Incorrect data';
    this.statusCode = 400;
  }
}

export default BadRequestError;

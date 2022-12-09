class RequiredAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'authorization';
    this.statusCode = 401;
  }
}

export default RequiredAuthError;

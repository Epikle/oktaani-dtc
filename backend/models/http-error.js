class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Provides message to default Error constructor
    this.code = errorCode; //Add a code property
  }
}

module.exports = HttpError;

class HandleError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "handleError";
    Error.prepareStackTrace(this.HandleError);
  }
}

export default HandleError;

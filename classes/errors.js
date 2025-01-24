const { API_CODES } = require("../enums/dict");

class Errors {
  static createError(message, statusCode) {
    const error = new Error(message);
    error.code = statusCode >= 599 ? 500 : statusCode;
    return error;
  }

  static CUSTOM_ERROR(code, msg = "Error Occured") {
    return this.createError(msg, code);
  }
  /**
   * Successful requests
   */

  static NO_CONTENT(msg = "No content returned") {
    return this.createError(msg, API_CODES.PARTIAL_CONTENT);
  }
  static PARTIAL_CONTENT(msg = "Partial content is returned") {
    return this.createError(msg, API_CODES.PARTIAL_CONTENT);
  }
  /**
   * Client Side Error
   */
  static BAD_REQUEST(msg = "Error: Bad Request") {
    return this.createError(msg, API_CODES.BAD_REQUEST);
  }
  static UNAUTORIZED(msg = "Error: Request Unautorized") {
    return this.createError(msg, API_CODES.UNAUTORIZED);
  }
  static FORBIDDEN(msg = "Error: Request Forbidden") {
    return this.createError(msg, API_CODES.FORBIDDEN);
  }
  static NOT_FOUND(msg = "Error: Requested item not found") {
    return this.createError(msg, API_CODES.NOT_FOUND);
  }
  static NOT_ACCEPTABLE(msg = "Error: Request Not Acceptable") {
    return this.createError(msg, API_CODES.NOT_ACCEPTABLE);
  }
  static UNSUPPORTED_MEDIA_TYPE(msg = "Error: Unsupported Media Type") {
    return this.createError(msg, API_CODES.UNSUPPORTED_MEDIA_TYPE);
  }
  /**
   * Server Side Error
   */
  static INTERNAL_ERROR(msg = "Error: Internal Server Error") {
    return this.createError(msg, API_CODES.INTERNAL_ERROR);
  }
  static NOT_IMPLEMENTED(msg = "Error: Request Unfulfilled") {
    return this.createError(msg, API_CODES.NOT_IMPLEMENTED);
  }
  static REQUEST_INVALID(msg = "Error: Request returns Invalid") {
    return this.createError(msg, API_CODES.REQUEST_INVALID);
  }
  static REQUEST_TIMEOUT(msg = "Error: Request Timeout") {
    return this.createError(msg, API_CODES.REQUEST_TIMEOUT);
  }
  static INTERNAL_ERROR_DATABASE(
    msg = "Error: Database Error, please seek for developers"
  ) {
    return this.createError(msg, API_CODES.INTERNAL_ERROR_DATABASE);
  }
}

exports.Errors = Errors;

const { API_CODES } = require("../enums/dict");

class APIResponse {
  static CUSTOM_ERROR_RESPONSE(res, code, msg = "Error Occured") {
    res.status(code >= 599 ? 500 : code).send({
      isSuccess: false,
      msg:
        code === 11000 ? "An entry already exists for the given details." : msg,
      data: null,
    });
  }
  /**
   * Successful requests
   */
  static SUCCESS(res, data = null, msg = "Request is successful") {
    res.status(API_CODES.SUCCESS).send({ isSuccess: true, msg, data });
  }
  static CREATED(res, data = null, msg = "Entry is created") {
    res.status(API_CODES.CREATED).send({ isSuccess: true, msg, data });
  }
  static ACCEPTED(res, data = null, msg = "Request is accepted") {
    res.status(API_CODES.ACCEPTED).send({ isSuccess: true, msg, data });
  }
  static NO_CONTENT(res, data = null, msg = "No content returned") {
    res.status(API_CODES.NO_CONTENT).send({ isSuccess: true, msg, data });
  }
  static PARTIAL_CONTENT(
    res,
    data = null,
    msg = "Partial content is returned"
  ) {
    res.status(API_CODES.PARTIAL_CONTENT).send({ isSuccess: true, msg, data });
  }
  /**
   * Client Side Error
   */
  static BAD_REQUEST(res, error = null, msg = "Error: Bad Request") {
    res.status(API_CODES.BAD_REQUEST).send({ isSuccess: false, msg, error });
  }
  static UNAUTORIZED(res, error = null, msg = "Error: Request Unautorized") {
    res.status(API_CODES.UNAUTORIZED).send({ isSuccess: false, msg, error });
  }
  static FORBIDDEN(res, error = null, msg = "Error: Request Forbidden") {
    res.status(API_CODES.FORBIDDEN).send({ isSuccess: false, msg, error });
  }
  static NOT_FOUND(res, error = null, msg = "Error: Requested item not found") {
    res.status(API_CODES.NOT_FOUND).send({ isSuccess: false, msg, error });
  }
  static NOT_ACCEPTABLE(
    res,
    error = null,
    msg = "Error: Request Not Acceptable"
  ) {
    res.status(API_CODES.NOT_ACCEPTABLE).send({ isSuccess: false, msg, error });
  }
  static UNSUPPORTED_MEDIA_TYPE(
    res,
    error = null,
    msg = "Error: Unsupported Media Type"
  ) {
    res
      .status(API_CODES.UNSUPPORTED_MEDIA_TYPE)
      .send({ isSuccess: false, msg, error });
  }
  /**
   * Server Side Error
   */
  static INTERNAL_ERROR(
    res,
    error = null,
    msg = "Error: Internal Server Error"
  ) {
    res.status(API_CODES.INTERNAL_ERROR).send({ isSuccess: false, msg, error });
  }
  static NOT_IMPLEMENTED(
    res,
    error = null,
    msg = "Error: Request Unfulfilled"
  ) {
    res
      .status(API_CODES.NOT_IMPLEMENTED)
      .send({ isSuccess: false, msg, error });
  }
  static REQUEST_INVALID(
    res,
    error = null,
    msg = "Error: Request returns Invalid"
  ) {
    res
      .status(API_CODES.REQUEST_INVALID)
      .send({ isSuccess: false, msg, error });
  }
  static REQUEST_TIMEOUT(res, error = null, msg = "Error: Request Timeout") {
    res
      .status(API_CODES.REQUEST_TIMEOUT)
      .send({ isSuccess: false, msg, error });
  }
  static INTERNAL_ERROR_DATABASE(
    res,
    error = null,
    msg = "Error: Database Error, please seek for developers"
  ) {
    res
      .status(API_CODES.INTERNAL_ERROR_DATABASE)
      .send({ isSuccess: false, msg, error });
  }
}

exports.APIResponse = APIResponse;

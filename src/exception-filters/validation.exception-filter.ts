import { inject, injectable } from "inversify";
import { ExceptionFilter } from "./exception-filters.interface.js";
import { Logger } from "../logger/logger.interface.js";
import { Component } from "../types/component.enum.js";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/validation-error.js";
import { StatusCodes } from "http-status-codes";
import { createErrorObject } from "../utils/createErrorObject.js";
import { ServiceError } from "../types/service-error.enum.js";

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info("Register ValidationExceptionFilter");
  }

  public catch(
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }
    this.logger.error(`[ValidationException]: ${error.message}`);
    error.details.forEach((errorField) =>
      this.logger.error(`[${errorField.property}] — ${errorField.messages}`)
    );
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        createErrorObject(
          ServiceError.ValidationError,
          error.message,
          error.details
        )
      );
  }
}

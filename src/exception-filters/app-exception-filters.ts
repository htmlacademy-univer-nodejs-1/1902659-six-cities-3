import { inject, injectable } from "inversify";
import { ExceptionFilter } from "./exception-filters.interface.js";
import { Component } from "../types/component.enum.js";
import { Logger } from "../logger/logger.interface.js";
import { HttpError } from "../errors/http-errors.js";
import { NextFunction, Request, Response } from "express";
import { createErrorObject } from "../utils/createErrorObject.js";
import { StatusCodes } from "http-status-codes";

@injectable()
export class AppExcetionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info("AppExcetionFilter создан");
  }

  private handleHttpError(
    error: HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    this.logger.error(
      `[${error.detail}]: ${error.httpStatusCode} - ${error.message}`,
      error
    );
    res.status(error.httpStatusCode).json(createErrorObject(error.message));
  }

  private handleOtherError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  public catch(
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
